import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import customerService from '../../../../services/customer.service';

const EditCustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee: loggedInEmployee } = useAuth();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = loggedInEmployee?.employee_token;

  // Get customer by ID
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const res = await customerService.getCustomerById(id, token);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || data.message || 'Failed to get customer');
          return;
        }

        setCustomer(data.data);
      } catch (error) {
        console.log(error);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getCustomer();
    }
  }, [id, token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCustomer({
      ...customer,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Update customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await customerService.updateCustomer(id, customer, token);

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || 'Failed to update customer');
        setIsSubmitting(false);
        return;
      }

      alert('Customer updated successfully');

      navigate('/admin/customers');
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
      setIsSubmitting(false);
    }
  };

  // Loading
  if (loading) {
    return <p>Loading customer...</p>;
  }

  // Error
  if (error) {
    return <p>{error}</p>;
  }

  // Customer not found
  if (!customer) {
    return <p>Customer not found</p>;
  }

  return (
    <div className="customer-form-page">
      <div className="customer-form">
        <h2>
          Edit: {customer.customer_first_name} {customer.customer_last_name}
          <span />
        </h2>

        <p className="customer-email">
          Customer email: <strong>{customer.customer_email}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <input
            type="text"
            name="customer_first_name"
            value={customer.customer_first_name || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          {/* Last Name */}
          <input
            type="text"
            name="customer_last_name"
            value={customer.customer_last_name || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          {/* Email */}
          <input
            type="email"
            name="customer_email"
            value={customer.customer_email || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          {/* Phone */}
          <input
            type="text"
            name="customer_phone"
            value={customer.customer_phone || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          {/* Active Customer */}
          <label className="active-check">
            <input
              type="checkbox"
              name="active_customer_status"
              checked={Boolean(customer.active_customer_status)}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            Is active customer
          </label>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'UPDATE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerForm;
