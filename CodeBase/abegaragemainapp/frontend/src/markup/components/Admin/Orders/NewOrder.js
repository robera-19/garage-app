import { useState } from 'react';
import { useAuth } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrderForm from './OrderForm';

const api_url = process.env.REACT_APP_API_URL;

const NewOrder = () => {
  const navigate = useNavigate();
  const { employee } = useAuth();

  const token = employee?.employee_token;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (orderData) => {
    if (!token) {
      alert('Please login again.');
      return;
    }

    const customerId = orderData.customer?.customer_id;
    const vehicleId = orderData.vehicle?.vehicle_id;

    if (!customerId || !vehicleId) {
      alert('Please select customer and vehicle.');
      return;
    }

    if (!orderData.services.length) {
      alert('Please select at least one service.');
      return;
    }

    const payload = {
      customer_id: customerId,
      vehicle_id: vehicleId,
      services: orderData.services.map((service) => ({
        service_id: service.service_id,
      })),
    };

    try {
      setLoading(true);

      const response = await fetch(`${api_url}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to create order');
        return;
      }

      navigate('/admin/orders');
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderForm
      title="Create a New Order"
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default NewOrder;
