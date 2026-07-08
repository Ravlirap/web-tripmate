package middleware

import (
	"encoding/json"
	"net/http"

	"github.com/tripmate/backend/models"
)

// RequireRole creates a middleware that checks if the user has one of the required roles
func RequireRole(allowedRoles ...string) func(http.HandlerFunc) http.HandlerFunc {
	return func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			// Get role from context (set by AuthRequired middleware)
			role, err := models.GetRoleFromContext(r.Context())
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusUnauthorized)
				json.NewEncoder(w).Encode(map[string]string{
					"error": "User role not found in context",
				})
				return
			}

			// Check if user's role is in the allowed roles
			allowed := false
			for _, allowedRole := range allowedRoles {
				if role == allowedRole {
					allowed = true
					break
				}
			}

			if !allowed {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusForbidden)
				json.NewEncoder(w).Encode(map[string]string{
					"error": "Access denied: insufficient permissions",
				})
				return
			}

			next(w, r)
		}
	}
}