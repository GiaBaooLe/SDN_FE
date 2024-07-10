import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h4>Your Company</h4>
          <p>
            We provide a set of useful templates with fresh layouts to help you
            get started quickly and easily.
          </p>
        </div>
        <div className="footer-section links">
          <h4>Download</h4>
          <ul>
            <li>
              <Link to="#">Windows app</Link>
            </li>
            <li>
              <Link to="#">Mac app</Link>
            </li>
            <li>
              <Link to="#">Linux app</Link>
            </li>
            <li>
              <Link to="#">Desktop app</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section links">
          <h4>Products</h4>
          <ul>
            <li>
              <Link to="#">Web</Link>
            </li>
            <li>
              <Link to="#">App</Link>
            </li>
            <li>
              <Link to="#">Software</Link>
            </li>
            <li>
              <Link to="#">Ecommerce</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Get in touch</h4>
          <div className="social-icons">
            <Link to="#">
              <FaFacebook />
            </Link>
            <Link to="#">
              <FaTwitter />
            </Link>
            <Link to="#">
              <FaLinkedin />
            </Link>
          </div>
          <div className="subscribe">
            <input type="email" placeholder="Enter email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
