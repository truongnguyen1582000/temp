const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');
const managerAuth = require('../middlewares/managerAuth');

router.use(authMiddleware, managerAuth);

router.post('/', productController.createProduct);
router.get('/', productController.getAllProduct);
router.get('/:productId', productController.getProductById);
router.patch('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
