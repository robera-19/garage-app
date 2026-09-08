import { useEffect, useState } from 'react';

const Step3SelectServices = ({
  selectedServices,
  additionalRequests,
  onSelectServices,
  onAdditionalRequests,
  onNext,
  onPrevious,
}) => {
  const [searchFeature, setSearchFeature] = useState('');
  const [availableServices, setAvailableServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const api_url = process.env.REACT_APP_API_URL;

  // Get token
  const token = localStorage.getItem('token');

  // Fetch services created by admin
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${api_url}/api/services`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.message || 'Failed to load services',
          );
        }

        const services = data.data || [];

        setAvailableServices(services);
        setFilteredServices(services);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setError(error.message || 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [api_url, token]);

  // Select / unselect service
  const handleServiceToggle = (serviceId) => {
    const alreadySelected = selectedServices.some(
      (service) => service.service_id === serviceId,
    );

    if (alreadySelected) {
      onSelectServices(
        selectedServices.filter((service) => service.service_id !== serviceId),
      );
    } else {
      const service = availableServices.find(
        (service) => service.service_id === serviceId,
      );

      if (service) {
        onSelectServices([...selectedServices, service]);
      }
    }
  };

  // Search services
  const handleSearch = (term) => {
    setSearchFeature(term);

    if (term.trim() === '') {
      setFilteredServices(availableServices);
      return;
    }

    const searchTerm = term.toLowerCase();

    const filtered = availableServices.filter(
      (service) =>
        service.service_name?.toLowerCase().includes(searchTerm) ||
        service.service_description?.toLowerCase().includes(searchTerm),
    );

    setFilteredServices(filtered);
  };

  // Calculate total price
  const calculateTotal = () => {
    return selectedServices.reduce(
      (total, service) => total + Number(service.service_price || 0),
      0,
    );
  };

  return (
    <div className="step-3-services">
      <h2>Choose Services</h2>

      {/* Search + Add Service */}
      <div className="services-actions">
        <input
          type="text"
          placeholder="Search services..."
          value={searchFeature}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <button
          type="button"
          className="add-service-btn"
          onClick={() => {
            // Change this route to your actual service management route
            window.location.href = '/admin/services';
          }}
        >
          + Add Another Service
        </button>
      </div>

      {/* Loading */}
      {loading && <div className="services-loading">Loading services...</div>}

      {/* Error */}
      {!loading && error && <div className="services-error">{error}</div>}

      {/* No services */}
      {!loading && !error && availableServices.length === 0 && (
        <div className="no-services">
          <p>No services have been created yet.</p>

          <button
            type="button"
            className="add-service-btn"
            onClick={() => {
              window.location.href = '/admin/services';
            }}
          >
            + Create First Service
          </button>
        </div>
      )}

      {/* Services Grid */}
      {!loading && !error && filteredServices.length > 0 && (
        <div className="services-grid">
          {filteredServices.map((service) => {
            const isSelected = selectedServices.some(
              (selected) => selected.service_id === service.service_id,
            );

            return (
              <div
                key={service.service_id}
                className={`service-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleServiceToggle(service.service_id)}
              >
                <div className="service-header">
                  <h3>{service.service_name}</h3>

                  <div className="service-price">
                    ${Number(service.service_price || 0).toFixed(2)}
                  </div>
                </div>

                <p className="service-description">
                  {service.service_description}
                </p>

                <div className="service-meta">
                  <span className="service-category">Service</span>
                </div>

                <div className="service-check">
                  {isSelected ? '✓ Selected' : 'Click to select'}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Search found nothing */}
      {!loading &&
        !error &&
        availableServices.length > 0 &&
        filteredServices.length === 0 && (
          <div className="no-services">
            No services found matching "{searchFeature}".
          </div>
        )}

      {/* Additional Requests */}
      <div className="additional-requests">
        <h3>Additional Requests</h3>

        <textarea
          className="additional-notes"
          placeholder="Any additional notes or special requests..."
          value={additionalRequests}
          onChange={(e) => onAdditionalRequests(e.target.value)}
          rows="4"
        />
      </div>

      {/* Selected Services Summary */}
      {selectedServices.length > 0 && (
        <div className="selected-services-summary">
          <h3>Selected Services</h3>

          <div className="summary-items">
            {selectedServices.map((service) => (
              <div key={service.service_id} className="summary-item">
                <span>{service.service_name}</span>

                <span>${Number(service.service_price || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <div className="total-row">
              <span>Total Price:</span>

              <span className="total-price">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="navigation-buttons">
        <button className="prev-btn" onClick={onPrevious}>
          ← Previous
        </button>

        <button
          className="next-btn"
          onClick={onNext}
          disabled={selectedServices.length === 0}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default Step3SelectServices;
