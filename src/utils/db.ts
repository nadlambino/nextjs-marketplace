import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  namespace globalThis {
    var mongoose: {
      connection?: any;
      promise?: any;
    };
  }
}

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

async function connect() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: 'marketplace',
        autoIndex: true,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.connection = await cached.promise;
  return cached.connection;
}

export default connect;
