package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/tripmate/backend/config"
	"github.com/tripmate/backend/models"
)

// CreateBookingRequest represents the request to create a booking
type CreateBookingRequest struct {
	TripID           int64  `json:"trip_id"`
	ParticipantCount int    `json:"participant_count"`
	Notes            string `json:"notes"`
}

// UpdateBookingStatusRequest represents the request to update booking status
type UpdateBookingStatusRequest struct {
	ID     int64  `json:"id"`
	Status string `json:"status"` // pending, confirmed, cancelled
}

// CreateBookingHandler handles POST requests to create a booking
func CreateBookingHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user ID from context
	userID, err := models.GetUserIDFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User not authenticated"})
		return
	}

	var req CreateBookingRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	// Validate required fields
	if req.TripID == 0 || req.ParticipantCount <= 0 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid trip ID or participant count"})
		return
	}

	// Check if trip exists
	trip, err := models.GetTripByID(config.DB, req.TripID)
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

	// Check if trip is active
	if trip.Status != "active" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Trip is not available for booking"})
		return
	}

	// Insert booking
	query := `INSERT INTO bookings (user_id, trip_id, participant_count, notes, status, created_at, updated_at) 
			  VALUES ($1, $2, $3, $4, 'pending', NOW(), NOW()) 
			  RETURNING id, created_at, updated_at`

	var bookingID int64
	var createdAt, updatedAt string
	err = config.DB.QueryRow(query, userID, req.TripID, req.ParticipantCount, req.Notes).
		Scan(&bookingID, &createdAt, &updatedAt)

	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to create booking"})
		return
	}

	// Get the created booking
	booking, err := models.GetBookingByID(config.DB, bookingID)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Booking created but failed to retrieve"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(booking)
}

// GetBookingsHandler handles GET requests for bookings
func GetBookingsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user ID and role from context
	userID, err := models.GetUserIDFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User not authenticated"})
		return
	}

	role, err := models.GetRoleFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User role not found"})
		return
	}

	// Check query parameters
	queryUserID := r.URL.Query().Get("user_id")
	queryOrganizerID := r.URL.Query().Get("organizer_id")

	w.Header().Set("Content-Type", "application/json")

	// If specific user_id is requested
	if queryUserID != "" {
		requestedUserID, err := strconv.ParseInt(queryUserID, 10, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "Invalid user ID"})
			return
		}

		// Check if user is requesting their own bookings or is admin
		if requestedUserID != userID && role != "admin" {
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(map[string]string{"error": "Access denied"})
			return
		}

		bookings, err := models.GetBookingsByUser(config.DB, requestedUserID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(bookings)
		return
	}

	// If specific organizer_id is requested
	if queryOrganizerID != "" {
		requestedOrganizerID, err := strconv.ParseInt(queryOrganizerID, 10, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "Invalid organizer ID"})
			return
		}

		// Check if user is the organizer or admin
		if requestedOrganizerID != userID && role != "admin" {
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(map[string]string{"error": "Access denied"})
			return
		}

		bookings, err := models.GetBookingsByOrganizer(config.DB, requestedOrganizerID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(bookings)
		return
	}

	// Default: return user's own bookings based on role
	if role == "traveler" {
		bookings, err := models.GetBookingsByUser(config.DB, userID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(bookings)
	} else if role == "organizer" {
		bookings, err := models.GetBookingsByOrganizer(config.DB, userID)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(bookings)
	} else {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request"})
	}
}

// UpdateBookingStatusHandler handles PUT requests to update booking status
func UpdateBookingStatusHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user ID from context
	userID, err := models.GetUserIDFromContext(r.Context())
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User not authenticated"})
		return
	}

	var req UpdateBookingStatusRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	// Validate status
	if req.Status != "pending" && req.Status != "confirmed" && req.Status != "cancelled" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid status"})
		return
	}

	// Get booking
	booking, err := models.GetBookingByID(config.DB, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "Booking not found"})
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
		return
	}

	// Get trip to verify organizer ownership
	trip, err := models.GetTripByID(config.DB, booking.TripID)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to verify trip ownership"})
		return
	}

	// Check if user is the trip organizer
	if trip.OrganizerID != userID {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"error": "Only trip organizer can update booking status"})
		return
	}

	// Update booking status
	err = models.UpdateBookingStatus(config.DB, req.ID, req.Status)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to update booking status"})
		return
	}

	// Get updated booking
	updatedBooking, _ := models.GetBookingByID(config.DB, req.ID)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedBooking)
}