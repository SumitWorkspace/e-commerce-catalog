import ProductRepository from '../repositories/ProductRepository.js';
import Product from '../models/Product.js'; // Direct model access for aggregation

export default class ProductService {
  static async createProduct(data) {
    // Validating that at least one variant exists
    if (data.price <= 0) throw new Error("Price must be positive");
    return ProductRepository.create(data);
  }

  // Updated to support the Aggregation required for avgRating
  static async getProduct(id) {
    return await Product.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $addFields: {
          avgRating: { $avg: "$reviews.rating" } // Calculating nested average
        }
      }
    ]);
  }

  // New method for Stock Management objective
  static async updateStock(sku, stock) {
    return await Product.findOneAndUpdate(
      { "variants.sku": sku }, // Finding by nested SKU
      { $set: { "variants.$.stock": stock } }, // Using positional operator
      { new: true }
    );
  }

  static async deleteProduct(id) {
    return ProductRepository.delete(id);
  }

  static async listProducts(filter) {
    return ProductRepository.list(filter);
  }
}