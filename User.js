// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  provider: { type: String, required: true },        // 'google'
  providerId: { type: String, required: true },      // google id
  displayName: { type: String },
  email: { type: String },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// add index so provider+providerId is unique (helps upsert)
UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
