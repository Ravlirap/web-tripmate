package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/tripmate/backend/models"
	"github.com/tripmate/backend/utils"
)

// AuthRequired is a middleware that validates JWT tokens
func AuthRequired(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Authorization header required",
			})
			return
		}

		// Check if it's a Bearer token
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Invalid authorization header format",
			})
			return
		}

		token := parts[1]

		// Parse and validate the token
		claims, err := utils.ParseToken(token)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Invalid or expired token",
			})
			return
		}

		// Add user info to context
		ctx := context.WithValue(r.Context(), models.UserIDKey, claims.UserID)
		ctx = context.WithValue(ctx, models.RoleKey, claims.Role)

		// Call next handler with updated context
		next(w, r.WithContext(ctx))
	}
}