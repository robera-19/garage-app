const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customer.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.get(
  '/api/customers/search',
  [authMiddleware.verifyToken], // Allow authenticated users to search
  customerController.searchCustomers,
);

// Create customer
router.post(
  '/api/customer',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.createCustomer,
);

// Get all customers
router.get(
  '/api/customers',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.getAllCustomers,
);

// Get customer by ID
router.get(
  '/api/customers/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.getCustomerById,
);

// Update customer
router.put(
  '/api/customers/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.updateCustomer,
);

// Delete customer
router.delete(
  '/api/customers/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.deleteCustomer,
);

module.exports = router;
