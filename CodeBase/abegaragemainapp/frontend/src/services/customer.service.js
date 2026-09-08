// services/customer.service.js
const api_url = process.env.REACT_APP_API_URL;

// Get all customers
const getAllCustomers = async (token) => {
  const response = await fetch(`${api_url}/api/customers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

// Get customer by ID
const getCustomerById = async (customerId, token) => {
  const response = await fetch(`${api_url}/api/customers/${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

// Search customers
const searchCustomers = async (searchTerm, token) => {
  const response = await fetch(
    `${api_url}/api/customers/search?q=${encodeURIComponent(searchTerm)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    },
  );
  return response;
};

// Create customer
const createCustomer = async (customerData, token) => {
  const response = await fetch(`${api_url}/api/customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(customerData),
  });
  return response;
};

// Update customer
const updateCustomer = async (customerId, customerData, token) => {
  const response = await fetch(`${api_url}/api/customers/${customerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(customerData),
  });
  return response;
};

// Delete customer
const deleteCustomer = async (customerId, token) => {
  const response = await fetch(`${api_url}/api/customers/${customerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

export default {
  getAllCustomers,
  getCustomerById,
  searchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
