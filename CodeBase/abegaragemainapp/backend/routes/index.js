const express = require('express');
const router = express.Router();

const installRouter = require('./install.routes');
const employeeRouter = require('./employee.routes');
const customerRouter = require('./customer.routes');
const serviceRoutes = require('./service.routes');
const vehicleRoutes = require('./vehicle.routes');
const orderRoutes = require('./order.routes');
const loginRoutes = require('./login.routes');

router.use(installRouter);
router.use(employeeRouter);
router.use(customerRouter);
router.use(serviceRoutes);
router.use(vehicleRoutes);
router.use(orderRoutes);
router.use(loginRoutes);

module.exports = router;
