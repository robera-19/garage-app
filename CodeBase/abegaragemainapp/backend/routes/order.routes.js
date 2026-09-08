const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Search orders (MUST come before /:id)
router.get(
  '/api/orders/search',
  [authMiddleware.verifyToken],
  orderController.searchOrders,
);

// Get order statuses
router.get(
  '/api/orders/statuses',
  [authMiddleware.verifyToken],
  orderController.getOrderStatuses,
);

// Create order
router.post(
  '/api/orders',
  [authMiddleware.verifyToken],
  orderController.createOrder,
);

// Get all orders
router.get(
  '/api/orders',
  [authMiddleware.verifyToken],
  orderController.getAllOrders,
);

// Get order by ID
router.get(
  '/api/orders/:id',
  [authMiddleware.verifyToken],
  orderController.getOrderById,
);

// Update order status
router.patch(
  '/api/orders/:id/status',
  [authMiddleware.verifyToken],
  orderController.updateOrderStatus,
);

// Delete order
router.delete(
  '/api/orders/:id',
  [authMiddleware.verifyToken],
  orderController.deleteOrder,
);

module.exports = router;
