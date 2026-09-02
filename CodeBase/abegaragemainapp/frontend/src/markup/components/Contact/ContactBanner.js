import contactBanner from '../../../assets/images/leader.jpg';

const ContactBanner = () => {
  return (
    <section
      className="contact-banner"
      style={{ backgroundImage: `url(${contactBanner})` }}
    >
      <div>
        <h1>Contact Us</h1>
        <small>Home / Contact Us</small>
      </div>
    </section>
  );
};

export default ContactBanner;
