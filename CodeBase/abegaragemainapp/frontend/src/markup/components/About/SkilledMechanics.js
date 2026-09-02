import React from 'react';
import mechanicsImage from '../../../assets/images/mechanics.jpg';

const SkilledMechanics = () => {
  return (
    <section className="skilled-mechanics">
      <div className="skilled-content">
        <div>
          <h2>We are highly skilled mechanics for your car repair</h2>

          <div className="red-line" />

          <p>
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X is on the runway heading towards a
            streamlined cloud solution.
          </p>

          <p>
            User generated content in real-time will have multiple touchpoints
            for offshoring.
          </p>
        </div>

        <img src={mechanicsImage} alt="Car mechanic" />
      </div>
    </section>
  );
};

export default SkilledMechanics;
