const conn = require('../config/db.config');
const bcrypt = require('bcrypt');
const employeeService = require('./employee.service');

async function logIn(employeeData) {
  try {
    let returnData = {};
    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email,
    );
    if (employee.length === 0) {
      returnData = {
        status: 'fail',
        message: 'Employee does not exist',
      };
      return returnData;
    }
    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password_hashed,
    );
    if (!passwordMatch) {
      returnData = {
        status: 'fail',
        message: 'Incorrect password',
      };
      return returnData;
    }
    returnData = {
      status: 'success',
      data: employee[0],
    };
    return returnData;
  } catch (error) {
    console.log(error);
    return {
      status: 'fail',
      message: 'Something went wrong',
    };
  }
}

module.exports = {
  logIn,
};
