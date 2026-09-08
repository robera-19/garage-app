import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import serviceService from '../../../../services/service.service';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();

  const token = employee?.employee_token || null;

  const [service, setService] = useState({
    service_name: '',
    service_description: '',
    service_price: '',
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load service
  useEffect(() => {
    const loadService = async () => {
      if (!token) return;

      try {
        setLoading(true);
        setError('');

        const res = await serviceService.getServiceById(id, token);

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || data.message || 'Failed to load service');
          return;
        }

        setService({
          service_name: data.data?.service_name || '',
          service_description: data.data?.service_description || '',
          service_price: data.data?.service_price ?? '',
        });
      } catch (error) {
        console.log(error);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id, token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update
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

      const res = await serviceService.updateService(id, serviceData, token);

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || 'Failed to update service');
        return;
      }

      alert('Service updated successfully');

      navigate('/admin/services');
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <section className="services-section">
        <div className="auto-container">
          <p>Loading service...</p>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="services-section">
        <div className="auto-container">
          <p>{error}</p>

          <Link to="/admin/services">Back to Services</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section">
      <div className="auto-container">
        <div className="add-service">
          <div className="add-service-title">
            <h2>
              Edit service
              <span></span>
            </h2>
          </div>

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

            {/* Update */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'UPDATING...' : 'UPDATE SERVICE'}
            </button>

            {/* Cancel */}
            <Link to="/admin/services" className="cancel-service">
              CANCEL
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditService;
