package models

import (
	"database/sql"
	"time"
)

// User represents a user in the system
type User struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"-"` // Never expose password in JSON
	Role      string    `json:"role"` // traveler, organizer, admin
	Status    string    `json:"status"` // active, suspended
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// UserResponse represents a safe user object for API responses (without password)
type UserResponse struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// ToResponse converts a User to UserResponse
func (u *User) ToResponse() UserResponse {
	return UserResponse{
		ID:        u.ID,
		Name:      u.Name,
		Email:     u.Email,
		Role:      u.Role,
		Status:    u.Status,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}

// GetUserByID retrieves a user by ID
func GetUserByID(db *sql.DB, userID int64) (*User, error) {
	user := &User{}
	query := `SELECT id, name, email, password, role, status, created_at, updated_at 
			  FROM users WHERE id = $1`
	
	err := db.QueryRow(query, userID).Scan(
		&user.ID, &user.Name, &user.Email, &user.Password,
		&user.Role, &user.Status, &user.CreatedAt, &user.UpdatedAt,
	)
	
	if err != nil {
		return nil, err
	}
	
	return user, nil
}

// GetUserByEmail retrieves a user by email
func GetUserByEmail(db *sql.DB, email string) (*User, error) {
	user := &User{}
	query := `SELECT id, name, email, password, role, status, created_at, updated_at 
			  FROM users WHERE email = $1`
	
	err := db.QueryRow(query, email).Scan(
		&user.ID, &user.Name, &user.Email, &user.Password,
		&user.Role, &user.Status, &user.CreatedAt, &user.UpdatedAt,
	)
	
	if err != nil {
		return nil, err
	}
	
	return user, nil
}

// GetAllUsers retrieves all users (admin only)
func GetAllUsers(db *sql.DB) ([]UserResponse, error) {
	query := `SELECT id, name, email, role, status, created_at, updated_at 
			  FROM users ORDER BY created_at DESC`
	
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var users []UserResponse
	for rows.Next() {
		var user UserResponse
		err := rows.Scan(
			&user.ID, &user.Name, &user.Email, &user.Role,
			&user.Status, &user.CreatedAt, &user.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	
	return users, nil
}

// UpdateUserStatus updates a user's status (admin only)
func UpdateUserStatus(db *sql.DB, userID int64, status string) error {
	query := `UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2`
	_, err := db.Exec(query, status, userID)
	return err
}