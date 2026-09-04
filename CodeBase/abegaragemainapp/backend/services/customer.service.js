const conn = require('../config/db.config');

// Check if customer already exists
async function checkIfCustomerExists(email) {
  const query = `
    SELECT *
    FROM customer_identifier
    WHERE customer_email = ?
  `;

  const rows = await conn.query(query, [email]);

  return rows.length > 0;
}

// Create a new customer
async function createCustomer(customer) {
  try {
    // Insert customer identifier
    const query1 = `
      INSERT INTO customer_identifier
      (
        customer_email,
        customer_phone_number,
        customer_hash
      )
      VALUES (?, ?, ?)
    `;

    // For now we can use the email as the hash value.
    // We can improve this later if you need customer authentication.
    const customerHash = customer.customer_email;

    const rows1 = await conn.query(query1, [
      customer.customer_email,
      customer.customer_phone,
      customerHash,
    ]);

    if (rows1.affectedRows !== 1) {
      return false;
    }

    // Get the newly created customer ID
    const customer_id = rows1.insertId;

    // Insert customer information
    const query2 = `
      INSERT INTO customer_info
      (
        customer_id,
        customer_first_name,
        customer_last_name,
        active_customer_status
      )
      VALUES (?, ?, ?, ?)
    `;

    const rows2 = await conn.query(query2, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      1,
    ]);

    if (rows2.affectedRows !== 1) {
      return false;
    }

    return {
      customer_id: customer_id,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Get all customers
async function getAllCustomers() {
  const query = `
    SELECT
      customer_identifier.customer_id,
      customer_identifier.customer_email,
      customer_identifier.customer_phone_number,
      customer_identifier.customer_added_date AS added_date,
      customer_info.customer_first_name,
      customer_info.customer_last_name,
      customer_info.active_customer_status
    FROM customer_identifier
    INNER JOIN customer_info
      ON customer_identifier.customer_id = customer_info.customer_id
    ORDER BY customer_identifier.customer_id DESC
    LIMIT 10
  `;

  const rows = await conn.query(query);

  return rows;
}

// Get customer by ID
async function getCustomerById(customer_id) {
  const query = `
    SELECT
      customer_identifier.customer_id,
      customer_identifier.customer_email,
      customer_identifier.customer_phone_number AS customer_phone,
      customer_identifier.customer_added_date AS added_date,
      customer_info.customer_first_name,
      customer_info.customer_last_name,
      customer_info.active_customer_status
    FROM customer_identifier
    INNER JOIN customer_info
      ON customer_identifier.customer_id = customer_info.customer_id
    WHERE customer_identifier.customer_id = ?
  `;

  const rows = await conn.query(query, [customer_id]);

  return rows;
}

async function searchCustomers(searchTerm) {
  if (!searchTerm || searchTerm.length < 2) {
    return [];
  }

  const query = `
    SELECT
      customer_identifier.customer_id,
      customer_identifier.customer_email,
      customer_identifier.customer_phone_number,
      customer_identifier.customer_added_date AS added_date,
      customer_info.customer_first_name,
      customer_info.customer_last_name,
      customer_info.active_customer_status
    FROM customer_identifier
    INNER JOIN customer_info
      ON customer_identifier.customer_id = customer_info.customer_id
    WHERE customer_info.active_customer_status = 1
    AND (
      customer_info.customer_first_name LIKE ? OR 
      customer_info.customer_last_name LIKE ? OR 
      customer_identifier.customer_email LIKE ? OR 
      customer_identifier.customer_phone_number LIKE ?
    )
    ORDER BY customer_identifier.customer_id DESC
    LIMIT 20
  `;

  const rows = await conn.query(query, [
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
  ]);
  return rows;
}

// Update customer
async function updateCustomer(customer_id, customer) {
  try {
    const query1 = `
      UPDATE customer_identifier
      SET customer_email = ?,
          customer_phone_number = ?
      WHERE customer_id = ?
    `;

    await conn.query(query1, [
      customer.customer_email,
      customer.customer_phone,
      customer_id,
    ]);

    const query2 = `
      UPDATE customer_info
      SET customer_first_name = ?,
          customer_last_name = ?,
          active_customer_status = ?
      WHERE customer_id = ?
    `;

    await conn.query(query2, [
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
      customer_id,
    ]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Delete customer
async function deleteCustomer(customer_id) {
  try {
    // Delete customer vehicles first
    await conn.query(
      'DELETE FROM customer_vehicle_info WHERE customer_id = ?',
      [customer_id],
    );

    // Delete customer information
    await conn.query('DELETE FROM customer_info WHERE customer_id = ?', [
      customer_id,
    ]);

    // Delete customer identifier
    const result = await conn.query(
      'DELETE FROM customer_identifier WHERE customer_id = ?',
      [customer_id],
    );

    return result.affectedRows === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  checkIfCustomerExists,
  createCustomer,
  searchCustomers,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
