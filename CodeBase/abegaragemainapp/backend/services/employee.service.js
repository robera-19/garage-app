const conn = require('../config/db.config');
const bcrypt = require('bcrypt');
async function checkIfEmployeeExists(email) {
  const query = 'SELECT * FROM employee WHERE employee_email = ? ';
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    // Insert the email in to the employee table
    const query =
      'INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)';
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      'INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)';
    const rows2 = await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    const query3 =
      'INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)';
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    const query4 =
      'INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)';
    const rows4 = await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return createdEmployee;
}
// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    'SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?';
  const rows = await conn.query(query, [employee_email]);
  return rows;
}
// A function to get all employees
async function getAllEmployees() {
  const query =
    'SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10';
  const rows = await conn.query(query);
  return rows;
}

// Get employee by ID
async function getEmployeeById(employee_id) {
  const query = `
    SELECT *
    FROM employee
    INNER JOIN employee_info
      ON employee.employee_id = employee_info.employee_id
    INNER JOIN employee_role
      ON employee.employee_id = employee_role.employee_id
    INNER JOIN company_roles
      ON employee_role.company_role_id = company_roles.company_role_id
    WHERE employee.employee_id = ?
  `;

  const rows = await conn.query(query, [employee_id]);

  return rows;
}


// Update employee
async function updateEmployee(employee_id, employee) {
  try {
    const query1 = `
      UPDATE employee
      SET active_employee = ?
      WHERE employee_id = ?
    `;

    await conn.query(query1, [
      employee.active_employee,
      employee_id,
    ]);

    const query2 = `
      UPDATE employee_info
      SET employee_first_name = ?,
          employee_last_name = ?,
          employee_phone = ?
      WHERE employee_id = ?
    `;

    await conn.query(query2, [
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
      employee_id,
    ]);

    const query3 = `
      UPDATE employee_role
      SET company_role_id = ?
      WHERE employee_id = ?
    `;

    await conn.query(query3, [
      employee.company_role_id,
      employee_id,
    ]);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Delete employee
async function deleteEmployee(employee_id) {
  try {
    await conn.query(
      'DELETE FROM employee_role WHERE employee_id = ?',
      [employee_id]
    );

    await conn.query(
      'DELETE FROM employee_pass WHERE employee_id = ?',
      [employee_id]
    );

    await conn.query(
      'DELETE FROM employee_info WHERE employee_id = ?',
      [employee_id]
    );

    const result = await conn.query(
      'DELETE FROM employee WHERE employee_id = ?',
      [employee_id]
    );

    return result.affectedRows === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByEmail,
  getAllEmployees,
};
