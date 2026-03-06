import ProductService from '../services/ProductService.js';
import Product from '../models/Product.js'; // Import model directly for aggregation

export default class ProductController {
  // 1. Existing Create Method (Keep this)
  static async create(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // 2. Updated GET: Implement Aggregation
  // This calculates avgRating from the nested reviews array
  static async get(req, res) {
    try {
      const product = await Product.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
        {
          $addFields: {
            avgRating: { $avg: "$reviews.rating" } // Requirement: Perform aggregation
          }
        }
      ]);
      
      if (!product.length) return res.status(404).send('Not found');
      res.json(product[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // 3. New Method: Implement Stock Update
  // This updates a nested variant based on its SKU
  static async updateStock(req, res) {
    try {
      const { sku, stock } = req.body;
      const updated = await Product.findOneAndUpdate(
        { "variants.sku": sku }, // Find product by nested SKU
        { $set: { "variants.$.stock": stock } }, // Positional operator to update nested field
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Keep delete and list as they are
  static async delete(req, res) { /* ... */ }
  static async list(req, res) { /* ... */ }
}