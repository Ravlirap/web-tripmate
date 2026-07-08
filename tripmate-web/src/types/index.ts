// Core Types for TripMate Web Platform

export type UserRole = 'traveler' | 'organizer' | 'admin';

export type TripStatus = 'active' | 'inactive' | 'pending' | 'rejected';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Trip {
  id: string;
  organizer_id: string;
  organizer?: User;
  title: string;
  destination: string;
  description: string;
  price: number;
  quota: number;
  available_slots: number;
  start_date: string;
  end_date: string;
  meeting_point: string;
  image_url?: string;
  status: TripStatus;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  trip_id: string;
  trip?: Trip;
  traveler_id: string;
  traveler?: User;
  participants: number;
  total_price: number;
  status: BookingStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
}

export interface CreateTripData {
  title: string;
  destination: string;
  description: string;
  price: number;
  quota: number;
  start_date: string;
  end_date: string;
  meeting_point: string;
  image_url?: string;
}

export interface UpdateTripData extends Partial<CreateTripData> {
  status?: TripStatus;
}

export interface CreateBookingData {
  trip_id: string;
  participants: number;
  notes?: string;
}

export interface UpdateBookingData {
  status: BookingStatus;
}

// Admin Dashboard Stats
export interface AdminStats {
  total_users: number;
  total_trips: number;
  total_bookings: number;
  active_trips: number;
  pending_bookings: number;
}

// Organizer Dashboard Stats
export interface OrganizerStats {
  total_trips: number;
  active_trips: number;
  total_bookings: number;
  pending_bookings: number;
  total_revenue: number;
}

// Traveler Dashboard Stats
export interface TravelerStats {
  total_bookings: number;
  active_bookings: number;
  completed_bookings: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and Search Types
export interface TripFilters {
  search?: string;
  destination?: string;
  min_price?: number;
  max_price?: number;
  start_date?: string;
  end_date?: string;
  status?: TripStatus;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  is_active?: boolean;
}

export interface BookingFilters {
  status?: BookingStatus;
  trip_id?: string;
  traveler_id?: string;
}