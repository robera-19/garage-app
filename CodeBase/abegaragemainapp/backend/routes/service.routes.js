const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Create service
router.post(
  '/api/service',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.createService,
);

// Get all services
router.get(
  '/api/services',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.getAllServices,
);

// Get service by ID
router.get(
  '/api/services/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.getServiceById,
);

// Update service
router.put(
  '/api/services/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.updateService,
);

// Delete service
router.delete(
  '/api/services/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.deleteService,
);

module.exports = router;
