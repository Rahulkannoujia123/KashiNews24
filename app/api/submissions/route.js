import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

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

const Submission = mongoose.models.KashiSubmission || mongoose.model('KashiSubmission', submissionSchema);

async function connectDB() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
}

function clean(value, max) {
  return String(value || '').trim().slice(0, max);
}

function validUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = {
      name: clean(body.name, 80),
      contact: clean(body.contact, 120),
      title: clean(body.title, 180),
      description: clean(body.description, 5000),
      location: clean(body.location, 120),
      mediaUrl: clean(body.mediaUrl, 1000),
      sourceUrl: clean(body.sourceUrl, 1000),
      consent: body.consent === true
    };

    if (!payload.name || !payload.contact || !payload.title || !payload.description || !payload.location || !payload.consent) {
      return NextResponse.json({ error: 'सभी जरूरी जानकारी भरें और सहमति दें।' }, { status: 400 });
    }
    if (!validUrl(payload.mediaUrl) || !validUrl(payload.sourceUrl)) {
      return NextResponse.json({ error: 'Media/Source URL सही नहीं है।' }, { status: 400 });
    }

    await connectDB();
    const submission = await Submission.create(payload);

    return NextResponse.json({
      ok: true,
      status: 'pending_review',
      id: String(submission._id),
      message: 'आपकी खबर संपादकीय जांच के लिए भेज दी गई है।'
    }, { status: 201 });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({
      error: process.env.MONGODB_URI ? 'खबर सेव नहीं हो सकी। कृपया थोड़ी देर बाद फिर कोशिश करें।' : 'MONGODB_URI सेट नहीं है।'
    }, { status: 500 });
  }
}
