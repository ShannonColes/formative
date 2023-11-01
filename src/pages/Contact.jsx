import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import hero image
import helping from "/img/helping.jpg";

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;
console.log(formEndpoint);

const ContactForm = () => {
  // state for the form submission
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // set states for in user input details / values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // object for our form - append form data to it so we can send it
    const testForm = new FormData();
    testForm.append("Your-name", name);
    testForm.append("Your-email", email);
    testForm.append("Your-message", message);

    //axios call
    //first argument is the endpoint, second is the form data:
    axios
      .post(formEndpoint, testForm, {
        header: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  //conditionals - if submitted is algud or if error shows up
  if (submitted) {
    return (
      <>
        <h3>Thank you for your message</h3>
        <p>We'll be in touch soon </p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3>Error!</h3>
        <p>Sorry, we were unable to send your message</p>
      </>
    );
  }

  //form to be returned
  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        {/* Name input */}
        <label htmlFor="name">Name</label>
        <div>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        {/* email input */}
        <label htmlFor="email">Email</label>
        <div>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        {/* Message input */}
        <label htmlFor="message">Message</label>
        <div>
          <textarea
            className="message-input"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
        </div>

        <div>
          <button className="form-submit-button" type="submit">
            Send Message
          </button>
        </div>
      </form>
    </>
  );
};

const Contact = () => {
  return (
    <>
      <div id="contact-hero-container">
        <img src={helping} alt="Helping heart image" />
      </div>
      <h2 className="page-title">Contact Us</h2>
      <div className="contact-info-help">
        <p>
          If you need help, you can find support services available to you here.
        </p>
        <h3 className="contact-support-text">
          <Link to="/resources">Support Services</Link>
        </h3>
        <h3 className="green-text">
          In a life-threatening situation, please dial 111
        </h3>
        <h3>To contact one of our team, please complete the form below.</h3>
      </div>

      <div id="contact-container" className="container">
        <div>
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
