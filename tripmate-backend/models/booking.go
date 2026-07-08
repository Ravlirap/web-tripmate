package models

import (
	"database/sql"
	"time"
)

// Booking represents a booking in the system
type Booking struct {
	ID              int64     `json:"id"`
	UserID          int64     `json:"user_id"`
	TripID          int64     `json:"trip_id"`
	ParticipantCount int      `json:"participant_count"`
	Notes           string    `json:"notes"`
	Status          string    `json:"status"` // pending, confirmed, cancelled
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

// BookingWithDetails includes trip and user information
type BookingWithDetails struct {
	Booking
	TripTitle       string  `json:"trip_title"`
	TripDestination string  `json:"trip_destination"`
	TripPrice       float64 `json:"trip_price"`
	UserName        string  `json:"user_name"`
	UserEmail       string  `json:"user_email"`
}

// GetBookingsByUser retrieves all bookings for a specific user
func GetBookingsByUser(db *sql.DB, userID int64) ([]BookingWithDetails, error) {
	query := `
		SELECT b.id, b.user_id, b.trip_id, b.participant_count, b.notes, b.status, 
		       b.created_at, b.updated_at,
		       t.title, t.destination, t.price,
		       u.name, u.email
		FROM bookings b
		JOIN trips t ON b.trip_id = t.id
		JOIN users u ON b.user_id = u.id
		WHERE b.user_id = $1
		ORDER BY b.created_at DESC
	`
	
	rows, err := db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var bookings []BookingWithDetails
	for rows.Next() {
		var booking BookingWithDetails
		err := rows.Scan(
			&booking.ID, &booking.UserID, &booking.TripID, &booking.ParticipantCount,
			&booking.Notes, &booking.Status, &booking.CreatedAt, &booking.UpdatedAt,
			&booking.TripTitle, &booking.TripDestination, &booking.TripPrice,
			&booking.UserName, &booking.UserEmail,
		)
		if err != nil {
			return nil, err
		}
		bookings = append(bookings, booking)
	}
	
	return bookings, nil
}

// GetBookingsByOrganizer retrieves all bookings for trips owned by an organizer
func GetBookingsByOrganizer(db *sql.DB, organizerID int64) ([]BookingWithDetails, error) {
	query := `
		SELECT b.id, b.user_id, b.trip_id, b.participant_count, b.notes, b.status, 
		       b.created_at, b.updated_at,
		       t.title, t.destination, t.price,
		       u.name, u.email
		FROM bookings b
		JOIN trips t ON b.trip_id = t.id
		JOIN users u ON b.user_id = u.id
		WHERE t.organizer_id = $1
		ORDER BY b.created_at DESC
	`
	
	rows, err := db.Query(query, organizerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var bookings []BookingWithDetails
	for rows.Next() {
		var booking BookingWithDetails
		err := rows.Scan(
			&booking.ID, &booking.UserID, &booking.TripID, &booking.ParticipantCount,
			&booking.Notes, &booking.Status, &booking.CreatedAt, &booking.UpdatedAt,
			&booking.TripTitle, &booking.TripDestination, &booking.TripPrice,
			&booking.UserName, &booking.UserEmail,
		)
		if err != nil {
			return nil, err
		}
		bookings = append(bookings, booking)
	}
	
	return bookings, nil
}

// GetAllBookings retrieves all bookings (admin only)
func GetAllBookings(db *sql.DB) ([]BookingWithDetails, error) {
	query := `
		SELECT b.id, b.user_id, b.trip_id, b.participant_count, b.notes, b.status, 
		       b.created_at, b.updated_at,
		       t.title, t.destination, t.price,
		       u.name, u.email
		FROM bookings b
		JOIN trips t ON b.trip_id = t.id
		JOIN users u ON b.user_id = u.id
		ORDER BY b.created_at DESC
	`
	
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var bookings []BookingWithDetails
	for rows.Next() {
		var booking BookingWithDetails
		err := rows.Scan(
			&booking.ID, &booking.UserID, &booking.TripID, &booking.ParticipantCount,
			&booking.Notes, &booking.Status, &booking.CreatedAt, &booking.UpdatedAt,
			&booking.TripTitle, &booking.TripDestination, &booking.TripPrice,
			&booking.UserName, &booking.UserEmail,
		)
		if err != nil {
			return nil, err
		}
		bookings = append(bookings, booking)
	}
	
	return bookings, nil
}

// GetBookingByID retrieves a booking by ID
func GetBookingByID(db *sql.DB, bookingID int64) (*Booking, error) {
	booking := &Booking{}
	query := `SELECT id, user_id, trip_id, participant_count, notes, status, created_at, updated_at 
			  FROM bookings WHERE id = $1`
	
	err := db.QueryRow(query, bookingID).Scan(
		&booking.ID, &booking.UserID, &booking.TripID, &booking.ParticipantCount,
		&booking.Notes, &booking.Status, &booking.CreatedAt, &booking.UpdatedAt,
	)
	
	if err != nil {
		return nil, err
	}
	
	return booking, nil
}

// UpdateBookingStatus updates a booking's status
func UpdateBookingStatus(db *sql.DB, bookingID int64, status string) error {
	query := `UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2`
	_, err := db.Exec(query, status, bookingID)
	return err
}