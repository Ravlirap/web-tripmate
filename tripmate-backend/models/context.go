package models

import (
	"context"
	"fmt"
)

// ContextKey is a type for context keys to avoid collisions
type ContextKey string

const (
	// UserIDKey is the context key for user ID
	UserIDKey ContextKey = "user_id"
	// RoleKey is the context key for user role
	RoleKey ContextKey = "role"
)

// GetUserIDFromContext retrieves the user ID from the request context
func GetUserIDFromContext(ctx context.Context) (int64, error) {
	userID, ok := ctx.Value(UserIDKey).(int64)
	if !ok {
		return 0, fmt.Errorf("user ID not found in context")
	}
	return userID, nil
}

// GetRoleFromContext retrieves the user role from the request context
func GetRoleFromContext(ctx context.Context) (string, error) {
	role, ok := ctx.Value(RoleKey).(string)
	if !ok {
		return "", fmt.Errorf("role not found in context")
	}
	return role, nil
}