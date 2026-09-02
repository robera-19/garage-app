import React from 'react';
import aboutBanner from '../../../assets/images/about-banner.jpg';

const AboutBanner = () => {
  return (
    <section
      className="about-banner"
      style={{ backgroundImage: `url(${aboutBanner})` }}
    >
      <h1>About Us</h1>
    </section>
  );
};

export default AboutBanner;
