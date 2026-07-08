-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
    id BIGSERIAL PRIMARY KEY,
    organizer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    destination VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    quota INT NOT NULL DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    image_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on organizer_id for faster lookups
CREATE INDEX idx_trips_organizer_id ON trips(organizer_id);

-- Create index on status for filtering
CREATE INDEX idx_trips_status ON trips(status);

-- Create index on destination for search
CREATE INDEX idx_trips_destination ON trips(destination);

-- Create index on start_date for date range queries
CREATE INDEX idx_trips_start_date ON trips(start_date);

-- Create full-text search index on title and destination
CREATE INDEX idx_trips_title_search ON trips USING gin(to_tsvector('english', title));
CREATE INDEX idx_trips_destination_search ON trips USING gin(to_tsvector('english', destination));