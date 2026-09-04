const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Add employee
router.post(
  '/api/employee',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.createEmployee,
);

// Get all employees
router.get(
  '/api/employees',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployees,
);

// Get employee by ID
router.get(
  '/api/employees/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getEmployeeById,
);

// Update employee
router.put(
  '/api/employees/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.updateEmployee,
);

// Delete employee
router.delete(
  '/api/employees/:id',
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.deleteEmployee,
);

module.exports = router;
