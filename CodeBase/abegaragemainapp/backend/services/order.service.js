const crypto = require('crypto');
const conn = require('../config/db.config');

class OrderService {
  async createOrder(order) {
    const hash = crypto.randomBytes(32).toString('hex');

    const result = await conn.query(
      `INSERT INTO orders
     (employee_id, customer_id, vehicle_id, active_order, order_hash)
     VALUES (?, ?, ?, ?, ?)`,
      [order.employee_id, order.customer_id, order.vehicle_id, 1, hash],
    );

    const orderId = result.insertId;

    // Set initial status to Pending
    await conn.query(
      `INSERT INTO order_status
     (order_id, order_status)
     VALUES (?, ?)`,
      [orderId, 1],
    );

    for (const service of order.services) {
      await conn.query(
        `INSERT INTO order_services
       (order_id, service_id, service_completed)
       VALUES (?, ?, ?)`,
        [orderId, service.service_id, 0],
      );
    }

    return this.getOrderById(orderId);
  }

  async getOrderById(id) {
    const rows = await conn.query(
      `SELECT 
        o.*,
        c.customer_first_name,
        c.customer_last_name,
        ci.customer_email,
        ci.customer_phone_number,
        v.vehicle_make,
        v.vehicle_model,
        v.vehicle_year,
        v.vehicle_tag,
        v.vehicle_serial,
        e.employee_first_name,
        e.employee_last_name,
        os.order_status
     FROM orders o
     JOIN customer_info c ON o.customer_id = c.customer_id
     JOIN customer_identifier ci ON o.customer_id = ci.customer_id
     JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
     LEFT JOIN employee_info e ON o.employee_id = e.employee_id
     LEFT JOIN order_status os ON o.order_id = os.order_id
     WHERE o.order_id = ?`,
      [id],
    );

    if (!rows.length) return null;

    rows[0].services = await conn.query(
      `SELECT
        os.order_service_id,
        os.service_id,
        os.service_completed,
        s.service_name,
        s.service_price
     FROM order_services os
     JOIN service s ON os.service_id = s.service_id
     WHERE os.order_id = ?`,
      [id],
    );

    return rows[0];
  }

  async getAllOrders() {
    return await conn.query(
      `SELECT
        o.order_id,
        o.employee_id,
        o.customer_id,
        o.vehicle_id,
        o.order_date,
        o.active_order,
        o.order_hash,

        c.customer_first_name,
        c.customer_last_name,

        ci.customer_email,
        ci.customer_phone_number,

        v.vehicle_make,
        v.vehicle_model,
        v.vehicle_year,
        v.vehicle_tag,

        e.employee_first_name,
        e.employee_last_name,

        os.order_status

     FROM orders o

     JOIN customer_info c
       ON o.customer_id = c.customer_id

     JOIN customer_identifier ci
       ON o.customer_id = ci.customer_id

     JOIN customer_vehicle_info v
       ON o.vehicle_id = v.vehicle_id

     LEFT JOIN employee_info e
       ON o.employee_id = e.employee_id

     LEFT JOIN order_status os
       ON o.order_id = os.order_id

     ORDER BY o.order_date DESC`,
    );
  }

  async deleteOrder(id) {
    await conn.query(`DELETE FROM order_services WHERE order_id = ?`, [id]);

    const result = await conn.query(`DELETE FROM orders WHERE order_id = ?`, [
      id,
    ]);

    return result.affectedRows === 1;
  }

  // Update order status
  async updateOrderStatus(id, status) {
    const orders = await conn.query(
      `SELECT order_id
     FROM orders
     WHERE order_id = ?`,
      [id],
    );

    if (!orders.length) {
      return null;
    }

    const result = await conn.query(
      `UPDATE order_status
     SET order_status = ?
     WHERE order_id = ?`,
      [status, id],
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.getOrderById(id);
  }

  // Get order statuses
  async getOrderStatuses() {
    const rows = await conn.query(
      'SELECT * FROM order_status ORDER BY order_status_id',
    );
    return rows;
  }

  // Search orders
  async searchOrders(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    const orders = await conn.query(
      `SELECT 
        o.*,
        c.customer_first_name,
        c.customer_last_name,
        ci.customer_email,
        ci.customer_phone_number,
        v.vehicle_make,
        v.vehicle_model,
        v.vehicle_year,
        v.vehicle_tag,
        COALESCE(e.employee_first_name, 'Unknown') AS employee_first_name,
        COALESCE(e.employee_last_name, '') AS employee_last_name,
        os.order_status

     FROM orders o

     JOIN customer_info c
       ON o.customer_id = c.customer_id

     JOIN customer_identifier ci
       ON o.customer_id = ci.customer_id

     JOIN customer_vehicle_info v
       ON o.vehicle_id = v.vehicle_id

     LEFT JOIN employee_info e
       ON o.employee_id = e.employee_id

     LEFT JOIN order_status os
       ON o.order_id = os.order_id

     WHERE (
       c.customer_first_name LIKE ? OR 
       c.customer_last_name LIKE ? OR 
       ci.customer_email LIKE ? OR 
       ci.customer_phone_number LIKE ? OR
       v.vehicle_make LIKE ? OR
       v.vehicle_model LIKE ? OR
       v.vehicle_tag LIKE ? OR
       o.order_id LIKE ?
     )

     ORDER BY o.order_date DESC
     LIMIT 50`,
      [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ],
    );

    return orders;
  }
}

module.exports = new OrderService();
