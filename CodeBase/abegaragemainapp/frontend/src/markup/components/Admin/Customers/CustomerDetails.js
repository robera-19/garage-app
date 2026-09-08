import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import customerService from '../../../../services/customer.service';

import CustomerInfo from './CustomerInfo';
import CustomerVehicles from './CustomerVehicles';
import CustomerOrders from './OrdersList';

const CustomerDetails = () => {
  const { id } = useParams();
  const { employee } = useAuth();

  const token = employee?.employee_token || null;

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomer = async () => {
      if (!token) return;

      try {
        const res = await customerService.getCustomerById(id, token);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.error);
          return;
        }

        setCustomer(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [id, token]);

  if (loading) {
    return <p>Loading customer...</p>;
  }

  if (!customer) {
    return <p>Customer not found.</p>;
  }

  return (
    <section className="customer-details-section">
      <div className="auto-container">

        <CustomerInfo customer={customer} />

        <CustomerVehicles customer={customer} />

        <CustomerOrders customer={customer} />

      </div>
    </section>
  );
};

export default CustomerDetails;