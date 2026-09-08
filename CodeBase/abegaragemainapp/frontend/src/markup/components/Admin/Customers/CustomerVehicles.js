import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../Context/AuthContext';
import vehicleService from '../../../../services/vehicle.service';
import AddVehicleForm from './AddVehicleForm';
import EditVehicleModal from './EditVehicleModal'; // We'll create this

const CustomerVehicles = ({ customer }) => {
  const { id: customerId } = useParams();
  const { employee } = useAuth();

  const token = employee?.employee_token || null;

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const loadVehicles = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await vehicleService.getVehiclesByCustomerId(
        customerId,
        token,
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to load vehicles');
        console.log(data.error);
        return;
      }

      setVehicles(data.data || []);
    } catch (error) {
      console.log(error);
      setError('Something went wrong while loading vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [customerId, token]);

  // Handle delete vehicle
  const handleDeleteVehicle = async (vehicleId, e) => {
    e.stopPropagation();

    if (!window.confirm('Are you sure you want to delete this vehicle?')) {
      return;
    }

    try {
      const res = await vehicleService.deleteVehicle(vehicleId, token);

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete vehicle');
        return;
      }

      // Remove vehicle from list
      setVehicles(vehicles.filter((v) => v.vehicle_id !== vehicleId));
      alert('Vehicle deleted successfully');
    } catch (error) {
      console.log(error);
      alert('Something went wrong while deleting the vehicle');
    }
  };

  // Handle edit vehicle
  const handleEditVehicle = (vehicle, e) => {
    e.stopPropagation();
    setSelectedVehicle(vehicle);
    setShowEditModal(true);
  };

  // Handle update vehicle
  const handleUpdateVehicle = async (vehicleData) => {
    try {
      const res = await vehicleService.updateVehicle(
        selectedVehicle.vehicle_id,
        vehicleData,
        token,
      );

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to update vehicle');
        return;
      }

      // Refresh the vehicle list
      await loadVehicles();
      setShowEditModal(false);
      setSelectedVehicle(null);
      alert('Vehicle updated successfully');
    } catch (error) {
      console.log(error);
      alert('Something went wrong while updating the vehicle');
    }
  };

  return (
    <div className="customer-detail-section">
      <div className="customer-detail-icon">Cars</div>

      <div className="customer-detail-content">
        <h3>Vehicles of {customer?.customer_first_name}</h3>

        {error && (
          <div
            className="error-message"
            style={{ color: 'red', marginBottom: '10px' }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="vehicle-empty">Loading vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div className="vehicle-empty">No vehicle found</div>
        ) : (
          <div className="vehicle-list">
            {vehicles.map((vehicle) => (
              <div className="vehicle-item" key={vehicle.vehicle_id}>
                <div>
                  <strong>
                    {vehicle.vehicle_year} {vehicle.vehicle_make}{' '}
                    {vehicle.vehicle_model}
                  </strong>

                  <p>
                    {vehicle.vehicle_type || 'Car'} |{' '}
                    {vehicle.vehicle_color || 'N/A'} |{' '}
                    {vehicle.vehicle_tag || 'No tag'}
                  </p>

                  {/* Additional vehicle details */}
                  <div className="vehicle-details">
                    <span>Serial: {vehicle.vehicle_serial || 'N/A'}</span>
                    <span>Mileage: {vehicle.vehicle_mileage || 'N/A'}</span>
                  </div>
                </div>

                <div className="vehicle-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={(e) => handleEditVehicle(vehicle, e)}
                    title="Edit vehicle"
                  >
                    ✎
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={(e) => handleDeleteVehicle(vehicle.vehicle_id, e)}
                    title="Delete vehicle"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <AddVehicleForm
          customerId={customerId}
          token={token}
          onVehicleAdded={loadVehicles}
        />

        {/* Edit Vehicle Modal */}
        {showEditModal && selectedVehicle && (
          <EditVehicleModal
            vehicle={selectedVehicle}
            onUpdate={handleUpdateVehicle}
            onClose={() => {
              setShowEditModal(false);
              setSelectedVehicle(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerVehicles;
