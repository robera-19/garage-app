const api_url = process.env.REACT_APP_API_URL;

// Create a new order
const createOrder = async (orderData, token) => {
  const response = await fetch(`${api_url}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(orderData),
  });
  return response;
};

// Get all orders
const getAllOrders = async (token) => {
  const response = await fetch(`${api_url}/api/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

// Get order by ID
const getOrderById = async (orderId, token) => {
  const response = await fetch(`${api_url}/api/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

// Get my orders (for logged-in employee)
const getMyOrders = async (token) => {
  const response = await fetch(`${api_url}/api/orders/my-orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

// Get orders by customer ID
const getOrdersByCustomerId = async (customerId, token) => {
  const response = await fetch(`${api_url}/api/orders/customer/${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

// Update order status
const updateOrderStatus = async (orderId, statusId, token) => {
  const response = await fetch(`${api_url}/api/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({ order_status_id: statusId }),
  });
  return response;
};

// Get all order statuses
const getOrderStatuses = async (token) => {
  const response = await fetch(`${api_url}/api/orders/statuses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  return response;
};

// Search orders
const searchOrders = async (searchTerm, token) => {
  const response = await fetch(
    `${api_url}/api/orders/search?q=${encodeURIComponent(searchTerm)}`,
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

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  getMyOrders,
  getOrdersByCustomerId,
  updateOrderStatus,
  getOrderStatuses,
  searchOrders,
};
