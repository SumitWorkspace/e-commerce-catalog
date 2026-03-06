import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const router = Router();

router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/:id', ProductController.get);
// Only use 'update' if the method actually exists in your controller!
// If it's missing, comment this line out temporarily to get the app LIVE
// router.put('/:id', ProductController.update); 
router.delete('/:id', ProductController.delete);

export default router;
