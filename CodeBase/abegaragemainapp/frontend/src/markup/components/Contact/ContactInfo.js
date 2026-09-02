const ContactInfo = () => {
  return (
    <section className="contact-info">
      <div className="contact-container">
        <div className="map">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb="
            loading="lazy"
          />
        </div>

        <div className="contact-details">
          <h2>Our Address</h2>

          <p>
            Excellent synergize resource sharing relationships via premier niche
            market. Professionally utilize one-to-one customer service.
          </p>

          <div className="contact-item">
            <span>⌖</span>
            <div>
              <strong>Address</strong>
              <p>548, Tawi Town 5238 MT, La city, IA 5224</p>
            </div>
          </div>

          <div className="contact-item">
            <span>✉</span>
            <div>
              <strong>Email</strong>
              <p>contact@autorex.com</p>
            </div>
          </div>

          <div className="contact-item">
            <span>☎</span>
            <div>
              <strong>Phone</strong>
              <p>1800 456 7890 | 123 456 7894</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
