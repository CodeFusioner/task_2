const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db.config');


require('./models/user.model');
require('./models/event.model');
require('./models/booking.model');


const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const bookingRoutes = require('./routes/booking.routes');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === "OPTIONS") {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);


app.get('/', (req, res) => {
  res.send('Event Booking System API is running.');
});


(async () => {
  try {
    await sequelize.sync({ alter: true }); 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
})();