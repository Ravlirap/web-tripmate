package models

import (
	"database/sql"
	"time"
)

// Trip represents a trip/open trip in the system
type Trip struct {
	ID          int64     `json:"id"`
	OrganizerID int64     `json:"organizer_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Destination string    `json:"destination"`
	Price       float64   `json:"price"`
	Quota       int       `json:"quota"`
	StartDate   time.Time `json:"start_date"`
	EndDate     time.Time `json:"end_date"`
	ImageURL    string    `json:"image_url"`
	Status      string    `json:"status"` // active, inactive
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// GetAllActiveTrips retrieves all active trips for public view
func GetAllActiveTrips(db *sql.DB) ([]Trip, error) {
	query := `SELECT id, organizer_id, title, description, destination, price, quota, 
			  start_date, end_date, image_url, status, created_at, updated_at 
			  FROM trips WHERE status = 'active' ORDER BY created_at DESC`
	
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var trips []Trip
	for rows.Next() {
		var trip Trip
		err := rows.Scan(
			&trip.ID, &trip.OrganizerID, &trip.Title, &trip.Description,
			&trip.Destination, &trip.Price, &trip.Quota, &trip.StartDate,
			&trip.EndDate, &trip.ImageURL, &trip.Status, &trip.CreatedAt, &trip.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		trips = append(trips, trip)
	}
	
	return trips, nil
}

// GetTripByID retrieves a trip by ID
func GetTripByID(db *sql.DB, tripID int64) (*Trip, error) {
	trip := &Trip{}
	query := `SELECT id, organizer_id, title, description, destination, price, quota, 
			  start_date, end_date, image_url, status, created_at, updated_at 
			  FROM trips WHERE id = $1`
	
	err := db.QueryRow(query, tripID).Scan(
		&trip.ID, &trip.OrganizerID, &trip.Title, &trip.Description,
		&trip.Destination, &trip.Price, &trip.Quota, &trip.StartDate,
		&trip.EndDate, &trip.ImageURL, &trip.Status, &trip.CreatedAt, &trip.UpdatedAt,
	)
	
	if err != nil {
		return nil, err
	}
	
	return trip, nil
}

// GetTripsByOrganizer retrieves all trips by organizer ID
func GetTripsByOrganizer(db *sql.DB, organizerID int64) ([]Trip, error) {
	query := `SELECT id, organizer_id, title, description, destination, price, quota, 
			  start_date, end_date, image_url, status, created_at, updated_at 
			  FROM trips WHERE organizer_id = $1 ORDER BY created_at DESC`
	
	rows, err := db.Query(query, organizerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var trips []Trip
	for rows.Next() {
		var trip Trip
		err := rows.Scan(
			&trip.ID, &trip.OrganizerID, &trip.Title, &trip.Description,
			&trip.Destination, &trip.Price, &trip.Quota, &trip.StartDate,
			&trip.EndDate, &trip.ImageURL, &trip.Status, &trip.CreatedAt, &trip.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		trips = append(trips, trip)
	}
	
	return trips, nil
}

// GetAllTrips retrieves all trips (admin only)
func GetAllTrips(db *sql.DB) ([]Trip, error) {
	query := `SELECT id, organizer_id, title, description, destination, price, quota, 
			  start_date, end_date, image_url, status, created_at, updated_at 
			  FROM trips ORDER BY created_at DESC`
	
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var trips []Trip
	for rows.Next() {
		var trip Trip
		err := rows.Scan(
			&trip.ID, &trip.OrganizerID, &trip.Title, &trip.Description,
			&trip.Destination, &trip.Price, &trip.Quota, &trip.StartDate,
			&trip.EndDate, &trip.ImageURL, &trip.Status, &trip.CreatedAt, &trip.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		trips = append(trips, trip)
	}
	
	return trips, nil
}

// SearchTrips searches trips by destination or title
func SearchTrips(db *sql.DB, searchTerm string) ([]Trip, error) {
	query := `SELECT id, organizer_id, title, description, destination, price, quota, 
			  start_date, end_date, image_url, status, created_at, updated_at 
			  FROM trips 
			  WHERE status = 'active' AND (
				  LOWER(title) LIKE LOWER($1) OR 
				  LOWER(destination) LIKE LOWER($1)
			  )
			  ORDER BY created_at DESC`
	
	searchPattern := "%" + searchTerm + "%"
	rows, err := db.Query(query, searchPattern)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var trips []Trip
	for rows.Next() {
		var trip Trip
		err := rows.Scan(
			&trip.ID, &trip.OrganizerID, &trip.Title, &trip.Description,
			&trip.Destination, &trip.Price, &trip.Quota, &trip.StartDate,
			&trip.EndDate, &trip.ImageURL, &trip.Status, &trip.CreatedAt, &trip.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		trips = append(trips, trip)
	}
	
	return trips, nil
}

// UpdateTripStatus updates a trip's status (admin only)
func UpdateTripStatus(db *sql.DB, tripID int64, status string) error {
	query := `UPDATE trips SET status = $1, updated_at = NOW() WHERE id = $2`
	_, err := db.Exec(query, status, tripID)
	return err
}