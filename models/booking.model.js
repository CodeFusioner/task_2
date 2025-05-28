const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model');
const Event = require('./event.model');


class Booking extends Model {}

Booking.init(
  {
    
  },
  {
    sequelize,
    modelName: 'Booking',
  }
);


User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId' });


Event.hasMany(Booking, { foreignKey: 'eventId', onDelete: 'CASCADE' });
Booking.belongsTo(Event, { foreignKey: 'eventId' });


module.exports = Booking;