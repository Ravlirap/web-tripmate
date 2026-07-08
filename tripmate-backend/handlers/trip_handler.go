package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/tripmate/backend/config"
	"github.com/tripmate/backend/models"
)

// CreateTripRequest represents the request to create a trip
type CreateTripRequest struct {
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Destination string  `json:"destination"`
	Price       float64 `json:"price"`
	Quota       int     `json:"quota"`
	StartDate   string  `json:"start_date"`
	EndDate     string  `json:"end_date"`
	ImageURL    string  `json:"image_url"`
}

// UpdateTripRequest represents the request to update a trip
type UpdateTripRequest struct {
	ID          int64   `json:"id"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Destination string  `json:"destination"`
	Price       float64 `json:"price"`
	Quota       int     `json:"quota"`
	StartDate   string  `json:"start_date"`
	EndDate     string  `json:"end_date"`
	ImageURL    string  `json:"image_url"`
}

// GetTripsHandler handles GET requests for trips
func GetTripsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Check query parameters
	tripID := r.URL.Query().Get("id")
	organizerID := r.URL.Query().Get("organizer_id")
	searchTerm := r.URL.Query().Get("search")

	w.Header().Set("Content-Type", "application/json")

	// Get single trip by ID
	if tripID != "" {
		id, err := strconv.ParseInt(tripID, 10, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "Invalid trip ID"})
			return
		}

		trip, err := models.GetTripByID(config.DB, id)
		if err != nil {
			if err == sql.ErrNoRows {
				w.WriteHeader(http.StatusNotFound)
				json.NewEncoder(w).Encode(map[string]string{"error": "Trip not found"})
				return
			}
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(trip)
		return
	}

	// Get trips by organizer
	if organizerID != "" {
		orgID, err := strconv.ParseInt(organizerID, 10, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "Invalid organizer ID"})
			return
		}

		trips, err := models.GetTripsByOrganizer(config.DB, orgID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(trips)
		return
	}

	// Search trips
	if searchTerm != "" {
		trips, err := models.SearchTrips(config.DB, searchTerm)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(trips)
		return
	}

	// Get all active trips (public)
	trips, err := models.GetAllActiveTrips(config.DB)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(trips)
}

// CreateTripHandler handles POST requests to create a trip
func CreateTripHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get organizer ID from context
	userID, err := models.GetUserIDFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User not authenticated"})
		return
	}

	var req CreateTripRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	// Validate required fields
	if req.Title == "" || req.Destination == "" || req.StartDate == "" || req.EndDate == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Missing required fields"})
		return
	}

	// Parse dates
	startDate, err := time.Parse("2006-01-02", req.StartDate)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid start date format"})
		return
	}

	endDate, err := time.Parse("2006-01-02", req.EndDate)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid end date format"})
		return
	}

	// Insert trip
	query := `INSERT INTO trips (organizer_id, title, description, destination, price, quota, 
			  start_date, end_date, image_url, status, created_at, updated_at) 
			  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'active', NOW(), NOW()) 
			  RETURNING id, created_at, updated_at`

	var tripID int64
	var createdAt, updatedAt time.Time
	err = config.DB.QueryRow(query, userID, req.Title, req.Description, req.Destination,
		req.Price, req.Quota, startDate, endDate, req.ImageURL).
		Scan(&tripID, &createdAt, &updatedAt)

	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to create trip"})
		return
	}

	// Get the created trip
	trip, err := models.GetTripByID(config.DB, tripID)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Trip created but failed to retrieve"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(trip)
}

// UpdateTripHandler handles PUT requests to update a trip
func UpdateTripHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get organizer ID from context
	userID, err := models.GetUserIDFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User not authenticated"})
		return
	}

	var req UpdateTripRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	// Check ownership
	trip, err := models.GetTripByID(config.DB, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "Trip not found"})
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
		return
	}

	if trip.OrganizerID != userID {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "You don't have permission to update this trip"})
		return
	}

	// Parse dates
	startDate, _ := time.Parse("2006-01-02", req.StartDate)
	endDate, _ := time.Parse("2006-01-02", req.EndDate)

	// Update trip
	query := `UPDATE trips SET title = $1, description = $2, destination = $3, price = $4, 
			  quota = $5, start_date = $6, end_date = $7, image_url = $8, updated_at = NOW() 
			  WHERE id = $9`

	_, err = config.DB.Exec(query, req.Title, req.Description, req.Destination, req.Price,
		req.Quota, startDate, endDate, req.ImageURL, req.ID)

	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to update trip"})
		return
	}

	// Get updated trip
	updatedTrip, _ := models.GetTripByID(config.DB, req.ID)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedTrip)
}

// DeleteTripHandler handles DELETE requests to delete a trip
func DeleteTripHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get organizer ID from context
	userID, err := models.GetUserIDFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User not authenticated"})
		return
	}

	tripID := r.URL.Query().Get("id")
	if tripID == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Trip ID required"})
		return
	}

	id, err := strconv.ParseInt(tripID, 10, 64)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid trip ID"})
		return
	}

	// Check ownership
	trip, err := models.GetTripByID(config.DB, id)
	if err != nil {
		if err == sql.ErrNoRows {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "Trip not found"})
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
		return
	}

	if trip.OrganizerID != userID {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "You don't have permission to delete this trip"})
		return
	}

	// Delete trip
	query := `DELETE FROM trips WHERE id = $1`
	_, err = config.DB.Exec(query, id)

	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to delete trip"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Trip deleted successfully"})
}