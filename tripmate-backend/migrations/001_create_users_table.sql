-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('traveler', 'organizer', 'admin')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create index on role for filtering
CREATE INDEX idx_users_role ON users(role);

-- Create index on status for filtering
CREATE INDEX idx_users_status ON users(status);

-- Insert a default admin user (password: admin123)
-- Note: In production, change this password immediately
INSERT INTO users (name, email, password, role, status) 
VALUES (
    'Admin User',
    'admin@tripmate.com',
    '$2a$10$YourHashedPasswordHere',  -- You need to hash 'admin123' with bcrypt
    'admin',
    'active'
) ON CONFLICT (email) DO NOTHING;