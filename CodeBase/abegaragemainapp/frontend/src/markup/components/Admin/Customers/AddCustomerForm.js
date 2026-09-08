import React, { useState } from 'react';

function AddCustomerForm() {
  const [customer, setCustomer] = useState({
    customer_email: '',
    customer_first_name: '',
    customer_last_name: '',
    customer_phone: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/customer`,
        {
          method: 'POST',
          headers: {
  'Content-Type': 'application/json',
  'x-access-token': localStorage.getItem('token'),
},
          body: JSON.stringify(customer),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to add customer');
        return;
      }

      setSuccess('Customer added successfully!');

      // Clear form
      setCustomer({
        customer_email: '',
        customer_first_name: '',
        customer_last_name: '',
        customer_phone: '',
      });

      setTimeout(() => {
        window.location.href = '/admin/customers';
        // window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.log(error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="customer-form-page">
      <div className="customer-form">
        <h2>
          Add Customer
          <span></span>
        </h2>

        {error && (
          <div className="validation-error">
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: 'green', marginBottom: '15px' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="customer_email"
            value={customer.customer_email}
            onChange={handleChange}
            placeholder="Customer Email"
            required
          />

          <input
            type="text"
            name="customer_first_name"
            value={customer.customer_first_name}
            onChange={handleChange}
            placeholder="Customer First Name"
            required
          />

          <input
            type="text"
            name="customer_last_name"
            value={customer.customer_last_name}
            onChange={handleChange}
            placeholder="Customer Last Name"
            required
          />

          <input
            type="tel"
            name="customer_phone"
            value={customer.customer_phone}
            onChange={handleChange}
            placeholder="Customer Phone"
            required
          />

          <button type="submit">
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerForm;