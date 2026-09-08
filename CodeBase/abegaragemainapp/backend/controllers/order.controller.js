const orderService = require('../services/order.service');

// Create order
async function createOrder(req, res) {
  try {
    const orderData = {
      ...req.body,
      employee_id: req.employee_id,
    };

    const order = await orderService.createOrder(orderData);

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
}

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json({
      status: 'success',
      data: orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
}

// Get order by ID
async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: order,
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
}

// Update order status
async function updateOrderStatus(req, res) {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (![1, 2, 3, 4].includes(Number(status))) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid order status',
      });
    }

    const order = await orderService.updateOrderStatus(orderId, Number(status));

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error) {
    console.error('Update order status error:', error);

    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
}

// Get order statuses
async function getOrderStatuses(req, res) {
  try {
    const statuses = await orderService.getOrderStatuses();

    res.status(200).json({
      status: 'success',
      data: statuses,
    });
  } catch (error) {
    console.error('Get order statuses error:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
}

// Search orders
async function searchOrders(req, res) {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(200).json({
        status: 'success',
        data: [],
        message: 'Please enter at least 2 characters',
      });
    }

    const orders = await orderService.searchOrders(q);

    res.status(200).json({
      status: 'success',
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    console.error('Search orders error:', error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
}

// Delete order
async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    const deleted = await orderService.deleteOrder(orderId);

    if (!deleted) {
      return res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrderStatuses,
  searchOrders,
  deleteOrder,
};
