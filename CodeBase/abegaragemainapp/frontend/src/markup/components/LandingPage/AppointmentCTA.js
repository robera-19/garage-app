import React from 'react';

const AppointmentCTA = () => {
  return (
    <section className="appointment-cta">
      <div className="appointment-content">
        <h2>Schedule Your Appointment Today</h2>
        <p>Your Automotive Repair & Maintenance Service Specialist</p>
      </div>

      <div className="appointment-phone">
        <span>Call Us</span>
        <strong>1800.456.7890</strong>
      </div>

      <a href="/contact">CONTACT US +</a>
    </section>
  );
};

export default AppointmentCTA;
