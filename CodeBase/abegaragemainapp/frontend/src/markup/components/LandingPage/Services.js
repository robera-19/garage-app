import React from 'react';

const services = [
  'Performance Upgrade',
  'Transmission Services',
  'Break Repair & Service',
  'Engine Service & Repair',
  'Tyre & Wheels',
  'Denting & Painting',
];

const Services = () => {
  return (
    <section className="services-overview">
      <div className="services-container">
        <div className="services-title">
          <h2>Our Services</h2>
          <span></span>
        </div>

        <p className="services-text">
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal that
          has evolved from generation X is on the runway heading towards a
          streamlined cloud solution.
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service}>
              <small>SERVICE AND REPAIRS</small>

              <h3>{service}</h3>

              <a href="/services">READ MORE +</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
