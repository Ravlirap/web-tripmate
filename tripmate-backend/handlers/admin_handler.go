package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/tripmate/backend/config"
	"github.com/tripmate/backend/models"
)

// AdminStatsResponse represents the admin dashboard statistics
type AdminStatsResponse struct {
	TotalUsers    int `json:"total_users"`
	TotalTrips    int `json:"total_trips"`
	TotalBookings int `json:"total_bookings"`
	ActiveTrips   int `json:"active_trips"`
	PendingBookings int `json:"pending_bookings"`
}

// UpdateUserStatusRequest represents the request to update user status
type UpdateUserStatusRequest struct {
	Status string `json:"status"` // active, suspended
}

// UpdateTripStatusRequest represents the request to update trip status
type UpdateTripStatusRequest struct {
	Status string `json:"status"` // active, inactive
}

// AdminStatsHandler returns platform-wide statistics
func AdminStatsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var stats AdminStatsResponse

	// Get total users
	err := config.DB.QueryRow("SELECT COUNT(*) FROM users").Scan(&stats.TotalUsers)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch user count"})
		return
	}

	// Get total trips
	err = config.DB.QueryRow("SELECT COUNT(*) FROM trips").Scan(&stats.TotalTrips)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch trip count"})
		return
	}

	// Get active trips
	err = config.DB.QueryRow("SELECT COUNT(*) FROM trips WHERE status = 'active'").Scan(&stats.ActiveTrips)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch active trip count"})
		return
	}

	// Get total bookings
	err = config.DB.QueryRow("SELECT COUNT(*) FROM bookings").Scan(&stats.TotalBookings)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch booking count"})
		return
	}

	// Get pending bookings
	err = config.DB.QueryRow("SELECT COUNT(*) FROM bookings WHERE status = 'pending'").Scan(&stats.PendingBookings)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch pending booking count"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(stats)
}

// AdminListUsersHandler returns all users in the system
func AdminListUsersHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	users, err := models.GetAllUsers(config.DB)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch users"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

// AdminUpdateUserStatusHandler updates a user's status
func AdminUpdateUserStatusHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPatch {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user ID from URL
	userIDStr := r.URL.Query().Get("id")
	if userIDStr == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "User ID required"})
		return
	}

	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid user ID"})
		return
	}

	var req UpdateUserStatusRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	// Validate status
	if req.Status != "active" && req.Status != "suspended" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid status. Must be 'active' or 'suspended'"})
		return
	}

	// Update user status
	err = models.UpdateUserStatus(config.DB, userID, req.Status)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to update user status"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "User status updated successfully"})
}

// AdminListTripsHandler returns all trips in the system
func AdminListTripsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	trips, err := models.GetAllTrips(config.DB)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch trips"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(trips)
}

// AdminUpdateTripStatusHandler updates a trip's status
func AdminUpdateTripStatusHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPatch {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get trip ID from URL
	tripIDStr := r.URL.Query().Get("id")
	if tripIDStr == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Trip ID required"})
		return
	}

	tripID, err := strconv.ParseInt(tripIDStr, 10, 64)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid trip ID"})
		return
	}

	var req UpdateTripStatusRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	// Validate status
	if req.Status != "active" && req.Status != "inactive" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid status. Must be 'active' or 'inactive'"})
		return
	}

	// Update trip status
	err = models.UpdateTripStatus(config.DB, tripID, req.Status)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to update trip status"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Trip status updated successfully"})
}

// AdminListBookingsHandler returns all bookings in the system
func AdminListBookingsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	bookings, err := models.GetAllBookings(config.DB)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch bookings"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(bookings)
}