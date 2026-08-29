import React from 'react';
import additionalImage from '../../../assets/images/additional-services.jpg';

const reasons = [
  'Certified Expert Mechanics',
  'Fast And Quality Service',
  'Best Prices In Town',
  'Awarded Workshop',
];

const services = [
  'General Auto Repair & Maintenance',
  'Transmission Repair & Replacement',
  'Tire Repair and Replacement',
  'State Emissions Inspection',
  'Break Job / Break Services',
  'Electrical Diagnostics',
  'Fuel System Repairs',
  'Starting and Charging Repair',
  'Steering and Suspension Work',
  'Emission Repair Facility',
  'Wheel Alignment',
  'Computer Diagnostic Testing',
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <div className="why-container">
        <div className="why-column">
          <div className="why-title">
            <h2>Why Choose Us</h2>
            <span></span>
          </div>

          <p>
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X.
          </p>

          <div className="reasons">
            {reasons.map((reason) => (
              <div className="reason" key={reason}>
                <span>♧</span>
                {reason}
              </div>
            ))}
          </div>
        </div>

        <div className="why-column">
          <div className="why-title">
            <h2>Additional Services</h2>
            <span></span>
          </div>

          <div className="additional-content">
            <img src={additionalImage} alt="Car service" />

            <ul>
              {services.map((service) => (
                <li key={service}>✓ {service}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
