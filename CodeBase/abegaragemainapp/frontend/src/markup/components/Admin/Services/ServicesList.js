import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../../../../Context/AuthContext';
import serviceService from '../../../../services/service.service';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const { employee } = useAuth();
  const token = employee?.employee_token || null;

  const loadServices = async () => {
    if (!token) return;

    try {
      const res = await serviceService.getAllServices(token);

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

      if (data.data) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log(error);
      setApiError(true);
      setApiErrorMessage('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    loadServices();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this service?',
    );

    if (!confirmed) return;

    try {
      const res = await serviceService.deleteService(id, token);

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || 'Failed to delete service');
        return;
      }

      setServices((prev) =>
        prev.filter((service) => service.service_id !== id),
      );
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  if (apiError) {
    return (
      <section className="contact-section">
        <div className="auto-container">
          <p>{apiErrorMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section">
      <div className="auto-container">
        {/* Header */}
        <div className="services-title">
          <h2>
            Services we provide
            <span></span>
          </h2>

          <p>
            Bring the vehicle into our service center and ensure preventative
            maintenance. At the end of the day, you will receive a normal text
            that would explain the service's necessary treatments recommended
            about the vehicle.
          </p>
        </div>

        {/* Services */}
        <div className="services-list">
          {services.length > 0 ? (
            services.map((service) => (
              <div className="service-item" key={service.service_id}>
                <div className="service-content">
                  <h3>{service.service_name}</h3>

                  <p>{service.service_description}</p>

                  {/* Price */}
                  <div className="service-price">
                    Price:{' '}
                    <strong>
                      ${Number(service.service_price || 0).toFixed(2)}
                    </strong>
                  </div>
                </div>

                <div className="service-actions">
                  <Link
                    to={`/admin/services/edit/${service.service_id}`}
                    title="Edit service"
                  >
                    <Pencil size={14} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(service.service_id)}
                    title="Delete service"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-services">No services found.</div>
          )}
        </div>

        {/* Add Service */}
        <div className="add-service">
          <div className="add-service-title">
            <h2>
              Add a new service
              <span></span>
            </h2>
          </div>

          <AddServiceForm token={token} onServiceAdded={loadServices} />
        </div>
      </div>
    </section>
  );
};

const AddServiceForm = ({ token, onServiceAdded }) => {
  const [service, setService] = useState({
    service_name: '',
    service_description: '',
    service_price: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service.service_name.trim()) {
      alert('Please enter the service name');
      return;
    }

    if (!service.service_description.trim()) {
      alert('Please enter the service description');
      return;
    }

    if (service.service_price === '' || Number(service.service_price) < 0) {
      alert('Please enter a valid service price');
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceData = {
        service_name: service.service_name.trim(),
        service_description: service.service_description.trim(),
        service_price: Number(service.service_price),
      };

      const res = await serviceService.createService(serviceData, token);

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || 'Failed to add service');
        return;
      }

      alert('Service added successfully');

      setService({
        service_name: '',
        service_description: '',
        service_price: '',
      });

      await onServiceAdded();
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="service-add-form" onSubmit={handleSubmit}>
      {/* Service Name */}
      <input
        type="text"
        name="service_name"
        placeholder="Service name"
        value={service.service_name}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      {/* Description */}
      <textarea
        name="service_description"
        placeholder="Service description"
        value={service.service_description}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      {/* Price */}
      <input
        type="number"
        name="service_price"
        placeholder="Service price"
        value={service.service_price}
        onChange={handleChange}
        min="0"
        step="0.01"
        disabled={isSubmitting}
      />

      {/* Submit */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'ADDING...' : 'ADD SERVICE'}
      </button>
    </form>
  );
};

export default ServicesList;
