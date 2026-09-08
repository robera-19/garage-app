import { useState, useEffect } from 'react';
const api_url = process.env.REACT_APP_API_URL;

const Step2SelectVehicle = ({
  customerId,
  selectedVehicle,
  onSelectVehicle,
  onNext,
  onPrevious,
}) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const [newVehicle, setNewVehicle] = useState({
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: '',
    vehicle_tag: '',
    vehicle_serial: '',
    vehicle_color: '',
    vehicle_mileage: '',
    vehicle_type: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (customerId) {
      fetchCustomerVehicles();
    }
  }, [customerId]);

  const fetchCustomerVehicles = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${api_url}/api/customer/${customerId}/vehicles`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        },
      );

      console.log('Vehicle API status:', response.status);

      const data = await response.json();

      console.log('Vehicle API response:', data);

      if (response.ok) {
        setVehicles(data.data || []);
      } else {
        console.error('Failed to get vehicles:', data);
        setVehicles([]);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    onSelectVehicle(vehicle);
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${api_url}/api/customer/${customerId}/vehicle`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify(newVehicle),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert('Vehicle added successfully!');

        setShowAddVehicle(false);

        setNewVehicle({
          vehicle_make: '',
          vehicle_model: '',
          vehicle_year: '',
          vehicle_tag: '',
          vehicle_serial: '',
          vehicle_color: '',
          vehicle_mileage: '',
          vehicle_type: '',
        });

        // Reload vehicles from backend
        fetchCustomerVehicles();
      } else {
        alert(data.error || 'Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!customerId) {
    return (
      <div className="step-2-vehicle">
        <h2>Choose a Vehicle</h2>

        <div className="no-customer">
          <p>Please select a customer first.</p>

          <button onClick={onPrevious}>← Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-2-vehicle">
      <h2>Choose a Vehicle</h2>

      {loading ? (
        <div className="loading">Loading vehicles...</div>
      ) : vehicles.length > 0 ? (
        <>
          <div className="vehicle-table-wrapper">
            <table className="vehicle-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Tag</th>
                  <th>Serial</th>
                  <th>Color</th>
                  <th>Mileage</th>
                  <th>Choose</th>
                </tr>
              </thead>

              <tbody>
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.vehicle_id}
                    className={
                      selectedVehicle?.vehicle_id === vehicle.vehicle_id
                        ? 'selected'
                        : ''
                    }
                  >
                    <td>{vehicle.vehicle_year}</td>
                    <td>{vehicle.vehicle_make}</td>
                    <td>{vehicle.vehicle_model}</td>
                    <td>{vehicle.vehicle_tag}</td>
                    <td>{vehicle.vehicle_serial}</td>
                    <td>{vehicle.vehicle_color}</td>
                    <td>{vehicle.vehicle_mileage || 'N/A'}</td>

                    <td>
                      <button
                        className={`choose-btn ${
                          selectedVehicle?.vehicle_id === vehicle.vehicle_id
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() => handleSelectVehicle(vehicle)}
                      >
                        {selectedVehicle?.vehicle_id === vehicle.vehicle_id
                          ? '✓ Selected'
                          : 'Select'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="vehicle-actions">
            <button
              className="add-vehicle-btn"
              onClick={() => setShowAddVehicle(true)}
            >
              + Add New Vehicle
            </button>
          </div>
        </>
      ) : (
        <div className="no-vehicles">
          <p>No vehicles found for this customer.</p>

          <button
            className="add-vehicle-btn"
            onClick={() => setShowAddVehicle(true)}
          >
            + Add New Vehicle
          </button>
        </div>
      )}

      {showAddVehicle && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Vehicle</h3>

            <form onSubmit={handleAddVehicle}>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Make"
                  value={newVehicle.vehicle_make}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicle_make: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Model"
                  value={newVehicle.vehicle_model}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicle_model: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Year"
                  value={newVehicle.vehicle_year}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicle_year: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Vehicle Tag"
                  value={newVehicle.vehicle_tag}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicle_tag: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Vehicle Serial"
                  value={newVehicle.vehicle_serial}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicle_serial: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Color"
                  value={newVehicle.vehicle_color}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicle_color: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Mileage"
                  value={newVehicle.vehicle_mileage}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicle_mileage: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Vehicle Type"
                  value={newVehicle.vehicle_type}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicle_type: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddVehicle(false)}>
                  Cancel
                </button>

                <button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button className="prev-btn" onClick={onPrevious}>
          ← Previous
        </button>

        <button
          className="next-btn"
          onClick={onNext}
          disabled={!selectedVehicle}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default Step2SelectVehicle;
