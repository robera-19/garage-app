import React from 'react';
import leaderImage from '../../../assets/images/leader.jpg';

const LeaderBanner = () => {
  return (
    <section
      className="leader-banner"
      style={{ backgroundImage: `url(${leaderImage})` }}
    >
      <div className="leader-content">
        <small>
          Working since 1992 <span />
        </small>

        <h2>
          We are leader
          <br />
          in Car Mechanical Work
        </h2>

        <button>▶</button>

        <div className="leader-links">
          <span>WATCH INTRO VIDEO</span>
          <span>ABOUT US</span>
        </div>
      </div>
    </section>
  );
};

export default LeaderBanner;
