const vehicleService = require('../services/vehicle.service');
const customerService = require('../services/customer.service');

async function createVehicle(req, res, next) {
  try {
    const customer_id = req.params.customer_id;

    const {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    } = req.body;

    // Validate required fields
    if (
      !vehicle_year ||
      !vehicle_make ||
      !vehicle_model ||
      !vehicle_type ||
      !vehicle_mileage ||
      !vehicle_tag ||
      !vehicle_serial ||
      !vehicle_color
    ) {
      return res.status(400).json({
        status: 'fail',
        error: 'All vehicle fields are required!',
      });
    }

    // Check customer
    const customer = await customerService.getCustomerById(customer_id);

    if (!customer || customer.length === 0) {
      return res.status(404).json({
        status: 'fail',
        error: 'Customer not found!',
      });
    }

    const vehicleData = {
      customer_id,
      vehicle_year: String(vehicle_year).trim(),
      vehicle_make: String(vehicle_make).trim(),
      vehicle_model: String(vehicle_model).trim(),
      vehicle_type: String(vehicle_type).trim(),
      vehicle_mileage: String(vehicle_mileage).trim(),
      vehicle_tag: String(vehicle_tag).trim(),
      vehicle_serial: String(vehicle_serial).trim(),
      vehicle_color: String(vehicle_color).trim(),
    };

    const vehicle = await vehicleService.createVehicle(vehicleData);

    if (!vehicle) {
      return res.status(400).json({
        status: 'fail',
        error: 'Failed to add vehicle!',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: vehicle,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

async function getVehiclesByCustomerId(req, res, next) {
  try {
    const customer_id = req.params.customer_id;

    const customer = await customerService.getCustomerById(customer_id);

    if (!customer || customer.length === 0) {
      return res.status(404).json({
        status: 'fail',
        error: 'Customer not found!',
      });
    }

    const vehicles = await vehicleService.getVehiclesByCustomerId(customer_id);

    return res.status(200).json({
      status: 'success',
      data: vehicles,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

async function updateVehicle(req, res) {
  try {
    const vehicle_id = req.params.vehicle_id;

    const {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    } = req.body;

    if (
      !vehicle_year ||
      !vehicle_make ||
      !vehicle_model ||
      !vehicle_type ||
      vehicle_mileage === undefined ||
      !vehicle_tag ||
      !vehicle_serial ||
      !vehicle_color
    ) {
      return res.status(400).json({
        status: 'fail',
        error: 'All vehicle fields are required!',
      });
    }

    const vehicleData = {
      vehicle_year: String(vehicle_year).trim(),
      vehicle_make: vehicle_make.trim(),
      vehicle_model: vehicle_model.trim(),
      vehicle_type: vehicle_type.trim(),
      vehicle_mileage: String(vehicle_mileage).trim(),
      vehicle_tag: vehicle_tag.trim(),
      vehicle_serial: vehicle_serial.trim(),
      vehicle_color: vehicle_color.trim(),
    };

    const updated = await vehicleService.updateVehicle(vehicle_id, vehicleData);

    if (!updated) {
      return res.status(404).json({
        status: 'fail',
        error: 'Vehicle not found or update failed!',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Vehicle updated successfully!',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

async function deleteVehicle(req, res) {
  try {
    const vehicle_id = req.params.vehicle_id;

    const deleted = await vehicleService.deleteVehicle(vehicle_id);

    if (!deleted) {
      return res.status(404).json({
        status: 'fail',
        error: 'Vehicle not found!',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Vehicle deleted successfully!',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

module.exports = {
  createVehicle,
  getVehiclesByCustomerId,
  updateVehicle,
  deleteVehicle,
};
