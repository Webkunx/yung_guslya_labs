const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  debt: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = model('User', userSchema);
