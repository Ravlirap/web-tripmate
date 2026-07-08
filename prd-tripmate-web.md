# PRD: TripMate Web Platform

**Dokumen versi:** 1.0
**Tanggal:** Juli 2026
**Status:** Draft — untuk direview sebelum masuk fase implementasi
**Terkait:** TripMate Mobile (Flutter) & TripMate Backend (Go)

---

## 1. Latar Belakang & Problem Statement

TripMate saat ini sudah berjalan sebagai aplikasi mobile Flutter dengan backend Go (hasil migrasi dari PHP) yang melayani dua role: **Traveler** (memesan open trip) dan **Organizer** (membuat & mengelola open trip). Namun aplikasi ini **belum punya kanal web**, sehingga:

- Traveler yang tidak ingin install aplikasi tidak bisa menjelajah trip yang tersedia (mis. calon pelanggan yang datang dari share link/media sosial).
- Organizer tidak punya cara mengelola trip secara nyaman di layar besar (input form panjang, upload data lebih mudah di desktop).
- Tidak ada **panel kontrol terpusat (Admin)** untuk memoderasi trip, memantau transaksi booking, atau menangani penyalahgunaan akun — saat ini seluruh data hanya bisa diintip lewat database langsung.

Tanpa web platform ini, TripMate kehilangan potensi jangkauan pengguna (SEO, share link, akses lintas device) dan tidak punya mekanisme pengawasan operasional (admin).

---

## 2. Tujuan (Goals)

1. Menyediakan **portal web publik** agar calon traveler bisa menjelajah & melihat detail open trip tanpa harus install aplikasi mobile terlebih dahulu.
2. Memungkinkan **traveler** melakukan booking trip dan memantau status pesanannya dari web, dengan data yang konsisten (satu sumber backend) dengan aplikasi mobile.
3. Memberi **organizer** dashboard web untuk CRUD trip dan mengelola booking masuk secara lebih efisien dibanding di mobile.
4. Menghadirkan **panel Admin** pertama kali di ekosistem TripMate: moderasi trip, manajemen user, dan visibilitas transaksi.
5. Memastikan backend Go yang sudah ada **diperkuat** (autentikasi berbasis token, otorisasi per-role) tanpa merusak kompatibilitas dengan aplikasi Flutter yang sudah berjalan.

---

## 3. Non-Goals (Di Luar Cakupan v1)

| Non-Goal | Alasan |
|---|---|
| Migrasi backend dari Go ke Laravel/Node.js | Backend Go sudah berjalan & sudah dipakai mobile app; migrasi bahasa hanya menambah risiko tanpa manfaat langsung bagi user |
| Real-time group chat (WebSocket) | Fitur besar dan terpisah secara fungsional; dijadwalkan sebagai **Fase 7 (opsional)** setelah fitur inti web selesai |
| Payment gateway / pembayaran online | Booking saat ini masih berbasis konfirmasi manual oleh organizer (status pending/confirmed/cancelled); integrasi pembayaran adalah inisiatif terpisah |
| Native mobile app rewrite | Flutter app tetap berjalan apa adanya; web dan mobile berbagi backend yang sama, bukan saling menggantikan |
| Multi-bahasa (i18n) | UI web v1 berbahasa Indonesia saja, konsisten dengan mobile app |
| Notifikasi push/email otomatis | Perlu infrastruktur tambahan (email service/FCM); dicatat sebagai *Future Consideration* |

---

## 4. Target Pengguna & User Stories

### Persona
- **Traveler** — pengguna umum yang mencari & memesan open trip.
- **Organizer** — penyedia trip yang mengelola trip dan booking masuk.
- **Admin** — operator internal TripMate yang mengawasi platform.

### User Stories

**Traveler**
- Sebagai *calon traveler (belum login)*, saya ingin menjelajah daftar open trip dan melihat detailnya, supaya saya bisa memutuskan sebelum mendaftar/login.
- Sebagai *traveler*, saya ingin login (email/password atau Google) di web, supaya saya bisa memesan trip.
- Sebagai *traveler*, saya ingin membuat booking dengan mengisi jumlah peserta dan catatan, supaya organizer menerima permintaan saya.
- Sebagai *traveler*, saya ingin melihat riwayat & status booking saya (pending/confirmed/cancelled), supaya saya tahu progres pesanan.
- Sebagai *traveler*, saya ingin mencari trip berdasarkan destinasi/judul, supaya saya cepat menemukan trip yang relevan.

**Organizer**
- Sebagai *organizer*, saya ingin login dan melihat dashboard ringkas (jumlah trip aktif, booking pending), supaya saya cepat tahu yang perlu ditindaklanjuti.
- Sebagai *organizer*, saya ingin membuat, mengedit, dan menghapus trip lewat form web, supaya pengelolaan lebih cepat dibanding di mobile.
- Sebagai *organizer*, saya ingin melihat daftar booking masuk per trip dan mengonfirmasi/menolaknya, supaya traveler mendapat kepastian.
- Sebagai *organizer*, saya **tidak ingin** bisa mengedit/menghapus trip milik organizer lain (keamanan/otorisasi).

**Admin**
- Sebagai *admin*, saya ingin melihat statistik ringkas platform (total user, total trip, total booking), supaya saya punya gambaran kesehatan platform.
- Sebagai *admin*, saya ingin melihat & mengelola semua user (aktifkan/nonaktifkan akun), supaya saya bisa menangani penyalahgunaan.
- Sebagai *admin*, saya ingin melihat & memoderasi semua trip lintas organizer (approve/reject/hapus), supaya konten yang tidak layak bisa ditindak.
- Sebagai *admin*, saya ingin memonitor seluruh transaksi booking di platform, supaya saya bisa membantu jika ada sengketa antara traveler-organizer.

**Edge case / error states (semua role)**
- Sebagai pengguna, saat koneksi ke backend gagal, saya ingin melihat pesan error yang jelas, bukan halaman kosong/blank.
- Sebagai pengguna yang sesi login-nya kedaluwarsa, saya ingin diarahkan ulang ke halaman login, bukan melihat error teknis.
- Sebagai organizer, saat saya mencoba akses endpoint booking/trip milik organizer lain lewat URL langsung, sistem harus menolak (403), bukan menampilkan data.

---

## 5. Requirements

### 5.1 P0 — Must Have (v1 tidak bisa rilis tanpa ini)

#### Backend (Go) — Prasyarat sebelum frontend disentuh
- [ ] Tambah **JWT** pada `login.php`, `register.php`, `login_google.php` → response berisi `{ user, token }`.
- [ ] Tambah **middleware auth** yang memvalidasi JWT dan menyuntikkan `user_id` + `role` ke context request.
- [ ] Terapkan **otorisasi per-role**: organizer hanya bisa CRUD trip miliknya sendiri; endpoint admin hanya bisa diakses role `admin`.
- [ ] Tambah value `admin` pada enum `users.role` (migrasi schema).
- [ ] Endpoint baru: `GET /admin/stats`, `GET /admin/users`, `PATCH /admin/users/:id/status`, `GET /admin/trips`, `PATCH /admin/trips/:id/status`, `GET /admin/bookings`.
- [ ] Pastikan seluruh endpoint yang sudah ada (`/trips.php`, `/bookings.php`, dst.) tetap kompatibel dengan mobile app (tidak breaking change).

**Acceptance Criteria:**
- Given traveler login dengan kredensial valid, when request dikirim ke `/login.php`, then response mengandung token JWT valid yang bisa dipakai untuk request berikutnya.
- Given organizer A login, when mencoba `PUT /trips.php` untuk trip milik organizer B, then response 403 Forbidden.
- Given user dengan role bukan admin, when mengakses endpoint `/admin/*`, then response 403 Forbidden.

#### Frontend — Publik
- [ ] Landing page (hero, ringkasan trip unggulan, CTA daftar/login).
- [ ] Halaman `/trips` — daftar semua open trip dengan pencarian/filter dasar (destinasi, judul).
- [ ] Halaman `/trips/[id]` — detail trip (harga, kuota, deskripsi, tombol booking).
- [ ] Halaman login & register (email/password + Google Sign-In via Firebase).

#### Frontend — Traveler
- [ ] Dashboard ringkas booking aktif.
- [ ] Form booking trip (jumlah peserta, catatan) terhubung ke `POST /bookings.php`.
- [ ] Halaman riwayat booking dengan status.

#### Frontend — Organizer
- [ ] Dashboard ringkas (jumlah trip aktif, booking pending).
- [ ] CRUD trip penuh (list, tambah, edit, hapus) dengan validasi form.
- [ ] Halaman kelola booking masuk (confirm/reject per booking).

#### Frontend — Admin
- [ ] Dashboard statistik dasar (total user, trip, booking).
- [ ] Halaman kelola user (list + aktifkan/nonaktifkan).
- [ ] Halaman moderasi trip (list lintas organizer + approve/reject/hapus).

### 5.2 P1 — Nice to Have (fast-follow setelah v1)
- [ ] Filter trip lanjutan (rentang harga, rentang tanggal).
- [ ] Pagination / infinite scroll pada daftar trip & user (saat ini scan penuh tabel).
- [ ] Grafik tren booking/trip di dashboard admin (bukan cuma angka statis).
- [ ] Notifikasi in-app sederhana (toast) saat status booking berubah tanpa perlu refresh manual (polling ringan).
- [ ] Profil organizer publik (halaman showcase semua trip milik satu organizer).

### 5.3 P2 — Future Considerations (di luar scope v1, tapi desain harus mengakomodasi)
- [ ] Real-time chat grup per trip (WebSocket, Go `gorilla/websocket`).
- [ ] Payment gateway & histori transaksi finansial.
- [ ] Notifikasi email/push (perlu integrasi service pihak ketiga).
- [ ] Multi-bahasa (i18n).
- [ ] Review & rating trip oleh traveler setelah perjalanan selesai.

---

## 6. Arsitektur & Tech Stack

| Layer | Pilihan | Keterangan |
|---|---|---|
| Framework Frontend | **Next.js 14+ (App Router)** + JavaScript | Sesuai keputusan user |
| Styling | Tailwind CSS + shadcn/ui | Konsisten, mempercepat pengembangan UI |
| Data fetching/cache | **TanStack Query (React Query)** | Setara `FutureBuilder` + caching otomatis |
| Global state | **Zustand** | Setara `Provider`/`ChangeNotifier` di Flutter |
| Form & validasi | React Hook Form + Zod | Setara `TextFormField` + `validator` di Flutter |
| Auth | Firebase Auth (Google Sign-In) + JWT dari backend Go | Konsisten dengan mobile app |
| Backend | **Go** (existing `tripmate-backend`), diperkuat middleware JWT & role-based access | Reuse, bukan rewrite |
| Database | postgresql, my conection
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ravli123
DB_NAME=tripmate_db (existing `trip_mate_db`), tambah kolom/migrasi kecil | Reuse |
| Realtime (P2, opsional) | Go `gorilla/websocket` | Hindari maintain backend kedua berbahasa lain |

### Prinsip Arsitektur
- **Satu backend, dua klien** (mobile Flutter + web Next.js) — tidak ada duplikasi logika bisnis.
- Perubahan API harus **backward-compatible** dengan mobile app yang sudah berjalan di production/tugas.
- Role-based access control (RBAC) diterapkan di level backend (middleware), bukan hanya disembunyikan di UI.

---

## 7. Sitemap (Ringkasan)

```
Public:      /  /trips  /trips/[id]  /login  /register
Traveler:    /dashboard  /bookings  /profile
Organizer:   /organizer  /organizer/trips  /organizer/bookings  /organizer/profile
Admin:       /admin  /admin/users  /admin/trips  /admin/bookings
```

---

## 8. Success Metrics

### Leading Indicators (dievaluasi ~2–4 minggu setelah fitur berjalan)
- **Tingkat penyelesaian booking dari web**: ≥ 80% traveler yang membuka form booking berhasil submit tanpa error.
- **Waktu load halaman `/trips`**: < 2 detik pada koneksi normal (data ter-cache lewat React Query).
- **Error rate API dari web**: < 2% dari total request (dipantau lewat log backend Go).
- **Adopsi organizer**: ≥ 1 organizer aktif menggunakan dashboard web untuk CRUD trip dalam 2 minggu pertama rilis.

### Lagging Indicators (dievaluasi ~1–2 bulan)
- Pengurangan waktu rata-rata organizer mengonfirmasi booking (dibanding sebelumnya via mobile saja).
- Jumlah trip baru yang dibuat lewat web vs mobile (menunjukkan preferensi channel).
- Admin berhasil menindaklanjuti minimal 1 kasus moderasi trip/user lewat panel admin.

---

## 9. Open Questions

| Pertanyaan | Ditujukan ke | Blocking? |
|---|---|---|
| Apakah role `admin` dibuat manual di database, atau perlu halaman "super-admin setup" tersendiri? | Engineering/Product | Ya — memengaruhi desain onboarding admin pertama |
| Token JWT disimpan di **httpOnly cookie** atau `localStorage`? (httpOnly lebih aman dari XSS, tapi perlu setup CORS/cookie cross-origin jika domain frontend & backend beda) | Engineering | Ya — memengaruhi arsitektur auth di Fase 1 |
| Apakah backend Go akan di-deploy di domain/subdomain yang sama dengan frontend Next.js, atau terpisah? | Engineering/Infra | Ya — memengaruhi setup CORS & cookie |
| Apakah dosen/penilai tugas mewajibkan Node.js untuk fitur real-time (sesuai roadmap awal), atau boleh pakai Go WebSocket? | Stakeholder (dosen/pembimbing) | Tidak — hanya relevan untuk Fase 7 (P2) |
| Apakah perlu approval trip oleh admin **sebelum** trip tayang publik, atau trip langsung tayang dan admin hanya moderasi reaktif? | Product | Tidak — bisa didefinisikan saat desain Fase 6 |

---

## 10. Timeline & Phasing

Fitur ini terlalu besar untuk satu rilis; dipecah menjadi 7 fase berurutan (P0 di Fase 1–6, P2 opsional di Fase 7):

| Fase | Fokus | Output |
|---|---|---|
| **1. Backend Hardening** | JWT, middleware auth, role admin, endpoint admin baru | API siap dipakai web, teruji via Postman |
| **2. Setup & UI Dasar** | Init Next.js, Tailwind/shadcn, layout per role, landing + explore (data dummy) | Kerangka UI semua halaman publik |
| **3. Integrasi Data** | Sambungkan React Query ke API trip (list & detail) | Data trip live dari backend |
| **4. Auth** | Firebase + JWT, Zustand auth store | Login/register/Google sign-in berfungsi |
| **5. Fitur Traveler & Organizer** | Booking flow, CRUD trip, kelola booking | Fitur inti P0 selesai |
| **6. Fitur Admin** | Dashboard, kelola user, moderasi trip | Panel admin P0 selesai → **v1 siap rilis** |
| **7. Realtime (opsional/P2)** | WebSocket chat grup per trip | Fitur tambahan pasca-v1 |

**Dependensi kritis:** Fase 2–6 tidak bisa mulai penuh sebelum Fase 1 (backend hardening) selesai, karena tanpa JWT & RBAC, fitur web tidak aman untuk multi-user/multi-role.

---

## 11. Referensi Teknis (Existing Codebase)

- Backend: `tripmate-backend` (Go), endpoint sudah ada — `login.php`, `register.php`, `login_google.php`, `login_google_fetch.php`, `user.php`, `trips.php`, `bookings.php` (lihat `README.md` & `main.go`).
- Model data existing: `models/user.go`, `models/trip.go`, `models/booking.go` — jadi acuan `Javas/*.ts` di frontend.
- Mobile app: `tubes_ppb_app` (Flutter) — pola state (`Provider`/`ChangeNotifier`) dan alur booking/CRUD trip di sana menjadi referensi paritas fitur untuk web.

---

## 12. Next Steps

1. Review PRD ini bersama pembimbing/dosen (khususnya bagian **Open Questions**).
2. Finalisasi keputusan: penyimpanan token (cookie vs localStorage) dan strategi role admin.
3. Mulai **Fase 1 (Backend Hardening)** — breakdown teknis JWT + middleware + endpoint admin.
4. Setelah Fase 1 disetujui, lanjut scaffolding Next.js (Fase 2).
