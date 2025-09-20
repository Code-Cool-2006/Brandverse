import React from "react";
import { Link } from "react-router-dom";
import "./lander.css";
import customerImage from "./assets/Gemini_Generated_Image_jxmm7ijxmm7ijxmm.png";
import staffImage from "./assets/Gemini_Generated_Image_a4zahha4zahha4za.png";
import partnerImage from "./assets/Gemini_Generated_Image_dxih55dxih55dxih.png";

function Lander() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Brandverse
          </Link>
        </div>
      </nav>
      <div
        className="d-flex justify-content-around flex-wrap gap-4 p-4"
        style={{ paddingTop: "80px" }}
      >
        <div
          className="card shadow-lg"
          style={{ width: "18rem", transition: "transform 0.3s" }}
        >
          <img src={customerImage} className="card-img-top" alt="Customer" />
          <div className="card-body">
            <h5 className="card-title text-primary">Customer</h5>
            <p className="card-text text-secondary">
              Some quick example text to build on the card title and make up the
              bulk of the card’s content.
            </p>
          </div>
          <Link
            aria-label="Customer Login Button"
            className="user-profile"
            to="/logincustom"
            role="button"
          >
            <div className="user-profile-inner">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g data-name="Layer 2" id="Layer_2">
                  <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"></path>
                </g>
              </svg>
              <span>Sign In</span>
            </div>
          </Link>
        </div>

        <div
          className="card shadow-lg"
          style={{ width: "18rem", transition: "transform 0.3s" }}
        >
          <img src={staffImage} className="card-img-top" alt="Staff" />
          <div className="card-body">
            <h5 className="card-title text-primary">Staff</h5>
            <p className="card-text text-secondary">
              Some quick example text to build on the card title and make up the
              bulk of the card’s content.
            </p>
          </div>
          <Link
            aria-label="Staff Login Button"
            className="user-profile"
            to="/login"
            role="button"
          >
            <div className="user-profile-inner">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g data-name="Layer 2" id="Layer_2">
                  <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"></path>
                </g>
              </svg>
              <span>Sign In</span>
            </div>
          </Link>
        </div>

        <div
          className="card shadow-lg"
          style={{ width: "18rem", transition: "transform 0.3s" }}
        >
          <img
            src={partnerImage}
            className="card-img-top"
            alt="Delivery Partner"
          />
          <div className="card-body">
            <h5 className="card-title text-primary">Partner</h5>
            <p className="card-text text-secondary">
              Some quick example text to build on the card title and make up the
              bulk of the card’s content.
            </p>
          </div>
          <Link
            aria-label="Partner Login Button"
            className="user-profile"
            to="/login"
            role="button"
          >
            <div className="user-profile-inner">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g data-name="Layer 2" id="Layer_2">
                  <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"></path>
                </g>
              </svg>
              <span>Sign In</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Lander;
