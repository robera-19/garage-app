import { useState } from 'react';

const EditVehicleModal = ({ vehicle, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    vehicle_make: vehicle.vehicle_make || '',
    vehicle_model: vehicle.vehicle_model || '',
    vehicle_year: vehicle.vehicle_year || '',
    vehicle_tag: vehicle.vehicle_tag || '',
    vehicle_serial: vehicle.vehicle_serial || '',
    vehicle_color: vehicle.vehicle_color || '',
    vehicle_mileage: vehicle.vehicle_mileage || '',
    vehicle_type: vehicle.vehicle_type || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onUpdate(formData);
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Vehicle</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Make *</label>
              <input
                type="text"
                name="vehicle_make"
                value={formData.vehicle_make}
                onChange={handleChange}
                required
                placeholder="e.g., Toyota"
              />
            </div>

            <div className="form-group">
              <label>Model *</label>
              <input
                type="text"
                name="vehicle_model"
                value={formData.vehicle_model}
                onChange={handleChange}
                required
                placeholder="e.g., Camry"
              />
            </div>

            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                name="vehicle_year"
                value={formData.vehicle_year}
                onChange={handleChange}
                placeholder="e.g., 2020"
              />
            </div>

            <div className="form-group">
              <label>License Plate / Tag</label>
              <input
                type="text"
                name="vehicle_tag"
                value={formData.vehicle_tag}
                onChange={handleChange}
                placeholder="e.g., ABC123"
              />
            </div>

            <div className="form-group">
              <label>VIN / Serial Number</label>
              <input
                type="text"
                name="vehicle_serial"
                value={formData.vehicle_serial}
                onChange={handleChange}
                placeholder="e.g., 1HGCM82633A123456"
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                name="vehicle_color"
                value={formData.vehicle_color}
                onChange={handleChange}
                placeholder="e.g., Red"
              />
            </div>

            <div className="form-group">
              <label>Mileage</label>
              <input
                type="number"
                name="vehicle_mileage"
                value={formData.vehicle_mileage}
                onChange={handleChange}
                placeholder="e.g., 25000"
              />
            </div>

            <div className="form-group">
              <label>Vehicle Type</label>
              <select
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="update-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;
