import React from 'react';
import about1 from '../../../assets/images/about-1.jpg';
import about2 from '../../../assets/images/about-2.jpg';

const AboutPreview = () => {
  return (
    <section className="about-preview">
      <div className="about-images">
        <img src={about1} alt="Car maintenance" />
        <img src={about2} alt="Car parts" />

        <div className="experience">
          <strong>24</strong>
          <span>YEARS</span>
          <span>EXPERIENCE</span>
        </div>
      </div>

      <div className="about-content">
        <small>Welcome to Our workshop</small>

        <h2>We have 24 years experience</h2>

        <div className="red-line" />

        <p>
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal has
          evolved from generation X.
        </p>

        <p>
          Capitalize on low hanging fruit to identify a ballpark value added
          activity to beta test.
        </p>

        <a href="/about">ABOUT US →</a>
      </div>
    </section>
  );
};

export default AboutPreview;
