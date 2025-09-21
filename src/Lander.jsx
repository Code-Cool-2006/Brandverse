import React from "react";
import { Link } from "react-router-dom";
import "./lander.css";
import customerImage from "./assets/Gemini_Generated_Image_jxmm7ijxmm7ijxmm.png";
import staffImage from "./assets/Gemini_Generated_Image_a4zahha4zahha4za.png";
import partnerImage from "./assets/Gemini_Generated_Image_dxih55dxih55dxih.png";
import heroImage from "./assets/hero_section.jpg";
import footerImage from "./assets/footer.jpg";

function Lander() {
  return (
    <div className="lander-wrapper">
      {/* ✅ Hero Section with Image */}
      <section className="hero">
        <img src={heroImage} alt="TomatoVerse Hero" className="hero-img" />
      </section>

      {/* ✅ Sub-Hero Section */}
      <section className="sub-hero">
        <div className="sub-hero-content">
          <h1 className="hero-title">Welcome to TOMATOVERSE</h1>
          <p className="hero-subtitle">
            Seamlessly connecting <span>Customers</span>, <span>Staff</span>,
            and <span>Partners</span>.
          </p>
        </div>
      </section>

      {/* ✅ Cards Section - Fully stretched, white background */}
      <div id="cards" className="lander-tab-row">
        {/* Customer Card */}
        <div className="card lander-card shadow-lg">
          <img src={customerImage} className="card-img-top" alt="Customer" />
          <div className="card-body">
            <h5 className="card-title text-primary">Customer</h5>
            <p className="card-text text-secondary">
              Access personalized services and explore our offerings designed
              just for you.
            </p>
          </div>
          <Link to="/user-dashboard" className="lander-user-profile mb-2">
            <div className="lander-user-profile-inner">
              <p>Guest Login</p>
            </div>
          </Link>
          <button className="lander-user-profile" navigate="/logincustom">
            <div className="lander-user-profile-inner">
              <p>Sign Up</p>
            </div>
          </button>
        </div>

        {/* Staff Card */}
        <div className="card lander-card shadow-lg">
          <img src={staffImage} className="card-img-top" alt="Staff" />
          <div className="card-body">
            <h5 className="card-title text-primary">Staff</h5>
            <p className="card-text text-secondary">
              Manage operations, access your dashboard, and provide seamless
              service.
            </p>
          </div>
          <Link to="/staff-dashboard" className="lander-user-profile mb-2">
            <div className="lander-user-profile-inner">
              <p>Guest Login</p>
            </div>
          </Link>
          <button className="lander-user-profile">
            <div className="lander-user-profile-inner">
              <p>Sign Up</p>
            </div>
          </button>
        </div>

        {/* Partner Card */}
        <div className="card lander-card shadow-lg">
          <img
            src={partnerImage}
            className="card-img-top"
            alt="Delivery Partner"
          />
          <div className="card-body">
            <h5 className="card-title text-primary">Partner</h5>
            <p className="card-text text-secondary">
              Join our network, deliver efficiently, and grow your business with
              us.
            </p>
          </div>
          <Link to="/partner-dashboard" className="lander-user-profile mb-2">
            <div className="lander-user-profile-inner">
              <p>Guest Login</p>
            </div>
          </Link>
          <button className="lander-user-profile">
            <div className="lander-user-profile-inner">
              <p>Sign Up</p>
            </div>
          </button>
        </div>
      </div>

      {/* ✅ Footer with Image */}
      <footer className="lander-footer">
        <img
          src={footerImage}
          alt="TomatoVerse Footer"
          className="footer-img"
        />
        <p>© {new Date().getFullYear()} TOMATOVERSE. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}

export default Lander;
