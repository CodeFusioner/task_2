// Api endpoints

POST /api/auth/signup
POST /api/auth/login
GET /api/events
GET /api/events/:id
POST /api/events            (admin only)
PUT /api/events/:id         (admin only)
DELETE /api/events/:id      (admin only)
POST /api/bookings/book/:eventId    (authenticated users)
GET /api/bookings           (authenticated users)
DELETE /api/bookings/:bookingId     (authenticated users)


// environment variables

PORT=5000
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h

// run command

npm install
node server.js
