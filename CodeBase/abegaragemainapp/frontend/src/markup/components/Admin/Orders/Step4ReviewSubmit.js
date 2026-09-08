const Step4ReviewSubmit = ({ orderData, onSubmit, onPrevious, loading }) => {
  const { customer, vehicle, services, additionalRequests } = orderData;

  const calculateTotal = () => {
    return services.reduce(
      (total, service) => total + Number(service.service_price || 0),
      0,
    );
  };

  return (
    <div className="step-4-review">
      <h2>Review Your Order</h2>

      <div className="review-sections">
        {/* Customer Section */}
        <div className="review-section">
          <h3>Customer Information</h3>

          <div className="review-details">
            <p>
              <strong>Name:</strong> {customer?.customer_first_name}{' '}
              {customer?.customer_last_name}
            </p>

            <p>
              <strong>Email:</strong> {customer?.customer_email}
            </p>

            <p>
              <strong>Phone:</strong> {customer?.customer_phone_number}
            </p>

            <p>
              <strong>Status:</strong>{' '}
              {customer?.active_customer_status ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        {/* Vehicle Section */}
        <div className="review-section">
          <h3>Vehicle Information</h3>

          <div className="review-details">
            <p>
              <strong>Make:</strong> {vehicle?.vehicle_make}
            </p>

            <p>
              <strong>Model:</strong> {vehicle?.vehicle_model}
            </p>

            <p>
              <strong>Year:</strong> {vehicle?.vehicle_year}
            </p>

            <p>
              <strong>Tag:</strong> {vehicle?.vehicle_tag}
            </p>

            <p>
              <strong>Serial:</strong> {vehicle?.vehicle_serial}
            </p>

            <p>
              <strong>Color:</strong> {vehicle?.vehicle_color}
            </p>

            <p>
              <strong>Mileage:</strong> {vehicle?.vehicle_mileage || 'N/A'}
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="review-section">
          <h3>Selected Services</h3>

          {services.length > 0 ? (
            <>
              <table className="review-services-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((service) => (
                    <tr key={service.service_id}>
                      <td>{service.service_name}</td>

                      <td>${Number(service.service_price || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>

                    <td>
                      <strong>${calculateTotal().toFixed(2)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Additional Requests */}
              {additionalRequests && (
                <div className="additional-requests-review">
                  <h4>Additional Requests</h4>
                  <p>{additionalRequests}</p>
                </div>
              )}
            </>
          ) : (
            <p>No services selected</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button className="prev-btn" onClick={onPrevious} disabled={loading}>
          ← Previous
        </button>

        <button className="submit-btn" onClick={onSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </div>
  );
};

export default Step4ReviewSubmit;
