const conn = require('../config/db.config');

async function createVehicle(vehicle) {
  try {
    const query = `
      INSERT INTO customer_vehicle_info
      (
        customer_id,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const rows = await conn.query(query, [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }

    return {
      vehicle_id: rows.insertId,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getVehiclesByCustomerId(customer_id) {
  const query = `
    SELECT
      vehicle_id,
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color
    FROM customer_vehicle_info
    WHERE customer_id = ?
    ORDER BY vehicle_id DESC
  `;

  const rows = await conn.query(query, [customer_id]);

  return rows;
}

async function getVehicleById(vehicle_id) {
  try {
    const query = `
      SELECT
        vehicle_id,
        customer_id,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color
      FROM customer_vehicle_info
      WHERE vehicle_id = ?
    `;

    const rows = await conn.query(query, [vehicle_id]);

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function updateVehicle(vehicle_id, vehicle) {
  try {
    const query = `
      UPDATE customer_vehicle_info
      SET
        vehicle_year = ?,
        vehicle_make = ?,
        vehicle_model = ?,
        vehicle_type = ?,
        vehicle_mileage = ?,
        vehicle_tag = ?,
        vehicle_serial = ?,
        vehicle_color = ?
      WHERE vehicle_id = ?
    `;

    const result = await conn.query(query, [
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
      vehicle_id,
    ]);

    return result.affectedRows === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteVehicle(vehicle_id) {
  try {
    const result = await conn.query(
      'DELETE FROM customer_vehicle_info WHERE vehicle_id = ?',
      [vehicle_id],
    );

    return result.affectedRows === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  createVehicle,
  getVehiclesByCustomerId,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
