const api_url = process.env.REACT_APP_API_URL;

// Get all services
const getAllServices = async (token) => {
  const response = await fetch(`${api_url}/api/services`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
};

// Get service by ID
const getServiceById = async (id, token) => {
  const response = await fetch(`${api_url}/api/services/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
};

// Create service
const createService = async (service, token) => {
  const response = await fetch(`${api_url}/api/service`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(service),
  });

  return response;
};

// Update service
const updateService = async (id, service, token) => {
  const response = await fetch(`${api_url}/api/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(service),
  });

  return response;
};

// Delete service
const deleteService = async (id, token) => {
  const response = await fetch(`${api_url}/api/services/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
};

export default {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
