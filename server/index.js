require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const News = require('./models/News');

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 120 }));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'kashi-live-24-api' }));
app.get('/api/news', async (req, res) => {
  try {
    const { q, category, location, status = 'Published', page = 1, limit = 12 } = req.query;
    const filter = { status };
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { excerpt: new RegExp(q, 'i') }];
    const skip = (Math.max(1, Number(page)) - 1) * Math.min(50, Number(limit));
    const items = await News.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(Math.min(50, Number(limit))).lean();
    res.json({ items, page: Number(page), hasMore: items.length === Number(limit) });
  } catch (error) { res.status(500).json({ error: 'Unable to load news' }); }
});
app.get('/api/news/:slug', async (req, res) => {
  const item = await News.findOneAndUpdate({ slug: req.params.slug, status: 'Published' }, { $inc: { views: 1 } }, { new: true }).lean();
  if (!item) return res.status(404).json({ error: 'News not found' });
  res.json(item);
});
app.post('/api/submissions', async (req, res) => {
  const { name, contact, title, description, location, consent } = req.body;
  if (!name || !contact || !title || !description || !location || !consent) return res.status(400).json({ error: 'All required fields must be provided' });
  res.status(201).json({ status: 'pending_review', message: 'Submission received for editorial review' });
});
const port = process.env.API_PORT || 4000;
if (require.main === module) mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(port, () => console.log(`API listening on ${port}`))).catch((error) => { console.error(error.message); process.exit(1); });
module.exports = app;
