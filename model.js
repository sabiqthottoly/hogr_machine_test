const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  coins: Number,
  streak: Number,
  lastLoggedinDate:  { type : Date, default: Date.now }
});

module.exports = mongoose.model('users', userSchema);