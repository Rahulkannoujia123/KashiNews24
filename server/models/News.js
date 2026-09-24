const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: String,
  imageAlt: { type: String, trim: true },
  category: { type: String, required: true, index: true },
  location: { type: String, index: true },
  tags: [String],
  author: { type: String, trim: true },
  authorName: { type: String, trim: true },
  authorPhoto: String,
  isOriginal: { type: Boolean, default: false, index: true },
  isFeatured: { type: Boolean, default: false, index: true },
  isBreaking: { type: Boolean, default: false, index: true },
  seoTitle: { type: String, trim: true, maxlength: 100 },
  seoDescription: { type: String, trim: true, maxlength: 200 },
  summary: { type: String, trim: true, maxlength: 500 },
  source: { type: String, trim: true },
  sourceName: String,
  sourceUrl: String,
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft', index: true },
  publishedAt: Date,
  updatedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);
