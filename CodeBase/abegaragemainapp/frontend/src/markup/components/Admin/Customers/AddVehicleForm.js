import { useState } from 'react';
import vehicleService from '../../../../services/vehicle.service';

const AddVehicleForm = ({ customerId, token, onVehicleAdded }) => {
  const [vehicle, setVehicle] = useState({
    vehicle_year: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_type: '',
    vehicle_mileage: '',
    vehicle_tag: '',
    vehicle_serial: '',
    vehicle_color: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = Object.values(vehicle);

    if (fields.some((field) => !field.trim())) {
      alert('Please fill in all vehicle fields');
      return;
    }

    setIsSubmitting(true);

    try {

      const res = await vehicleService.createVehicle(
        customerId,
        vehicle,
        token,
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to add vehicle');
        return;
      }

      alert('Vehicle added successfully');

      setVehicle({
        vehicle_year: '',
        vehicle_make: '',
        vehicle_model: '',
        vehicle_type: '',
        vehicle_mileage: '',
        vehicle_tag: '',
        vehicle_serial: '',
        vehicle_color: '',
      });

      if (onVehicleAdded) {
        onVehicleAdded();
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-vehicle">
      <h3>
        Add a new vehicle
        <span></span>
      </h3>

      <form className="vehicle-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="vehicle_year"
          placeholder="Vehicle year"
          value={vehicle.vehicle_year}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="vehicle_make"
          placeholder="Vehicle make"
          value={vehicle.vehicle_make}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="vehicle_model"
          placeholder="Vehicle model"
          value={vehicle.vehicle_model}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="vehicle_type"
          placeholder="Vehicle type"
          value={vehicle.vehicle_type}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="vehicle_mileage"
          placeholder="Vehicle mileage"
          value={vehicle.vehicle_mileage}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="vehicle_tag"
          placeholder="Vehicle tag"
          value={vehicle.vehicle_tag}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="vehicle_serial"
          placeholder="Vehicle serial"
          value={vehicle.vehicle_serial}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="vehicle_color"
          placeholder="Vehicle color"
          value={vehicle.vehicle_color}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'ADDING...' : 'ADD VEHICLE'}
        </button>
      </form>
    </div>
  );
};

export default AddVehicleForm;
