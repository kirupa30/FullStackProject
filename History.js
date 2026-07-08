const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  keyword: { type: String, required: true },
  selectedImages: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", HistorySchema);
