import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { useAuth } from '../../../../Context/AuthContext';
import { format } from 'date-fns';
import customerService from '../../../../services/customer.service';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

  const { employee } = useAuth();
  const token = employee?.employee_token || null;

  useEffect(() => {
    if (!token) {
      return;
    }

    const getCustomers = async () => {
      try {
        const res = await customerService.getAllCustomers(token);

        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage('Please login again');
          } else if (res.status === 403) {
            setApiErrorMessage('You are not authorized to view this page');
          } else {
            setApiErrorMessage('Please try again later');
          }
          return;
        }

        const data = await res.json();
        setCustomers(data.data || []);
      } catch (error) {
        console.log(error);
        setApiError(true);
        setApiErrorMessage('Something went wrong. Please try again later.');
      }
    };

    getCustomers();
  }, [token]);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent row click when clicking delete

    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    try {
      const res = await customerService.deleteCustomer(id, token);

      if (!res.ok) {
        alert('Failed to delete customer');
        return;
      }

      setCustomers((prev) =>
        prev.filter((customer) => customer.customer_id !== id),
      );
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  // Handle row click to navigate to customer details
  const handleRowClick = (customerId) => {
    navigate(`/admin/customers/${customerId}`);
  };

  // Search customers
  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();
    return (
      customer.customer_first_name?.toLowerCase().includes(search) ||
      customer.customer_last_name?.toLowerCase().includes(search) ||
      customer.customer_email?.toLowerCase().includes(search) ||
      customer.customer_phone_number?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customers</h2>
            </div>

            <div className="customer-search">
              <input
                type="text"
                placeholder="Search for a customer using first name, last name, email address or phone number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">⌕</span>
            </div>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.customer_id}
                      onClick={() => handleRowClick(customer.customer_id)}
                      style={{ cursor: 'pointer' }}
                      className="customer-row"
                    >
                      <td>{customer.customer_id}</td>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        {customer.added_date
                          ? format(
                              new Date(customer.added_date),
                              'MM - dd - yyyy | kk:mm',
                            )
                          : '-'}
                      </td>
                      <td>{customer.active_customer_status ? 'Yes' : 'No'}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <Link
                            to={`/admin/customers/edit/${customer.customer_id}`}
                            onClick={(e) => e.stopPropagation()} // Prevent row click
                          >
                            Edit
                          </Link>

                          <span>|</span>

                          <a
                            href="#!"
                            onClick={(e) =>
                              handleDelete(customer.customer_id, e)
                            }
                          >
                            Delete
                          </a>

                          <span>|</span>

                          <Link
                            to={`/admin/customers/${customer.customer_id}`}
                            onClick={(e) => e.stopPropagation()} // Prevent row click
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <div className="customer-pagination">
              <button disabled>« First</button>
              <button disabled>‹ Previous</button>
              <button className="active">Next ›</button>
              <button>Last »</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomersList;
