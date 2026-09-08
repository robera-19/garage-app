import AboutBanner from '../components/About/AboutBanner';
import SkilledMechanics from '../components/About/SkilledMechanics';

import AboutPreview from '../components/LandingPage/AboutPreview';
import WhyChooseUs from '../components/LandingPage/WhyChooseUs';
import LeaderBanner from '../components/LandingPage/LeaderBanner';
import AppointmentCTA from '../components/LandingPage/AppointmentCTA';

const About = () => {
  return (
    <>

      <main>
        <AboutBanner />
        <SkilledMechanics />
        <AboutPreview />
        <WhyChooseUs />
        <LeaderBanner />
        <AppointmentCTA />
      </main>


    </>
  );
};

export default About;
