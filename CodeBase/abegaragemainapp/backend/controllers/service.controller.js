const serviceService = require('../services/service.service');

// Create service
async function createService(req, res) {
  try {
    const { service_name, service_description, service_price } = req.body;

    if (
      !service_name ||
      !service_description ||
      service_price === undefined ||
      service_price === ''
    ) {
      return res.status(400).json({
        status: 'fail',
        error: 'Service name, description and price are required!',
      });
    }

    if (Number(service_price) < 0) {
      return res.status(400).json({
        status: 'fail',
        error: 'Service price cannot be negative!',
      });
    }

    const exists = await serviceService.checkIfServiceExists(
      service_name.trim(),
    );

    if (exists) {
      return res.status(400).json({
        status: 'fail',
        error: 'This service already exists!',
      });
    }

    const service = await serviceService.createService({
      service_name: service_name.trim(),
      service_description: service_description.trim(),
      service_price: Number(service_price),
    });

    if (!service) {
      return res.status(400).json({
        status: 'fail',
        error: 'Failed to add the service!',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: service,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

// Get all services
async function getAllServices(req, res) {
  try {
    const services = await serviceService.getAllServices();

    return res.status(200).json({
      status: 'success',
      data: services,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

// Get service by ID
async function getServiceById(req, res) {
  try {
    const service = await serviceService.getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: 'fail',
        error: 'Service not found!',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: service,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

// Update service
async function updateService(req, res) {
  try {
    const { service_name, service_description, service_price } = req.body;

    if (
      !service_name ||
      !service_description ||
      service_price === undefined ||
      service_price === ''
    ) {
      return res.status(400).json({
        status: 'fail',
        error: 'Service name, description and price are required!',
      });
    }

    if (Number(service_price) < 0) {
      return res.status(400).json({
        status: 'fail',
        error: 'Service price cannot be negative!',
      });
    }

    const service = await serviceService.getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: 'fail',
        error: 'Service not found!',
      });
    }

    const updated = await serviceService.updateService(req.params.id, {
      service_name: service_name.trim(),
      service_description: service_description.trim(),
      service_price: Number(service_price),
    });

    if (!updated) {
      return res.status(400).json({
        status: 'fail',
        error: 'Failed to update service!',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Service updated successfully!',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

// Delete service
async function deleteService(req, res) {
  try {
    const service = await serviceService.getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: 'fail',
        error: 'Service not found!',
      });
    }

    const deleted = await serviceService.deleteService(req.params.id);

    if (!deleted) {
      return res.status(400).json({
        status: 'fail',
        error: 'Failed to delete service!',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully!',
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
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
