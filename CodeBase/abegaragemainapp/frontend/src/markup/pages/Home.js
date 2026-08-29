import React from 'react';
import Hero from '../components/LandingPage/Hero';
import AboutPreview from '../components/LandingPage/AboutPreview';
import Services from '../components/LandingPage/Services';
import QualityBanner from '../components/LandingPage/QualityBanner';
import WhyChooseUs from '../components/LandingPage/WhyChooseUs';
import LeaderBanner from '../components/LandingPage/LeaderBanner';
import AppointmentCTA from '../components/LandingPage/AppointmentCTA';

function Home(props) {
  return (
    <div>
      <Hero />
      <AboutPreview />
      <Services />
      <QualityBanner />
      <WhyChooseUs />
      <LeaderBanner />
      <AppointmentCTA />
    </div>
  );
}

export default Home;