import React from "react";
import "./Footer.scss";
import { images } from "../../constants";
import { Link } from "react-router-dom";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links-container">
        <div className="logo">
          <Link to="/">
            <img src={images.logo_footer} alt="logo" />
          </Link>
        </div>
        <div className="socials-containers">
          <div className="social">
            <a
              href="https://en-gb.facebook.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={images.facebook} alt="facebook" />
            </a>
          </div>
          <div className="social">
            <a
              href="https://www.instagram.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={images.instagram} alt="instagram" />
            </a>
          </div>
          <div className="social">
            <a href="https://www.tiktok.com/" rel="noreferrer" target="_blank">
              <img src={images.tiktok} alt="tiktok" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copyright-container">
        <h1>&copy; {year} All Rights Reserved CYBER FROG</h1>
      </div>
    </div>
  );
};

export default Footer;
