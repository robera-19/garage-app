import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import employeeService from '../../../../services/employee.service';

const EditEmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee: loggedInEmployee } = useAuth();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = loggedInEmployee?.employee_token;

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await employeeService.getEmployeeById(id, token);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to get employee');
          return;
        }

        setEmployee(data.data);
      } catch (error) {
        console.log(error);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getEmployee();
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEmployee({
      ...employee,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await employeeService.updateEmployee(id, employee, token);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to update employee');
        setIsSubmitting(false);
        return;
      }

      alert('Employee updated successfully');

      navigate('/admin/employees');
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading employee...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div className="employee-form-page">
      <div className="employee-form">
        <h2>
          Edit: {employee.employee_first_name} {employee.employee_last_name}
          <span />
        </h2>

        <p className="employee-email">
          Employee email: <strong>{employee.employee_email}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="employee_first_name"
            value={employee.employee_first_name || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <input
            type="text"
            name="employee_last_name"
            value={employee.employee_last_name || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <input
            type="text"
            name="employee_phone"
            value={employee.employee_phone || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <select
            name="company_role_id"
            value={employee.company_role_id || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">Select role</option>
            <option value="1">Employee</option>
            <option value="2">Manager</option>
            <option value="3">Admin</option>
          </select>

          <label className="active-check">
            <input
              type="checkbox"
              name="active_employee"
              checked={Boolean(employee.active_employee)}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            Is active employee
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'UPDATE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
