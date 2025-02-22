// NewsFooter.jsx
import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import './NewsFooter.css';

const NewsFooter = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main footer content */}
        <div className="footer-content">
          {/* Brand section */}
          <div className="footer-brand">
            <h2 className="footer-logo">NewsApp</h2>
            <p className="footer-description">
              Your trusted source for breaking news, in-depth analysis, and compelling stories from around the globe.
            </p>
            {/* <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Youtube size={20} />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          {/* <div className="footer-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              <li><a href="#">Top Stories</a></li>
              <li><a href="#">World News</a></li>
              <li><a href="#">Technology</a></li>
              <li><a href="#">Business</a></li>
              <li><a href="#">Entertainment</a></li>
            </ul>
          </div> */}

          {/* Company */}
          {/* <div className="footer-links">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Advertise</a></li>
              <li><a href="#">Press Room</a></li>
            </ul>
          </div> */}

          {/* Newsletter Signup */}
          {/* <div className="footer-newsletter">
            <h3 className="footer-title">Newsletter</h3>
            <p className="newsletter-description">
              Subscribe to our newsletter for daily news updates.
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="input-group">
                <Mail className="mail-icon" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="newsletter-input"
                />
              </div>
              <button type="submit" className="subscribe-button">
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} NewsApp. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewsFooter;