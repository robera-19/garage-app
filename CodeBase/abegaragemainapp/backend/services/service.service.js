const conn = require('../config/db.config');

// Check if service exists
async function checkIfServiceExists(service_name) {
  const rows = await conn.query(
    `SELECT service_id FROM service WHERE service_name = ?`,
    [service_name],
  );

  return rows.length > 0;
}

// Create service
async function createService(serviceData) {
  try {
    const result = await conn.query(
      `INSERT INTO service
       (service_name, service_description, service_price)
       VALUES (?, ?, ?)`,
      [
        serviceData.service_name,
        serviceData.service_description,
        serviceData.service_price,
      ],
    );

    if (result.affectedRows !== 1) return false;

    return {
      service_id: result.insertId,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Get all services
async function getAllServices() {
  const rows = await conn.query(
    `SELECT
      service_id,
      service_name,
      service_description,
      service_price,
      service_added_date
     FROM service
     ORDER BY service_id DESC`,
  );

  return rows;
}

// Get service by ID
async function getServiceById(service_id) {
  const rows = await conn.query(
    `SELECT
      service_id,
      service_name,
      service_description,
      service_price,
      service_added_date
     FROM service
     WHERE service_id = ?`,
    [service_id],
  );

  return rows.length ? rows[0] : null;
}

// Update service
async function updateService(service_id, serviceData) {
  try {
    const result = await conn.query(
      `UPDATE service
       SET service_name = ?,
           service_description = ?,
           service_price = ?
       WHERE service_id = ?`,
      [
        serviceData.service_name,
        serviceData.service_description,
        serviceData.service_price,
        service_id,
      ],
    );

    return result.affectedRows === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Delete service
async function deleteService(service_id) {
  try {
    const result = await conn.query(
      `DELETE FROM service WHERE service_id = ?`,
      [service_id],
    );

    return result.affectedRows === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  checkIfServiceExists,
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
