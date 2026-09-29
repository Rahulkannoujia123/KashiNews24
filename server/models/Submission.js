const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  contact: { type: String, required: true, trim: true, maxlength: 120 },
  title: { type: String, required: true, trim: true, maxlength: 180 },
  description: { type: String, required: true, trim: true, maxlength: 5000 },
  location: { type: String, required: true, trim: true, maxlength: 120 },
  mediaUrl: { type: String, trim: true, maxlength: 1000 },
  sourceUrl: { type: String, trim: true, maxlength: 1000 },
  consent: { type: Boolean, required: true },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Rejected'], default: 'Pending', index: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
