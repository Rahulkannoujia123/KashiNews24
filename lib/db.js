import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('[KashiNews24] MONGODB_URI is not configured; archive features will use live feeds only.');
}

let cached = globalThis.__kashiMongo || { conn: null, promise: null };
globalThis.__kashiMongo = cached;

export async function connectMongo() {
  if (!MONGODB_URI) return null;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
