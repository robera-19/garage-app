import { Link } from 'react-router-dom';

const CustomerInfo = ({ customer }) => {
  return (
    <div className="customer-detail-section">
      <div className="customer-detail-icon">Info</div>

      <div className="customer-detail-content">
        <h3>
          Customer: {customer.customer_first_name} {customer.customer_last_name}
        </h3>

        <p>
          <strong>Email:</strong> {customer.customer_email}
        </p>

        <p>
          <strong>Phone Number:</strong> {customer.customer_phone || 'N/A'}
        </p>

        <p>
          <strong>Active Customer:</strong>{' '}
          {customer.active_customer_status ? 'Yes' : 'No'}
        </p>

        <p>
          <strong>Edit customer info:</strong>{' '}
          <Link
            to={`/admin/customers/edit/${customer.customer_id}`}
            className="edit-customer"
          >
            ✎
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerInfo;