-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    trip_id BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    participant_count INT NOT NULL DEFAULT 1,
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_bookings_user_id ON bookings(user_id);

-- Create index on trip_id for faster lookups
CREATE INDEX idx_bookings_trip_id ON bookings(trip_id);

-- Create index on status for filtering
CREATE INDEX idx_bookings_status ON bookings(status);

-- Create composite index for organizer queries (trip_id, status)
CREATE INDEX idx_bookings_trip_status ON bookings(trip_id, status);