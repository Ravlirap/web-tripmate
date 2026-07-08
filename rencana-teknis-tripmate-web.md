# Rencana Teknis: TripMate Web Platform

**Berdasarkan:** `prd-tripmate-web.md` v1.0
**Tujuan dokumen:** jembatan antara PRD dan implementasi — tiap keputusan di sini bisa langsung diterjemahkan ke kode saat mulai coding.

---

## 0. Keputusan atas Open Questions PRD

PRD menandai 3 pertanyaan sebagai *blocking*. Berikut keputusan yang saya sarankan, supaya Fase 1 bisa langsung jalan tanpa nunggu:

| Pertanyaan | Keputusan | Alasan |
|---|---|---|
| Role `admin` dibuat manual atau via setup page? | **Manual via SQL seed** (`UPDATE users SET role='admin' WHERE id=X` atau `INSERT` langsung) | Untuk konteks tugas, halaman "super-admin setup" menambah kompleksitas (butuh invite token, dsb) tanpa manfaat. Cukup didokumentasikan di README cara promote user jadi admin. |
| Token JWT: cookie httpOnly atau localStorage? | **localStorage** (sesuai pilihanmu) | Lebih simpel, tidak perlu setur CORS `credentials: include` + `SameSite` cookie cross-origin. Trade-off: rawan XSS jika ada celah injeksi script — mitigasi dengan sanitasi input & tidak pernah `dangerouslySetInnerHTML` sembarangan di Next.js. |
| Backend & frontend satu domain atau terpisah? | **Terpisah** (Next.js di Vercel/domain sendiri, Go tetap di server terpisah) + CORS diatur eksplisit (bukan `*` lagi kalau makin serius, tapi untuk tugas `*` masih boleh) | Next.js App Router + Go API terpisah adalah pola paling umum & PRD sudah pilih Next.js standalone, bukan API routes Next.js. |

Pertanyaan non-blocking juga saya putuskan supaya desain konsisten dari awal:

| Pertanyaan | Keputusan |
|---|---|
| Approval trip oleh admin sebelum tayang? | **Trip langsung tayang, admin moderasi reaktif** (approve/reject sesudahnya, bukan sebelum). Lebih sederhana untuk v1, sesuai pola booking yang juga "submit dulu, dikonfirmasi belakangan". |
| Realtime pakai Go WebSocket atau Node.js? | **Go `gorilla/websocket`** kalau Fase 7 dikerjakan — tidak relevan sekarang, cukup dicatat di dokumen ini. |

---

## 1. Risiko Kritis yang Harus Ditangani di Fase 1: Kompatibilitas Mobile

PRD bilang "tidak boleh breaking change untuk mobile app" — tapi ini **butuh perhatian khusus**, karena:

- Flutter app (`api_service.dart`) saat ini **sama sekali tidak mengirim token apapun**. Semua request (`addTrip`, `addBooking`, `updateBookingStatus`, `deleteTrip`, dst) hanya mengandalkan `organizer_id`/`user_id` yang dikirim polos di body — backend percaya begitu saja.
- Kalau middleware JWT langsung mewajibkan `Authorization: Bearer <token>` di endpoint yang sama, **mobile app akan langsung gagal (401)** di semua fitur tulis (create trip, booking, dsb) karena tidak pernah mengirim token.

**Keputusan:** Fase 1 **wajib** mencakup 2 sisi:
1. Backend Go: tambahkan JWT ke response login, dan middleware auth di endpoint yang butuh proteksi.
2. Flutter app (**wajib ikut diupdate**, minimal): simpan `token` dari response login (`ApiService.currentUser` + `ApiService.token`), lalu kirim `Authorization: Bearer $token` di setiap request yang butuh auth (`addTrip`, `updateTrip`, `deleteTrip`, `addBooking`, `updateBookingStatus`).

Ini **bukan** perubahan besar di Flutter — hanya menambah 1 field statis + 1 header di tiap call `http.post/put/delete`. Tapi ini blocking: tanpa ini, Fase 1 backend akan mematahkan aplikasi mobile yang sudah jalan. Saya masukkan ini eksplisit supaya tidak terlewat saat implementasi.

Endpoint **read-only publik** (`GET /trips.php`, `GET /trips.php?id=`) tetap **tanpa auth**, sesuai PRD (traveler belum login pun boleh browse trip).

---

## 2. Arsitektur Auth

### 2.1 Bentuk Token
JWT dengan claims minimal:
```json
{
  "user_id": 12,
  "role": "organizer",
  "exp": 1720000000
}
```
- Algoritma: HS256, secret dari env var `JWT_SECRET` (jangan hardcode).
- Masa berlaku: **24 jam**. Untuk v1 **tidak pakai refresh token** — kalau expired, user login ulang. (Cukup untuk skala tugas; dicatat sebagai simplifikasi, bukan best practice produksi.)
- Tidak ada token blacklist/revocation server-side untuk v1 (stateless JWT). Logout = hapus token di client saja.

### 2.2 Alur
```
Login/Register/Google-Login (Go)
   → validasi kredensial
   → generate JWT (user_id, role)
   → response: { user: {...}, token: "..." }

Flutter/Next.js
   → simpan token (Flutter: variabel statis/SharedPreferences; Next.js: localStorage)
   → setiap request butuh-auth: header Authorization: Bearer <token>

Go middleware AuthRequired
   → parse header, validasi signature & exp
   → jika gagal → 401
   → jika sukses → inject claims ke request context

Go middleware RequireRole("organizer") / RequireOwnership
   → baca claims dari context
   → cek role dan/atau kepemilikan resource
   → jika gagal → 403
```

### 2.3 Penyimpanan token di Next.js
- localStorage key: `tripmate_token`, `tripmate_user`.
- Axios/fetch wrapper otomatis attach header dari localStorage.
- Interceptor response: kalau 401 → hapus token, redirect ke `/login`.
- Zustand auth store jadi single source of truth di memory (hydrate dari localStorage saat app load), supaya UI reaktif tanpa baca localStorage berulang-ulang.

---

## 3. Migrasi Skema Database

```sql
-- 1. Tambah role admin
ALTER TABLE users MODIFY role ENUM('traveler','organizer','admin') NOT NULL DEFAULT 'traveler';

-- 2. Status akun user (untuk admin: aktifkan/nonaktifkan)
ALTER TABLE users ADD COLUMN status ENUM('active','suspended') NOT NULL DEFAULT 'active';

-- 3. Status trip (untuk moderasi admin, reaktif setelah tayang)
ALTER TABLE trips ADD COLUMN status ENUM('active','inactive') NOT NULL DEFAULT 'active';
```

Dampak ke kode existing:
- `models/user.go` & `models/trip.go` → tambah field `Status`.
- Query `getTrips` publik (GET `/trips.php`) → filter `WHERE status = 'active'` supaya trip yang di-nonaktifkan admin tidak muncul ke publik/mobile (organizer pemilik & admin tetap bisa lihat trip inactive miliknya sendiri via endpoint khusus).
- `_tripFromJson` di Flutter **tidak perlu berubah** (field baru cukup diabaikan kalau tidak dipakai UI mobile saat ini) — tapi field `imageUrl` fallback logic sudah ada, pola sama bisa dipakai untuk `status` kalau nanti mobile mau tampilkan.

---

## 4. Fase 1 — Backend Hardening (Go): Spesifikasi Detail

### 4.1 Dependency baru (go.mod)
```
github.com/golang-jwt/jwt/v5
```

### 4.2 File baru
| File | Isi |
|---|---|
| `utils/jwt.go` | `GenerateToken(userID int64, role string) (string, error)`, `ParseToken(tokenStr string) (*Claims, error)` |
| `middleware/auth.go` | `AuthRequired(next http.HandlerFunc) http.HandlerFunc` — parse `Authorization: Bearer`, taruh claims ke `context.Context` |
| `middleware/role.go` | `RequireRole(roles ...string) func(http.HandlerFunc) http.HandlerFunc` |
| `handlers/admin_handler.go` | `AdminStatsHandler`, `AdminListUsersHandler`, `AdminUpdateUserStatusHandler`, `AdminListTripsHandler`, `AdminUpdateTripStatusHandler`, `AdminListBookingsHandler` |
| `models/context.go` (opsional) | helper `GetUserIDFromContext(ctx)`, `GetRoleFromContext(ctx)` |

### 4.3 File yang diubah
| File | Perubahan |
|---|---|
| `models/user.go` | tambah `Status string` |
| `models/trip.go` | tambah `Status string` |
| `handlers/auth_handler.go` | `LoginHandler`, `RegisterHandler`, `LoginGoogleHandler`, `LoginGoogleFetchHandler` → generate token, masukkan ke response `{user, token}` |
| `handlers/trip_handler.go` | `createTrip`: `organizer_id` diambil dari **JWT claims**, bukan dari body (cegah spoofing). `updateTrip`/`deleteTrip`: cek dulu `organizer_id` pemilik trip == `claims.UserID`, else 403. `getTrips` publik: filter `status='active'` |
| `handlers/booking_handler.go` | `createBooking`: `user_id` dari JWT claims. `updateBookingStatus`: cek trip milik organizer yang login (`JOIN trips` untuk verifikasi ownership) |
| `main.go` | bungkus route yang butuh proteksi dengan `middleware.AuthRequired` (+ `RequireRole` untuk admin) |

### 4.4 Spesifikasi Endpoint

| Endpoint | Method | Auth | Role/Ownership | Perubahan |
|---|---|---|---|---|
| `/login.php` | POST | tidak | - | response tambah `token` |
| `/register.php` | POST | tidak | - | response tambah `token` (opsional — atau tetap arahkan ke login seperti sekarang, tapi tambah token tidak ada salahnya) |
| `/login_google.php` | POST | tidak | - | response tambah `token` |
| `/login_google_fetch.php` | POST | tidak | - | response tambah `token` |
| `GET /trips.php` (list/detail) | GET | tidak | publik | filter `status='active'` untuk publik |
| `GET /trips.php?organizer_id=` | GET | **ya** | organizer pemilik, atau admin | supaya organizer bisa lihat trip miliknya termasuk yang inactive |
| `POST /trips.php` | POST | **ya** | role `organizer` | `organizer_id` dipaksa dari token |
| `PUT /trips.php` | PUT | **ya** | role `organizer` + ownership | 403 jika bukan pemilik |
| `DELETE /trips.php` | DELETE | **ya** | role `organizer` + ownership | 403 jika bukan pemilik |
| `POST /bookings.php` | POST | **ya** | role `traveler` | `user_id` dipaksa dari token |
| `GET /bookings.php?user_id=` | GET | **ya** | traveler pemilik, atau admin | |
| `GET /bookings.php?organizer_id=` | GET | **ya** | organizer pemilik, atau admin | |
| `PUT /bookings.php` (update status) | PUT | **ya** | role `organizer` + ownership trip | |
| `GET /admin/stats` | GET | **ya** | role `admin` | total user, trip, booking |
| `GET /admin/users` | GET | **ya** | role `admin` | list semua user |
| `PATCH /admin/users/:id/status` | PATCH | **ya** | role `admin` | body `{status: "active"\|"suspended"}` |
| `GET /admin/trips` | GET | **ya** | role `admin` | list semua trip lintas organizer |
| `PATCH /admin/trips/:id/status` | PATCH | **ya** | role `admin` | body `{status: "active"\|"inactive"}` |
| `GET /admin/bookings` | GET | **ya** | role `admin` | list semua booking platform |

### 4.5 Skenario Uji (acceptance criteria → test case)

| Skenario | Expected |
|---|---|
| Login traveler valid | 200, response ada `user` + `token` non-kosong |
| `POST /trips.php` tanpa header Authorization | 401 |
| `POST /trips.php` dengan token role `traveler` | 403 (bukan organizer) |
| `PUT /trips.php` oleh organizer A untuk trip milik organizer B | 403 |
| `DELETE /trips.php` oleh pemilik asli | 200 |
| `GET /trips.php` tanpa token, ada trip berstatus inactive | trip inactive tidak muncul di hasil |
| `GET /admin/stats` oleh role `traveler` | 403 |
| `GET /admin/stats` oleh role `admin` | 200, angka sesuai isi DB |
| Token expired (mock `exp` lampau) dipakai di endpoint proteksi | 401 |
| Mobile app existing (setelah update kecil kirim header) — login lalu create trip | tetap 200, tidak ada regresi |

---

## 5. Fase 2 — Setup & UI Dasar (Next.js)

- `create-next-app` (TypeScript, App Router, Tailwind) + `shadcn/ui` init.
- Struktur folder:
  ```
  app/
    (public)/            → landing, /trips, /trips/[id], /login, /register
    (traveler)/dashboard, /bookings, /profile
    (organizer)/organizer, /organizer/trips, /organizer/bookings, /organizer/profile
    (admin)/admin, /admin/users, /admin/trips, /admin/bookings
  components/
    ui/          ← shadcn primitives
    trip/        ← TripCard, TripList, TripForm (pola dari trip_card.dart)
    booking/     ← BookingTile, BookingList
    layout/      ← Navbar per role, Sidebar organizer/admin
  lib/
    api/         ← axios instance + endpoint functions (mirror api_service.dart)
    types/       ← User, Trip, Booking (mirror models Go)
  store/
    auth-store.ts (Zustand)
  ```
- Route grouping per role pakai Next.js route groups `(traveler)`, `(organizer)`, `(admin)` + layout masing-masing yang cek role di client (sementara data dummy dulu, auth nyata masuk Fase 4).
- Landing page & `/trips` pakai data dummy/mock dulu — data asli nyambung di Fase 3.

## 6. Fase 3 — Integrasi Data (React Query)

- `lib/api/trips.ts`: `getAllTrips()`, `getTripById(id)`, `getTripsByOrganizer(id)` — 1:1 dengan method di `api_service.dart`.
- React Query hooks: `useTrips()`, `useTrip(id)`, `useOrganizerTrips(id)` dengan `queryKey` konsisten (`['trips']`, `['trips', id]`).
- Loading/error state ditangani lewat `isLoading`/`isError` bawaan React Query (setara `_loading` di Flutter `StatefulWidget`).

## 7. Fase 4 — Auth Frontend

- `store/auth-store.ts` (Zustand): `{ user, token, login(), logout(), hydrate() }`.
- Firebase Google Sign-In (client SDK) → dapat `idToken` → POST ke `/login_google.php` (sama seperti alur `firebase_auth_service.dart`) → simpan `{user, token}` dari Go.
- Axios instance: request interceptor attach `Authorization`, response interceptor tangani 401 → `logout()` + redirect `/login`.
- Route protection: middleware Next.js atau layout check `if (!user) redirect('/login')`.

## 8. Fase 5 — Fitur Traveler & Organizer

Paritas langsung dari Flutter, cek `manage_trips_tab.dart`, `create_booking.dart`, `manage_bookings_tab.dart` sebagai referensi alur & validasi form.

## 9. Fase 6 — Admin

Halaman baru murni (tidak ada padanan di mobile) — dashboard stats card, tabel user dengan toggle status, tabel trip lintas organizer dengan aksi approve/reject/hapus, tabel booking read-only untuk audit.

---

## 10. Urutan Eksekusi (Checklist Milestone)

- [ ] **Fase 1a**: Migrasi SQL (`role`, `status` kolom baru)
- [ ] **Fase 1b**: JWT util + middleware auth/role di Go
- [ ] **Fase 1c**: Update semua handler existing (ownership check, filter status)
- [ ] **Fase 1d**: Endpoint admin baru
- [ ] **Fase 1e**: Update `api_service.dart` Flutter (simpan & kirim token) — **wajib**, jangan skip
- [ ] **Fase 1f**: Uji semua skenario di §4.5 pakai Postman/curl
- [ ] **Fase 2**: Scaffold Next.js + layout per role + halaman publik (dummy data)
- [ ] **Fase 3**: Sambungkan React Query ke data trip asli
- [ ] **Fase 4**: Auth (Firebase + JWT + Zustand)
- [ ] **Fase 5**: Booking flow + CRUD trip + kelola booking
- [ ] **Fase 6**: Panel admin

---

## 11. Catatan Tambahan

- CORS di `middleware/cors.go` masih `Access-Control-Allow-Origin: *` — cukup untuk tugas, tapi kalau nanti pakai cookie (bukan localStorage), ini **harus** diganti ke origin spesifik karena cookie cross-origin tidak bisa dipakai dengan wildcard `*`.
- Karena Go dan Next.js dua project terpisah, siapkan `.env.local` di Next.js untuk `NEXT_PUBLIC_API_BASE_URL` (mirror `baseUrl` di `api_service.dart`).
- Tidak perlu ubah nama endpoint (`/login.php`, `/trips.php`, dst) — tetap sesuai keputusan awal biar mobile app tidak perlu refactor besar.
