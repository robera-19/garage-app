const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicle.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/api/customer/:customer_id/vehicle',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.createVehicle,
);

router.get(
  '/api/customer/:customer_id/vehicles',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getVehiclesByCustomerId,
);

router.put(
  '/api/vehicle/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.updateVehicle,
);

router.delete(
  '/api/vehicle/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.deleteVehicle,
);

module.exports = router;
