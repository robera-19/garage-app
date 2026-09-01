import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import { format } from 'date-fns'; // To properly format the date on  
import employeeService from "../../../../services/employee.service";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null; // To store the token 
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees.then((res) => {
      if (!res.ok) {
        setApiError(true);
        if (res.status === 401) {
          setApiErrorMessage("Please login again");
        } else if (res.status === 403) {
          setApiErrorMessage("You are not authorized to view this page");
        } else {
          setApiErrorMessage("Please try again later");
        }
      }
      return res.json()
    }).then((data) => {
      if (data.data.length !== 0) {
        setEmployees(data.data)
      }

    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      const res = await employeeService.deleteEmployee(id, token);

      if (!res.ok) {
        alert('Failed to delete employee');
        return;
      }

      setEmployees((prev) =>
        prev.filter((employee) => employee.employee_id !== id),
      );
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div >
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2 >
              </div >
              < Table striped bordered hover >
                <thead>
                  <tr>
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>{format(new Date(employee.added_date), 'MM - dd - yyyy | kk:mm')}</td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons">
  <Link to={`/admin/employees/edit/${employee.employee_id}`}>
    Edit
  </Link>

  <span>|</span>

  <a
    href="#!"
    onClick={(e) => {
      e.preventDefault();
      handleDelete(employee.employee_id);
    }}
  >
    Delete
  </a>
</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table >
            </div >
          </section >
        </>
      )}
    </>
  );
}

export default EmployeesList;