import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Nested schema for Product Variants
const VariantSchema = new Schema({
  sku: { type: String, required: true, unique: true },
  color: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

// Nested schema for User Reviews
const ReviewSchema = new Schema({
  userId: { type: String, required: true }, // Can use String or ObjectId
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
});

const ProductSchema = new Schema({
  name: { type: String, required: true, index: true }, // Index for optimization
  category: { type: String, required: true, index: true },
  description: { type: String },
  variants: [VariantSchema], // Embedded array
  reviews: [ReviewSchema],   // Embedded array
  avgRating: { type: Number, default: 0 }
});

export default model('Product', ProductSchema);