/**
 * Application constants for TripMate Web
 */

// App Info
export const APP_NAME = "TripMate";
export const APP_DESCRIPTION = "Platform Open Trip Terpercaya";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGIN_GOOGLE: "/auth/google",
  LOGOUT: "/auth/logout",
  
  // Trips
  TRIPS: "/trips",
  TRIP_DETAIL: (id: string) => `/trips/${id}`,
  
  // Bookings
  BOOKINGS: "/bookings",
  BOOKING_DETAIL: (id: string) => `/bookings/${id}`,
  
  // User
  USER_PROFILE: "/user/profile",
  
  // Organizer
  ORGANIZER_TRIPS: "/organizer/trips",
  ORGANIZER_BOOKINGS: "/organizer/bookings",
  ORGANIZER_STATS: "/organizer/stats",
  
  // Admin
  ADMIN_STATS: "/admin/stats",
  ADMIN_USERS: "/admin/users",
  ADMIN_TRIPS: "/admin/trips",
  ADMIN_BOOKINGS: "/admin/bookings",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
} as const;

// User Roles
export const USER_ROLES = {
  TRAVELER: "traveler",
  ORGANIZER: "organizer",
  ADMIN: "admin",
} as const;

// Trip Status
export const TRIP_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  REJECTED: "rejected",
} as const;

// Booking Status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
} as const;

// Status Labels (Indonesian)
export const STATUS_LABELS = {
  active: "Aktif",
  inactive: "Tidak Aktif",
  pending: "Menunggu",
  confirmed: "Dikonfirmasi",
  cancelled: "Dibatalkan",
  rejected: "Ditolak",
} as const;

// Status Colors (Tailwind classes)
export const STATUS_COLORS = {
  active: "bg-emerald-100 text-emerald-800",
  inactive: "bg-slate-100 text-slate-800",
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
  rejected: "bg-rose-100 text-rose-800",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  TRIPS_PER_PAGE: 12,
  USERS_PER_PAGE: 20,
  BOOKINGS_PER_PAGE: 20,
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  TRIPS: "/trips",
  TRIP_DETAIL: (id: string) => `/trips/${id}`,
  LOGIN: "/login",
  REGISTER: "/register",
  
  // Traveler Routes
  DASHBOARD: "/dashboard",
  BOOKINGS: "/bookings",
  PROFILE: "/profile",
  
  // Organizer Routes
  ORGANIZER: "/organizer",
  ORGANIZER_TRIPS: "/organizer/trips",
  ORGANIZER_TRIP_NEW: "/organizer/trips/new",
  ORGANIZER_TRIP_EDIT: (id: string) => `/organizer/trips/${id}/edit`,
  ORGANIZER_BOOKINGS: "/organizer/bookings",
  ORGANIZER_PROFILE: "/organizer/profile",
  
  // Admin Routes
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_TRIPS: "/admin/trips",
  ADMIN_BOOKINGS: "/admin/bookings",
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "dd MMMM yyyy",
  INPUT: "yyyy-MM-dd",
  DATETIME: "dd MMM yyyy HH:mm",
} as const;

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 100,
  MIN_TRIP_TITLE_LENGTH: 10,
  MAX_TRIP_TITLE_LENGTH: 100,
  MIN_TRIP_DESCRIPTION_LENGTH: 50,
  MAX_TRIP_DESCRIPTION_LENGTH: 2000,
  MIN_TRIP_PRICE: 10000,
  MAX_TRIP_PRICE: 100000000,
  MIN_TRIP_QUOTA: 1,
  MAX_TRIP_QUOTA: 1000,
} as const;

// Messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: "Berhasil login",
    REGISTER: "Registrasi berhasil",
    LOGOUT: "Berhasil logout",
    CREATE_TRIP: "Trip berhasil dibuat",
    UPDATE_TRIP: "Trip berhasil diperbarui",
    DELETE_TRIP: "Trip berhasil dihapus",
    CREATE_BOOKING: "Booking berhasil dibuat",
    UPDATE_BOOKING: "Status booking berhasil diperbarui",
    CANCEL_BOOKING: "Booking berhasil dibatalkan",
  },
  ERROR: {
    GENERIC: "Terjadi kesalahan",
    NETWORK: "Koneksi bermasalah, silakan coba lagi",
    UNAUTHORIZED: "Anda tidak memiliki akses",
    NOT_FOUND: "Data tidak ditemukan",
    VALIDATION: "Data tidak valid",
  },
} as const;