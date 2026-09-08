import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import { format } from 'date-fns';
import orderService from '../../../../services/order.service';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [statuses, setStatuses] = useState([]);

  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token || null;

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchOrders();
    fetchOrderStatuses();
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getAllOrders(token);

      if (!res.ok) {
        setApiError(true);
        if (res.status === 401) {
          setApiErrorMessage('Please login again');
        } else if (res.status === 403) {
          setApiErrorMessage('You are not authorized to view this page');
        } else {
          setApiErrorMessage('Please try again later');
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('Orders data:', data);

      let ordersData = [];
      if (data.data && Array.isArray(data.data)) {
        ordersData = data.data;
      } else if (Array.isArray(data)) {
        ordersData = data;
      }

      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setApiError(true);
      setApiErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStatuses = async () => {
    try {
      const res = await orderService.getOrderStatuses(token);
      const data = await res.json();
      if (data.data && Array.isArray(data.data)) {
        setStatuses(data.data);
      }
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length < 2) {
      fetchOrders();
      return;
    }

    try {
      setLoading(true);
      const res = await orderService.searchOrders(value, token);

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      let ordersData = [];
      if (data.data && Array.isArray(data.data)) {
        ordersData = data.data;
      } else if (Array.isArray(data)) {
        ordersData = data;
      }

      setOrders(ordersData);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const getStatusBadge = (statusId) => {
    const statusColors = {
      1: 'warning',
      2: 'info',
      3: 'success',
      4: 'danger',
    };

    const statusNames = {
      1: 'Pending',
      2: 'In Progress',
      3: 'Completed',
      4: 'Cancelled',
    };

    // If statusId is null or undefined, show Unknown
    if (!statusId) {
      return <span className="status-badge status-unknown">Unknown</span>;
    }

    return (
      <span className={`status-badge status-${statusId}`}>
        {statusNames[statusId] || 'Unknown'}
      </span>
    );
  };

  // Filter orders client-side
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        const search = searchTerm.toLowerCase();
        return (
          order.customer_first_name?.toLowerCase().includes(search) ||
          order.customer_last_name?.toLowerCase().includes(search) ||
          order.customer_email?.toLowerCase().includes(search) ||
          order.customer_phone_number?.toLowerCase().includes(search) ||
          order.vehicle_make?.toLowerCase().includes(search) ||
          order.vehicle_model?.toLowerCase().includes(search) ||
          order.vehicle_tag?.toLowerCase().includes(search) ||
          order.order_id?.toString().includes(search)
        );
      })
    : [];

  if (loading) {
    return (
      <section className="orders-section">
        <div className="auto-container">
          <div className="orders-header">
            <h2>Orders</h2>
            <Link to="/admin/order" className="btn-add-order">
              + New Order
            </Link>
          </div>
          <div className="loading-text">Loading orders...</div>
        </div>
      </section>
    );
  }

  if (apiError) {
    return (
      <section className="orders-section">
        <div className="auto-container">
          <div className="orders-header">
            <h2>Orders</h2>
            <Link to="/admin/order" className="btn-add-order">
              + New Order
            </Link>
          </div>
          <div className="error-message">{apiErrorMessage}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-section">
      <div className="auto-container">
        <div className="orders-header">
          <h2>Orders</h2>
          <Link to="/admin/order" className="btn-add-order">
            + New Order
          </Link>
        </div>

        <div className="orders-search">
          <input
            type="text"
            placeholder="Search orders by customer, email, phone, vehicle, or order ID..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="search-icon">⌕</span>
          {searchTerm && (
            <span className="search-count">
              Found {filteredOrders.length} results
            </span>
          )}
        </div>

        <div className="orders-table-wrapper">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>VEHICLE</th>
                <th>ORDER DATE</th>
                <th>RECEIVED BY</th>
                <th>ORDER STATUS</th>
                <th>VIEW/EDIT</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.order_id}
                    onClick={() => handleRowClick(order.order_id)}
                    style={{ cursor: 'pointer' }}
                    className="order-row"
                  >
                    <td className="order-id">#{order.order_id}</td>
                    <td>
                      <div className="customer-info">
                        <div className="customer-name">
                          {order.customer_first_name || 'Unknown'}{' '}
                          {order.customer_last_name || ''}
                        </div>
                        {order.customer_email && (
                          <div className="customer-email">
                            {order.customer_email}
                          </div>
                        )}
                        {order.customer_phone_number && (
                          <div className="customer-phone">
                            {order.customer_phone_number}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="vehicle-info">
                        <div className="vehicle-name">
                          {order.vehicle_make || 'Unknown'}{' '}
                          {order.vehicle_model || ''}
                        </div>
                        {order.vehicle_year && (
                          <div className="vehicle-year">
                            {order.vehicle_year}
                          </div>
                        )}
                        {order.vehicle_tag && (
                          <div className="vehicle-tag">{order.vehicle_tag}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      {order.order_date
                        ? format(new Date(order.order_date), 'dd/MM/yyyy')
                        : '-'}
                    </td>
                    <td>
                      <div className="received-by">
                        {order.employee_first_name || 'Unknown'}{' '}
                        {order.employee_last_name || ''}
                      </div>
                    </td>
                    <td>{getStatusBadge(order.order_status)}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/orders/${order.order_id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn-view"
                          title="View Order"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </Link>
                        <Link
                          to={`/admin/orders/edit/${order.order_id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn-edit"
                          title="Edit Order"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">
                    {searchTerm
                      ? 'No orders found matching your search'
                      : 'No orders found'}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div className="orders-pagination">
          <button disabled>« First</button>
          <button disabled>‹ Previous</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>Next ›</button>
          <button>Last »</button>
        </div>
      </div>
    </section>
  );
};

export default OrdersList;
