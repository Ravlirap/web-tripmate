# TripMate Backend API

A robust Go-based REST API for the TripMate open trip booking platform, featuring JWT authentication, role-based access control, and PostgreSQL database.

## Features

- 🔐 JWT-based authentication
- 👥 Role-based access control (Traveler, Organizer, Admin)
- 🗄️ PostgreSQL database with proper indexing
- 🔒 Secure password hashing with bcrypt
- 🌐 CORS support for frontend integration
- 📊 Admin dashboard with platform statistics
- ✅ Input validation and error handling

## Tech Stack

- **Language**: Go 1.21+
- **Database**: PostgreSQL 14+
- **Authentication**: JWT (golang-jwt)
- **Password Hashing**: bcrypt
- **Database Driver**: lib/pq

## Prerequisites

- Go 1.21 or higher
- PostgreSQL 14 or higher
- Git

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd tripmate-backend
```

### 2. Install dependencies

```bash
go mod download
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=trip_mate_db

JWT_SECRET=your_jwt_secret_key_here_please_change_in_production

PORT=8080

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 4. Set up the database

Create the PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE trip_mate_db;
\q
```

Run the migrations:

```bash
psql -U postgres -d trip_mate_db -f migrations/001_create_users_table.sql
psql -U postgres -d trip_mate_db -f migrations/002_create_trips_table.sql
psql -U postgres -d trip_mate_db -f migrations/003_create_bookings_table.sql
```

### 5. Create admin user

Generate a bcrypt hash for the admin password:

```bash
go run -exec "echo 'admin123' | bcrypt-cli hash"
```

Or use an online bcrypt generator, then update the hash in `migrations/001_create_users_table.sql` and re-run the migration.

## Running the Application

### Development mode

```bash
go run main.go
```

The server will start on `http://localhost:8080`

### Build for production

```bash
go build -o tripmate-api
./tripmate-api
```

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Authentication

**POST** `/api/register`
- Register a new user
- Body: `{ "name": "string", "email": "string", "password": "string", "role": "traveler|organizer" }`
- Returns: User object and JWT token

**POST** `/api/login`
- Login with email and password
- Body: `{ "email": "string", "password": "string" }`
- Returns: User object and JWT token

**POST** `/api/login/google`
- Login with Google OAuth
- Body: `{ "id_token": "string", "name": "string", "email": "string" }`
- Returns: User object and JWT token

#### Trips

**GET** `/api/trips`
- Get all active trips (public listing)
- Query params:
  - `id`: Get specific trip by ID
  - `organizer_id`: Get trips by organizer
  - `search`: Search trips by title or destination
- Returns: Array of trip objects

### Authenticated Endpoints (Require JWT Token)

All authenticated requests must include: `Authorization: Bearer <token>`

#### Bookings (Traveler & Organizer)

**GET** `/api/bookings`
- Get bookings
- Query params:
  - `user_id`: Get bookings for specific user (admin only or own bookings)
  - `organizer_id`: Get bookings for organizer's trips (organizer or admin)
- Returns: Array of booking objects with trip details

**POST** `/api/bookings/create`
- Create a new booking
- Body: `{ "trip_id": number, "participant_count": number, "notes": "string" }`
- Returns: Created booking object

#### Trip Management (Organizer Only)

**POST** `/api/trips/create`
- Create a new trip
- Body:
```json
{
  "title": "string",
  "description": "string",
  "destination": "string",
  "price": number,
  "quota": number,
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "image_url": "string"
}
```
- Returns: Created trip object

**PUT** `/api/trips/update`
- Update an existing trip (must be owner)
- Body: Same as create + `id` field
- Returns: Updated trip object

**DELETE** `/api/trips/delete?id=<trip_id>`
- Delete a trip (must be owner)
- Returns: Success message

**PUT** `/api/bookings/status`
- Update booking status (only for trips you organize)
- Body: `{ "id": number, "status": "pending|confirmed|cancelled" }`
- Returns: Updated booking object

### Admin Endpoints (Admin Role Only)

**GET** `/api/admin/stats`
- Get platform-wide statistics
- Returns: Dashboard stats (total users, trips, bookings, etc.)

**GET** `/api/admin/users`
- List all users in the system
- Returns: Array of user objects

**PATCH** `/api/admin/users/status?id=<user_id>`
- Update user status
- Body: `{ "status": "active|suspended" }`
- Returns: Success message

**GET** `/api/admin/trips`
- List all trips (including inactive)
- Returns: Array of trip objects

**PATCH** `/api/admin/trips/status?id=<trip_id>`
- Update trip status
- Body: `{ "status": "active|inactive" }`
- Returns: Success message

**GET** `/api/admin/bookings`
- List all bookings in the system
- Returns: Array of booking objects with details

### Health Check

**GET** `/health`
- Check API health status
- Returns: `{ "status": "ok" }`

## Project Structure

```
tripmate-backend/
├── config/              # Configuration (database)
├── handlers/            # HTTP request handlers
├── middleware/          # Middleware (CORS, auth, role)
├── migrations/          # Database migration files
├── models/              # Data models and database queries
├── utils/               # Utility functions (JWT)
├── .env.example         # Environment variables template
├── go.mod              # Go module dependencies
├── go.sum              # Go module checksums
├── main.go             # Application entry point
└── README.md           # This file
```

## Security Considerations

1. **JWT Secret**: Change the JWT_SECRET in production to a strong, random value
2. **Admin Password**: Change the default admin password immediately after setup
3. **CORS**: Configure ALLOWED_ORIGINS to only allow your frontend domains
4. **HTTPS**: Use HTTPS in production (configure reverse proxy like Nginx)
5. **Database**: Use strong database credentials and restrict access
6. **Rate Limiting**: Consider adding rate limiting for production

## Development Tips

- Use tools like Postman or curl to test API endpoints
- Check server logs for debugging information
- Database queries are logged for development
- CORS is configured for local development by default

## Common Issues

### Database Connection Failed
- Verify PostgreSQL is running
- Check database credentials in .env
- Ensure database exists

### JWT Token Invalid
- Check JWT_SECRET matches between requests
- Tokens expire after 24 hours by default

### CORS Errors
- Add your frontend URL to ALLOWED_ORIGINS in .env
- Ensure preflight OPTIONS requests are handled

## License

[Your License Here]

## Contributing

[Contributing Guidelines Here]