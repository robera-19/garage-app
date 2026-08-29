import React from 'react';
import heroImage from '../../../assets/images/hero.jpg';

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <small>
          Working since 1992 <span />
        </small>

        <h1 className="hero-title">
          Tuneup Your Car
          <br />
          to Next Level
        </h1>

        <div className="hero-video">
          <button className="hero-play">▶</button>

          <div>
            <small>WATCH INTRO VIDEO</small>
            <small>ABOUT US</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
