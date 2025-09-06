import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <p>
        editable library catalog, building towards a web page for every book
        ever published
      </p>

      <div>
        <h1>Get In Touch</h1>
        <form action="/send-message" method="POST" className="contact">
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your Name"
          ></input>

          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Your Email"
          ></input>

          <textarea
            id="message"
            name="message"
            rows="5"
            required
            placeholder="Your Message"
          ></textarea>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
