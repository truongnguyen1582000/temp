const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/', orderController.getOrder);
router.patch('/:orderId', authMiddleware, orderController.updateOrder);
router.patch(
  '/updateStatus/:orderId',
  authMiddleware,
  orderController.updateStatus
);
router.delete('/:orderId', authMiddleware, orderController.deleteOrder);

module.exports = router;
