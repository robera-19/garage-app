import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import customerService from '../../../../services/customer.service';

const Step1CustomerSearch = ({
  selectedCustomer,
  onSelectCustomer,
  onNext,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token || null;

  // Search customers when searchTerm changes
  useEffect(() => {
    if (searchTerm.length > 2) {
      handleSearch();
    } else {
      setCustomers([]);
      setError('');
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await customerService.searchCustomers(searchTerm, token);

      if (!response.ok) {
        if (response.status === 401) {
          setError('Please login again');
        } else if (response.status === 403) {
          setError('You are not authorized to search customers');
        } else {
          setError('Failed to search customers. Please try again.');
        }
        setCustomers([]);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Search results:', data);

      // Handle different response structures
      let customersData = [];
      if (data.data && Array.isArray(data.data)) {
        customersData = data.data;
      } else if (Array.isArray(data)) {
        customersData = data;
      } else if (data.customers && Array.isArray(data.customers)) {
        customersData = data.customers;
      } else if (data.results && Array.isArray(data.results)) {
        customersData = data.results;
      }

      setCustomers(customersData);
      if (customersData.length === 0) {
        setError('No customers found matching your search');
      }
    } catch (error) {
      console.error('Error searching customers:', error);
      setError('Something went wrong. Please try again.');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer);
    setSearchTerm('');
    setCustomers([]);
    setError('');
  };

  const handleAddNewCustomer = () => {
    navigate('/admin/customers/add', {
      state: { returnTo: '/admin/orders/new' },
    });
  };

  return (
    <div className="step-1-customer">
      <h2>Search for a Customer</h2>
      <p className="step-description">
        Search for a customer using first name, last name, email address or
        phone number
      </p>

      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for a customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
          {loading && <span className="loading-spinner">⏳</span>}
        </div>

        <button className="add-customer-btn" onClick={handleAddNewCustomer}>
          + ADD NEW CUSTOMER
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Search Results */}
      {searchTerm.length > 2 && !loading && customers.length > 0 && (
        <div className="customer-results">
          <div className="results-header">
            <span>Found {customers.length} customer(s)</span>
          </div>
          <table className="customer-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_first_name}</td>
                  <td>{customer.customer_last_name}</td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    <button
                      className="select-btn"
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results */}
      {searchTerm.length > 2 &&
        !loading &&
        customers.length === 0 &&
        !error && (
          <div className="no-results">
            <p>No customers found.</p>
            <button className="add-customer-btn" onClick={handleAddNewCustomer}>
              + Add New Customer
            </button>
          </div>
        )}

      {/* Selected Customer Preview */}
      {selectedCustomer && (
        <div className="selected-customer">
          <h3>Selected Customer</h3>
          <div className="customer-card">
            <div className="customer-info">
              <p>
                <strong>
                  {selectedCustomer.customer_first_name}{' '}
                  {selectedCustomer.customer_last_name}
                </strong>
              </p>
              <p>Email: {selectedCustomer.customer_email}</p>
              <p>Phone: {selectedCustomer.customer_phone_number}</p>
              <p>
                Status:{' '}
                <span
                  className={
                    selectedCustomer.active_customer_status
                      ? 'active'
                      : 'inactive'
                  }
                >
                  {selectedCustomer.active_customer_status
                    ? 'Active'
                    : 'Inactive'}
                </span>
              </p>
            </div>
            <button
              className="change-btn"
              onClick={() => onSelectCustomer(null)}
            >
              Change
            </button>
          </div>

          <button className="next-btn" onClick={onNext}>
            Next Step →
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Searching customers...</p>
        </div>
      )}
    </div>
  );
};

export default Step1CustomerSearch;
