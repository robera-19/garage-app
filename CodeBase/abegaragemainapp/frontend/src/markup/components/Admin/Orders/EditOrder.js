import { useEffect, useState } from 'react';
import { useAuth } from '../../../../Context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import OrderForm from './OrderForm';

const api_url = process.env.REACT_APP_API_URL;

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();

  const token = employee?.employee_token;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id, token]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${api_url}/api/orders/${id}`, {
        headers: {
          'x-access-token': token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setOrder(data.data);
    } catch (error) {
      console.error(error);
      alert('Failed to load order.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (orderData) => {
    try {
      setSaving(true);

      const payload = {
        customer_id: orderData.customer.customer_id,
        vehicle_id: orderData.vehicle.vehicle_id,
        order_status: orderData.status || 1,
        services: orderData.services.map((service) => ({
          service_id: service.service_id,
        })),
      };

      const response = await fetch(`${api_url}/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert('Order updated successfully');

      navigate('/admin/orders');
    } catch (error) {
      console.error(error);
      alert(error.message || 'Failed to update order.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading order...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <OrderForm
      title={`Edit Order #${order.order_id}`}
      initialData={{
        customer: {
          customer_id: order.customer_id,
          customer_first_name: order.customer_first_name,
          customer_last_name: order.customer_last_name,
        },
        vehicle: {
          vehicle_id: order.vehicle_id,
          vehicle_make: order.vehicle_make,
          vehicle_model: order.vehicle_model,
          vehicle_year: order.vehicle_year,
          vehicle_tag: order.vehicle_tag,
        },
        services: order.services || [],
        status: order.order_status || 1,
      }}
      onSubmit={handleSubmit}
      loading={saving}
    />
  );
};

export default EditOrder;
