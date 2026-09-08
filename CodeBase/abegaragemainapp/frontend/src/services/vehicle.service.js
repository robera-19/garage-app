const api_url = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Get vehicles by customer ID
const getVehiclesByCustomerId = async (customerId, token) => {

  const response = await fetch(
    `${api_url}/api/customer/${customerId}/vehicles`,
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

// Create vehicle
const createVehicle = async (customerId, vehicleData, token) => {
  const response = await fetch(
    `${api_url}/api/customer/${customerId}/vehicle`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(vehicleData),
    },
  );
  return response;
};

const updateVehicle = async (vehicleId, vehicleData, token) => {
  const response = await fetch(`${api_url}/api/vehicle/${vehicleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(vehicleData),
  });
  return response;
};

const deleteVehicle = async (vehicleId, token) => {
  const response = await fetch(`${api_url}/api/vehicle/${vehicleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

export default {
  getVehiclesByCustomerId,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
