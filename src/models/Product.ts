import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    condition: {
      type: String,
      enum: ['new', 'used', 'old'],
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    weight: {
      type: String,
    },
    dimension: {
      type: String,
    },
    color: {
      type: String,
    },
    material: {
      type: String,
    },
    specs: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    delivery: {
      available: Boolean,
      fee: Number,
    },
    pickup: {
      available: Boolean,
      establishment: String,
      building: String,
      address: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
