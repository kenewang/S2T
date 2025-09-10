import "./Footer.css";
import { useState, useRef } from "react";

const Footer = ({
  isLeftNavOpen,
  closeLeftNav,
  isRightNavOpen,
  closeRightNav,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const textRef = useRef(null);

  const maxWords = 350;

  const handleWordsChange = (e) => {
    let value = e.target.value;
    // Replace multiple spaces with a single space
    value = value.replace(/\s+/g, " ");

    // Split into words (ignore leading/trailing spaces)
    let words = value.trim().split(" ").filter(Boolean);

    if (words.length > maxWords) {
      // Keep only the first 350 words
      words = words.slice(0, maxWords);
      value = words.join(" ");
    }

    setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop default form behavior

    if (isLeftNavOpen || isRightNavOpen) {
      closeLeftNav();
      closeRightNav();
      return;
    }

    if (!name.trim() || name.length < 2) {
      nameRef.current?.focus();
      console.log("Invalid Name");
      return;
    }

    if (!validateEmail(email)) {
      emailRef.current?.focus();
      console.log("Invalid Email");
      return;
    }

    if (!message.trim()) {
      textRef.current?.focus();
      console.log("Enter message please");
      return;
    }

    console.log(
      "Form submitted with:",
      name,
      " and email",
      email,
      " text ",
      message
    );

    const response = await fetch("http://localhost:8081/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert("Email Sent!");
    } else {
      alert("Failed to send email");
    }
    setName("");
    setEmail("");
    setMessage("");

    // you can now do form submission logic here
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <footer>
      <p>
        editable library catalog, building towards a web page for every book
        ever published
      </p>

      <div>
        <h1>Get In Touch</h1>
        <form className="contact" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            ref={nameRef}
          ></input>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            ref={emailRef}
          ></input>

          <textarea
            value={message}
            rows="5"
            onChange={handleWordsChange}
            placeholder="Your Message"
            ref={textRef}
          ></textarea>

          <button type="submit" onClick={handleSubmit}>
            Send Message
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
