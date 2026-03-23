import React, {useContext} from "react";
import "./Footer.scss";
import StyleContext from "../../contexts/StyleContext";
import DisplayLottie from "../displayLottie/DisplayLottie";
import {socialMediaLinks} from "../../portfolio";

// Download the animation JSON from:
// https://lottiefiles.com/free-animation/development-poky-heads-AeEOhSsqE8
// Save it as: src/assets/lottie/contactDev.json
let contactAnim = null;
try {
  contactAnim = require("../../assets/lottie/contactDev.json");
} catch (e) {
  // file not yet added — right column stays empty until downloaded
}

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <div
      className={isDark ? "dark-mode contact-section" : "contact-section"}
      id="contact"
    >
      {/* ── Left — contact info ── */}
      <div className="contact-left" data-reveal="left">
        <h1 className="contact-heading">Get In Touch</h1>
        <p className="contact-sub">
          Have a project in mind, want to collaborate, or just say hi? My inbox
          is always open — I'll get back to you!
        </p>

        <div className="contact-links">
          {socialMediaLinks.gmail && (
            <a
              className={isDark ? "dark-mode contact-link" : "contact-link"}
              href={`mailto:${socialMediaLinks.gmail}`}
            >
              <i className="fas fa-envelope contact-link-icon" />
              <span>{socialMediaLinks.gmail}</span>
            </a>
          )}
          {socialMediaLinks.linkedin && (
            <a
              className={isDark ? "dark-mode contact-link" : "contact-link"}
              href={socialMediaLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin contact-link-icon" />
              <span>LinkedIn</span>
            </a>
          )}
          {socialMediaLinks.github && (
            <a
              className={isDark ? "dark-mode contact-link" : "contact-link"}
              href={socialMediaLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github contact-link-icon" />
              <span>GitHub</span>
            </a>
          )}
        </div>

        {socialMediaLinks.gmail && (
          <a className="contact-cta-btn" href={`mailto:${socialMediaLinks.gmail}`}>
            Say Hello{" "}
            <span role="img" aria-label="wave">👋</span>
          </a>
        )}

        <p className="contact-footer-note">
          Made with{" "}
          <span role="img" aria-label="heart">❤️</span>{" "}
          by MuZakkir Saifi
        </p>
      </div>

      {/* ── Right — animation ── */}
      {contactAnim && (
        <div className="contact-right" data-reveal="right">
          <DisplayLottie animationData={contactAnim} />
        </div>
      )}
    </div>
  );
}
