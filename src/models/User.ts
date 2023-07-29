import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['m', 'f', 'o'],
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  seller: {
    isBanned: {
      type: Boolean,
      default: false,
    },
    bannedReason: String,
    bannedUntil: {
      type: Date,
      default: null,
    },
  },
  buyer: {
    isBanned: {
      type: Boolean,
      default: false,
    },
    bannedReason: String,
    bannedUntil: {
      type: Date,
      default: null,
    },
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
