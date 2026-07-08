package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/tripmate/backend/config"
	"github.com/tripmate/backend/handlers"
	"github.com/tripmate/backend/middleware"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	// Initialize database
	err = config.InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer config.CloseDB()

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Setup routes
	mux := http.NewServeMux()

	// Public routes (no authentication required)
	mux.HandleFunc("/api/login", middleware.CORS(handlers.LoginHandler))
	mux.HandleFunc("/api/register", middleware.CORS(handlers.RegisterHandler))
	mux.HandleFunc("/api/login/google", middleware.CORS(handlers.LoginGoogleHandler))
	mux.HandleFunc("/api/trips", middleware.CORS(handlers.GetTripsHandler))

	// Authenticated routes - Traveler & Organizer
	mux.HandleFunc("/api/bookings", middleware.CORS(middleware.AuthRequired(handlers.GetBookingsHandler)))
	mux.HandleFunc("/api/bookings/create", middleware.CORS(middleware.AuthRequired(handlers.CreateBookingHandler)))

	// Authenticated routes - Organizer only
	mux.HandleFunc("/api/trips/create", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("organizer")(handlers.CreateTripHandler))))
	mux.HandleFunc("/api/trips/update", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("organizer")(handlers.UpdateTripHandler))))
	mux.HandleFunc("/api/trips/delete", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("organizer")(handlers.DeleteTripHandler))))
	mux.HandleFunc("/api/bookings/status", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("organizer")(handlers.UpdateBookingStatusHandler))))

	// Admin routes
	mux.HandleFunc("/api/admin/stats", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("admin")(handlers.AdminStatsHandler))))
	mux.HandleFunc("/api/admin/users", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("admin")(handlers.AdminListUsersHandler))))
	mux.HandleFunc("/api/admin/users/status", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("admin")(handlers.AdminUpdateUserStatusHandler))))
	mux.HandleFunc("/api/admin/trips", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("admin")(handlers.AdminListTripsHandler))))
	mux.HandleFunc("/api/admin/trips/status", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("admin")(handlers.AdminUpdateTripStatusHandler))))
	mux.HandleFunc("/api/admin/bookings", middleware.CORS(middleware.AuthRequired(
		middleware.RequireRole("admin")(handlers.AdminListBookingsHandler))))

	// Health check endpoint
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	// Start server
	log.Printf("Server starting on port %s...", port)
	log.Printf("Environment: %s", os.Getenv("DB_HOST"))
	
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}