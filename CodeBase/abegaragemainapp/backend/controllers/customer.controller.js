const customerService = require('../services/customer.service');

async function searchCustomers(req, res, next) {
  try {
    const { q } = req.query;
    console.log('Searching for customer:', q);

    if (!q || q.length < 2) {
      return res.status(200).json({
        status: 'success',
        data: [],
        message: 'Please enter at least 2 characters',
      });
    }

    const customers = await customerService.searchCustomers(q);

    return res.status(200).json({
      status: 'success',
      data: customers,
      count: customers.length,
    });
  } catch (error) {
    console.log('Search customers error:', error);
    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

// Create customer
async function createCustomer(req, res, next) {
  try {
    // Check if customer email already exists
    const customerExists = await customerService.checkIfCustomerExists(
      req.body.customer_email,
    );

    if (customerExists) {
      return res.status(400).json({
        error:
          'This email address is already associated with another customer!',
      });
    }

    const customerData = req.body;

    // Create customer
    const customer = await customerService.createCustomer(customerData);

    if (!customer) {
      return res.status(400).json({
        error: 'Failed to add the customer!',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: customer,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Something went wrong!',
    });
  }
}

// Get all customers
async function getAllCustomers(req, res, next) {
  try {
    const customers = await customerService.getAllCustomers();

    return res.status(200).json({
      status: 'success',
      data: customers,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

// Get customer by ID
async function getCustomerById(req, res, next) {
  try {
    const customer_id = req.params.id;

    const customer = await customerService.getCustomerById(customer_id);

    if (!customer || customer.length === 0) {
      return res.status(404).json({
        status: 'fail',
        error: 'Customer not found!',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: customer[0],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

// Update customer
async function updateCustomer(req, res, next) {
  try {
    const customer_id = req.params.id;

    // Check if customer exists
    const customer = await customerService.getCustomerById(customer_id);

    if (!customer || customer.length === 0) {
      return res.status(404).json({
        status: 'fail',
        error: 'Customer not found!',
      });
    }

    const updated = await customerService.updateCustomer(customer_id, req.body);

    if (!updated) {
      return res.status(400).json({
        status: 'fail',
        error: 'Failed to update customer!',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Customer updated successfully!',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      error: 'Something went wrong!',
    });
  }
}

// Delete customer
async function deleteCustomer(req, res, next) {
  try {
    const customer_id = req.params.id;

    // Check if customer exists
    const customer = await customerService.getCustomerById(customer_id);

    if (!customer || customer.length === 0) {
      return res.status(404).json({
        status: 'fail',
        error: 'Customer not found!',
      });
    }

    const deleted = await customerService.deleteCustomer(customer_id);

    if (!deleted) {
      return res.status(400).json({
        status: 'fail',
        error: 'Failed to delete customer!',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Customer deleted successfully!',
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
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
};
