import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';

const api_url = process.env.REACT_APP_API_URL;

const statuses = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'In Progress' },
  { value: 3, label: 'Completed' },
  { value: 4, label: 'Cancelled' },
];

const ViewOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();

  const token = employee?.employee_token;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${api_url}/api/orders/${id}`, {
        headers: {
          'x-access-token': token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to load order');
        return;
      }

      setOrder(data.data);
    } catch (error) {
      console.error('Get order error:', error);
      alert('Something went wrong while loading the order');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const status = Number(e.target.value);

    try {
      setUpdating(true);

      const response = await fetch(`${api_url}/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to update status');
        return;
      }

      setOrder(data.data);

      alert('Order status updated successfully');
    } catch (error) {
      console.error('Update status error:', error);
      alert('Something went wrong while updating status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusLabel = (status) => {
    const currentStatus = statuses.find(
      (item) => item.value === Number(status),
    );

    return currentStatus?.label || 'Unknown';
  };

  if (loading) {
    return <div className="order-loading">Loading order...</div>;
  }

  if (!order) {
    return (
      <div className="order-empty">
        <p>Order not found.</p>

        <button onClick={() => navigate('/admin/orders')}>
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="view-order-page">
      <div className="order-container">
        {/* Header */}
        <div className="order-header">
          <div>
            <h1>Order #{order.order_id}</h1>

            <p>
              {order.order_date
                ? new Date(order.order_date).toLocaleDateString()
                : '-'}
            </p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate('/admin/orders')}
          >
            ← Back to Orders
          </button>
        </div>

        {/* Status */}
        <div className="order-card status-card">
          <div>
            <h2>Order Status</h2>

            <p>
              Current status:{' '}
              <strong>{getStatusLabel(order.order_status)}</strong>
            </p>
          </div>

          <select
            value={order.order_status || 1}
            onChange={handleStatusChange}
            disabled={updating}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Customer */}
        <div className="order-card">
          <h2>Customer Information</h2>

          <div className="order-info-grid">
            <div>
              <span>Name</span>
              <strong>
                {order.customer_first_name} {order.customer_last_name}
              </strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{order.customer_email || '-'}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{order.customer_phone_number || '-'}</strong>
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div className="order-card">
          <h2>Vehicle Information</h2>

          <div className="order-info-grid">
            <div>
              <span>Make</span>
              <strong>{order.vehicle_make || '-'}</strong>
            </div>

            <div>
              <span>Model</span>
              <strong>{order.vehicle_model || '-'}</strong>
            </div>

            <div>
              <span>Year</span>
              <strong>{order.vehicle_year || '-'}</strong>
            </div>

            <div>
              <span>Tag</span>
              <strong>{order.vehicle_tag || '-'}</strong>
            </div>

            <div>
              <span>Serial</span>
              <strong>{order.vehicle_serial || '-'}</strong>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="order-card">
          <h2>Services</h2>

          {order.services?.length ? (
            <div className="services-list">
              {order.services.map((service) => (
                <div className="service-row" key={service.order_service_id}>
                  <div>
                    <strong>{service.service_name}</strong>

                    <span>
                      {service.service_completed
                        ? 'Completed'
                        : 'Not completed'}
                    </span>
                  </div>

                  <strong>
                    {service.service_price
                      ? `${service.service_price} ETB`
                      : '-'}
                  </strong>
                </div>
              ))}
            </div>
          ) : (
            <p>No services found.</p>
          )}
        </div>

        {/* Employee */}
        <div className="order-card">
          <h2>Assigned Employee</h2>

          <p>
            {order.employee_first_name || '-'} {order.employee_last_name || ''}
          </p>
        </div>

        {/* Actions */}
        <div className="order-actions">
          <button
            className="edit-btn"
            onClick={() => navigate(`/admin/orders/edit/${order.order_id}`)}
          >
            Edit Order
          </button>

          <button
            className="back-btn"
            onClick={() => navigate('/admin/orders')}
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
