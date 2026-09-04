// Import the employee service
const employeeService = require('../services/employee.service');
// Create the add employee controller
async function createEmployee(req, res, next) {
  // console.log(req.headers);

  // Check if employee email already exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email,
  );
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: 'This email address is already associated with another employee!',
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: 'Failed to add the employee!',
        });
      } else {
        res.status(200).json({
          status: 'true',
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: 'Something went wrong!',
      });
    }
  }
}

// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: 'Failed to get all employees!',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: employees,
    });
  }
}

async function getEmployeeById(req, res, next) {
  try {
    const employeeId = req.params.id;

    const employee = await employeeService.getEmployeeById(employeeId);

    if (employee.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Employee not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: employee[0],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
}

async function updateEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;
    const employeeData = req.body;

    const updated = await employeeService.updateEmployee(
      employeeId,
      employeeData,
    );

    if (!updated) {
      return res.status(400).json({
        status: 'fail',
        message: 'Failed to update employee',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Employee updated successfully',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
}

async function deleteEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;

    const deleted = await employeeService.deleteEmployee(employeeId);

    if (!deleted) {
      return res.status(400).json({
        status: 'fail',
        message: 'Failed to delete employee',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
}

// Export the createEmployee controller
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
