import React from "react";
import { Link } from "react-router-dom";

import logo from "/img/logo-nav.png";

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <div id="footer-container-grid">
          <div id="logo" className="footer-grid-item">
            <Link to="/">
              <img src={logo} alt="Company Logo" />
            </Link>
          </div>
          <div className="footer-grid-item">
            <h3>Contact Links</h3>
            <ul>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
            </ul>
          </div>
          <div className="footer-grid-item">
            <h3>News</h3>
            <ul>
              <li>
                <Link to="/">Resilience Breakfast</Link>
              </li>
              <li>
                <Link to="/">Run For Hope</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="end-text-footer">
          <p>
            © 2023 The Broken Movement Trust | Website by Tuckstone Consulting
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
