import React from 'react';
import qualityImage from '../../../assets/images/quality.jpg';

const QualityBanner = () => {
  return (
    <section className="quality-banner">
      <div className="quality-content">
        <h2>
          Quality Service And
          <br />
          Customer Satisfaction !!
        </h2>

        <p>
          We utilize the most recent symptomatic gain to ensure your vehicle is
          fixed or adjusted appropriately and in an opportune manner. We are an
          individual from Professional Auto Service, a first class execution
          arrange, where free assistance offices share objective of being
          world-class car administration focuses.
        </p>
      </div>

      <div className="quality-image">
        <img src={qualityImage} alt="Car dashboard" />
      </div>
    </section>
  );
};

export default QualityBanner;
