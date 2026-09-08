const api_url = process.env.REACT_APP_API_URL;

// Create employee
const createEmployee = async (formData, token) => {
  const response = await fetch(`${api_url}/api/employee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(formData),
  });

  return response;
};

// Get all employees
const getAllEmployees = async (token) => {
  const response = await fetch(`${api_url}/api/employees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
};

// Get employee by ID
const getEmployeeById = async (id, token) => {
  const response = await fetch(`${api_url}/api/employees/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
};

// Update employee
const updateEmployee = async (id, employee, token) => {
  const response = await fetch(`${api_url}/api/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(employee),
  });

  return response;
};

// Delete employee
const deleteEmployee = async (id, token) => {
  const response = await fetch(`${api_url}/api/employees/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response;
};

const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
