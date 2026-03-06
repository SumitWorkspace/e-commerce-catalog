import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const router = Router();

// Standard CRUD
router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/:id', ProductController.get); // This now handles Aggregation
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

// New: Stock Management Route
router.patch('/stock-update', ProductController.updateStock); 

export default router;