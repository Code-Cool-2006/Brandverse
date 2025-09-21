import React, { useState, useEffect } from "react";

// --- Reusable Icon Components ---
const CardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const UpiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"></path>
    <path d="M12 12v3"></path>
    <path d="M12 6v1"></path>
    <path d="M10 12h4"></path>
    <path d="m15 9-3 3-3-3"></path>
  </svg>
);

// --- Payment Animation Component ---
const PaymentAnimation = () => (
  <div className="payment-animation-container">
    <div className="left-side">
      <div className="card">
        <div className="card-line"></div>
        <div className="buttons"></div>
      </div>
      <div className="post">
        <div className="post-line"></div>
        <div className="screen">
          <div className="dollar">$</div>
        </div>
        <div className="numbers"></div>
        <div className="numbers-line2"></div>
      </div>
    </div>
    <div className="right-side">
      <div className="new">Paying</div>
      <svg
        className="arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        height="512"
        viewBox="0 0 451.846 451.847"
      >
        <path
          d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
          className="active-path"
          fill="#a1a1ff"
        ></path>
      </svg>
    </div>
  </div>
);

// --- Success Card Component ---
const SuccessCard = ({ onDismiss }) => (
  <div className="success-card">
    <button type="button" className="dismiss" onClick={onDismiss}>
      ×
    </button>
    <div className="header">
      <div className="image">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g id="SVGRepo_iconCarrier">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="#000000"
              d="M20 7L9.00004 18L3.99994 13"
            ></path>
          </g>
        </svg>
      </div>
      <div className="content">
        <span className="title">Order Confirmed!</span>
        <p className="message">
          Your order is being prepared and will be delivered shortly. Enjoy your
          meal!
        </p>
      </div>
    </div>
  </div>
);

// --- Already Paid Notification Card ---
const AlreadyPaidCard = ({ onDismiss }) => (
  <div className="already-paid-card">
    <button type="button" className="dismiss" onClick={onDismiss}>
      ×
    </button>
    <div className="header">
      <div className="image">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g id="SVGRepo_iconCarrier">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="#000000"
              d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="content">
        <span className="title">Order Already Placed</span>
        <p className="message">
          You have already completed the payment for this order. You can track
          its status below.
        </p>
      </div>
    </div>
  </div>
);

function Payment() {
  const [view, setView] = useState("choices"); // choices, card, upi, loading, success, alreadyPaid
  const [isPaid, setIsPaid] = useState(false);
  const [upiOption, setUpiOption] = useState("id");
  const [countdown, setCountdown] = useState(10);
  const [qrState, setQrState] = useState("idle"); // idle, notice, visible, expired
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [orderItems, setOrderItems] = useState([]);
  const [userKey, setUserKey] = useState("");

  // Load order data from localStorage on component mount
  useEffect(() => {
    const storedTotal = localStorage.getItem("orderTotal");
    const storedItems = localStorage.getItem("orderItems");

    if (storedTotal) {
      setTotalAmount(storedTotal);
    }
    if (storedItems) {
      try {
        setOrderItems(JSON.parse(storedItems));
      } catch (error) {
        console.error("Error parsing order items:", error);
      }
    }
  }, []);

  // Ensure a persistent userKey for correlating orders to this user
  useEffect(() => {
    let key = localStorage.getItem("userKey");
    if (!key) {
      key = `user_${Math.random().toString(36).slice(2)}_${Date.now()}`;
      localStorage.setItem("userKey", key);
    }
    setUserKey(key);
  }, []);

  useEffect(() => {
    let timer;
    if (qrState === "visible" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (qrState === "visible" && countdown === 0) {
      setQrState("expired");
    }
    return () => clearTimeout(timer);
  }, [qrState, countdown]);

  // Auto-redirect to Partner Dashboard shortly after success
  useEffect(() => {
    if (view === "success") {
      const t = setTimeout(() => {
        handlePaymentSuccess();
      }, 2000); // 2 seconds after success
      return () => clearTimeout(t);
    }
  }, [view]);

  const handlePaymentSelection = (method) => {
    if (isPaid) {
      setView("alreadyPaid");
    } else {
      setView(method);
    }
  };

  const handleGenerateQr = () => {
    setQrState("notice");
    setTimeout(() => {
      setCountdown(10);
      setQrState("visible");
    }, 2000);
  };

  const handleUpiOptionChange = (option) => {
    setUpiOption(option);
    if (option === "qr" && qrState !== "visible" && qrState !== "expired") {
      handleGenerateQr();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setView("loading");
    setTimeout(() => {
      setIsPaid(true);
      setView("success");
    }, 2500);
  };

  const handleDismiss = () => {
    setView("choices");
  };

  const handlePaymentSuccess = async () => {
    try {
      // Create order on the backend so Partner Dashboard can see it
      const items = Array.isArray(orderItems)
        ? orderItems.map(({ id, name, price, quantity = 1, image }) => ({
            id,
            name,
            price: parseFloat(price),
            quantity,
            image,
          }))
        : [];
      const itemNames = items.map((item) => item.name).join(", ");
      const payload = {
        userKey: userKey || localStorage.getItem("userKey"),
        items,
        total: parseFloat(totalAmount || "0"),
        name: `Order: ${itemNames.substring(0, 50)}${
          itemNames.length > 50 ? "..." : ""
        }`,
      };
      console.log("Creating order with payload:", payload);
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        console.log("Order created successfully");
      } else {
        console.error(
          "Failed to create order:",
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      // Non-blocking; even if it fails, continue UX
      console.warn("Failed to create order on backend", err);
    }

    // Clear the stored order data
    localStorage.removeItem("orderTotal");
    localStorage.removeItem("orderItems");
    // Redirect back to user dashboard
    window.location.href = "/user-dashboard";
  };

  // --- RENDER LOGIC ---

  const renderContent = () => {
    switch (view) {
      case "loading":
        return <PaymentAnimation />;
      case "success":
        return <SuccessCard onDismiss={handlePaymentSuccess} />;
      case "alreadyPaid":
        return <AlreadyPaidCard onDismiss={handleDismiss} />;
      case "card":
        return renderCardForm();
      case "upi":
        return renderUpiForm();
      case "choices":
      default:
        return renderInitialChoices();
    }
  };

  const renderInitialChoices = () => (
    <div className="payment-card choice-card">
      <div className="payment-header">
        <button
          className="back-button"
          onClick={() => (window.location.href = "/")}
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="payment-title">Select Payment Method</h1>
        <p className="payment-subtitle">Total Amount: ${totalAmount}</p>
      </div>
      <div className="payment-options">
        <button
          className="option-button"
          onClick={() => handlePaymentSelection("card")}
        >
          <img
            src="data:image/png;base64,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"
            alt="Card Icon"
            className="payment-icon"
          />
          <span>Credit / Debit Card</span>
        </button>
        <button
          className="option-button"
          onClick={() => handlePaymentSelection("upi")}
        >
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png"
            alt="UPI Icon"
            className="payment-icon"
          />
          <span>UPI</span>
        </button>
      </div>
    </div>
  );

  const renderCardForm = () => (
    <div className="payment-card">
      <div className="payment-header">
        <button className="back-button" onClick={() => setView("choices")}>
          &larr; Back
        </button>
        <h1 className="payment-title">
          <CardIcon /> Card Payment
        </h1>
        <p className="payment-subtitle">Enter your card details below.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardName">Name on Card</label>
          <input id="cardName" type="text" placeholder="John Doe" required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiry">Expiry Date</label>
            <input id="expiry" type="text" placeholder="MM/YY" required />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input id="cvv" type="text" placeholder="123" required />
          </div>
        </div>
        <button className="pay-button" type="submit">
          Pay Securely - ${totalAmount}
        </button>
      </form>
    </div>
  );

  const renderUpiForm = () => (
    <div className="payment-card">
      <div className="payment-header">
        <button className="back-button" onClick={() => setView("choices")}>
          &larr; Back
        </button>
        <h1 className="payment-title">
          <UpiIcon /> UPI Payment
        </h1>
        <p className="payment-subtitle">Please enter your UPI details below.</p>
      </div>

      <div className="upi-options-tabs">
        <button
          className={`upi-tab-button ${upiOption === "id" ? "active" : ""}`}
          onClick={() => handleUpiOptionChange("id")}
        >
          UPI ID
        </button>
        <button
          className={`upi-tab-button ${upiOption === "qr" ? "active" : ""}`}
          onClick={() => handleUpiOptionChange("qr")}
        >
          Scan QR
        </button>
      </div>

      {upiOption === "id" ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="upiId">UPI ID</label>
            <input
              id="upiId"
              type="text"
              placeholder="yourname@bank"
              required
            />
          </div>
          <button className="pay-button" type="submit">
            Pay Securely - ${totalAmount}
          </button>
        </form>
      ) : (
        <div className="qr-code-container">
          {qrState === "notice" && (
            <div className="qr-notice">
              <p>
                The QR code will be available for <strong>10 seconds</strong>{" "}
                only.
              </p>
            </div>
          )}
          {qrState === "visible" && (
            <>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                alt="Scan to Pay"
                className="qr-code-image"
              />
              <p className="qr-timer">
                Expires in: <strong>{countdown}s</strong>
              </p>
              <button className="pay-button" onClick={handleSubmit}>
                Simulate Successful Scan
              </button>
            </>
          )}
          {qrState === "expired" && (
            <div className="qr-expired-container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                alt="Expired QR Code"
                className="qr-code-image blurred"
              />
              <p className="qr-expired-text">QR code has expired.</p>
              <button className="regenerate-button" onClick={handleGenerateQr}>
                Regenerate
              </button>
            </div>
          )}
          {qrState === "idle" && (
            <div className="qr-notice">
              <p>Click the tab again to generate a new QR Code.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap');

        .payment-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f0f2f5;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }

        .payment-card {
          background-color: white;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 450px;
          animation: fadeIn 0.5s ease-out;
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .payment-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .payment-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a202c;
          margin: 0;
        }

        .payment-subtitle {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #718096;
        }
        
        button {
            cursor: pointer;
        }

        .back-button {
          position: absolute;
          top: 0;
          left: 0;
          background: none;
          border: none;
          color: #4a5568;
          font-size: 1rem;
          font-weight: 500;
          padding: 0;
        }
        .back-button:hover {
          color: #007bff;
          background: none;
        }

        /* --- Choice Screen --- */
        .choice-card .payment-title {
          margin-bottom: 2rem;
        }
        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .option-button {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background-color: #f7fafc;
          color: #2d3748;
          transition: all 0.2s ease-in-out;
        }
        .option-button:hover {
          border-color: #4299e1;
          background-color: #fff;
          color: #2b6cb0;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .payment-icon { 
          width: 32px;
          height: auto;
          object-fit: contain;
        }

        /* --- Form Styles --- */
        .form-group {
          margin-bottom: 1.25rem;
          text-align: left;
        }
        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }
        .form-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          color: #2d3748;
          transition: border-color 0.2s, box-shadow 0.2s;
          margin: 0;
          box-sizing: border-box;
        }
        .form-group input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
        }
        .form-row {
          display: flex;
          gap: 1rem;
        }
        .form-row .form-group {
          flex: 1;
        }

        .pay-button {
          width: 100%;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: white;
          background-color: #3182ce;
          border: none;
          padding: 0.8rem;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 48px;
          transition: background-color 0.3s, transform 0.2s;
        }
        .pay-button:hover:not(:disabled) {
          transform: translateY(-2px);
          background-color: #2b6cb0;
        }
        .pay-button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }
        
        /* --- UPI Options --- */
        .upi-options-tabs {
          display: flex;
          background-color: #edf2f7;
          border-radius: 8px;
          padding: 4px;
          margin-bottom: 1.5rem;
        }

        .upi-tab-button {
          flex: 1;
          padding: 0.6rem;
          border: none;
          background: transparent;
          border-radius: 6px;
          color: #4a5568;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 1rem;
          transition: background-color 0.2s, color 0.2s;
        }
        .upi-tab-button.active {
          background-color: white;
          color: #2b6cb0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .qr-code-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          min-height: 320px; 
          justify-content: center;
        }
        .qr-code-image { 
          width: 100%;
          max-width: 220px;
          height: auto;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }

        /* --- New Styles for QR Flow --- */
        .qr-notice {
          text-align: center;
          color: #4a5568;
          padding: 2rem;
          background-color: #edf2f7;
          border-radius: 8px;
          width: 100%;
          box-sizing: border-box;
        }
        .qr-timer {
          font-size: 1rem;
          color: #e53e3e;
          font-weight: 500;
        }
        .qr-expired-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .qr-code-image.blurred {
          filter: blur(5px);
          opacity: 0.6;
        }
        .qr-expired-text {
          font-size: 1rem;
          color: #718096;
          font-weight: 500;
        }
        .regenerate-button {
          background-color: #3182ce;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          transition: background-color 0.2s;
        }
        .regenerate-button:hover {
          background-color: #2b6cb0;
        }

        /* --- Payment Animation Styles --- */
        .payment-animation-container {
          background-color: #1e1e2f;
          display: flex;
          width: 460px;
          height: 120px;
          position: relative;
          border-radius: 12px;
          overflow: hidden; 
        }

        .payment-animation-container .left-side {
          background-color: #3b82f6;
          width: 130px;
          height: 120px;
          border-radius: 4px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .payment-animation-container .right-side {
          width: calc(100% - 130px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          white-space: nowrap;
        }

        .payment-animation-container .arrow {
          width: 20px;
          height: 20px;
          margin-right: 20px;
        }

        .payment-animation-container .new {
          font-size: 23px;
          font-family: "Lexend Deca", sans-serif;
          margin-left: 20px;
          color: #d1d5db;
        }

        .payment-animation-container .card {
          width: 70px;
          height: 46px;
          background-color: #93c5fd;
          border-radius: 6px;
          position: absolute;
          display: flex;
          z-index: 10;
          flex-direction: column;
          align-items: center;
          box-shadow: 9px 9px 9px -2px rgba(59, 130, 246, 0.5);
          animation: slide-top 1.8s cubic-bezier(0.645, 0.045, 0.355, 1) both;
        }

        .payment-animation-container .card-line {
          width: 65px;
          height: 13px;
          background-color: #60a5fa;
          border-radius: 2px;
          margin-top: 7px;
        }

        .payment-animation-container .buttons {
          width: 8px;
          height: 8px;
          background-color: #1e40af;
          box-shadow: 0 -10px 0 0 #1e3a8a, 0 10px 0 0 #3b82f6;
          border-radius: 50%;
          margin-top: 5px;
          transform: rotate(90deg);
          margin: 10px 0 0 -30px;
        }

        .payment-animation-container .post {
          width: 63px;
          height: 75px;
          background-color: #4b5563;
          position: absolute;
          z-index: 11;
          bottom: -75px; 
          border-radius: 6px;
          overflow: hidden;
          animation: slide-post 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) .5s both;
        }

        @keyframes slide-top {
          0% { transform: translateY(0); }
          50% { transform: translateY(-70px) rotate(90deg); }
          60% { transform: translateY(-70px) rotate(90deg); }
          100% { transform: translateY(-8px) rotate(90deg); }
        }

        @keyframes slide-post {
          50% { transform: translateY(-85px); }
          100% { transform: translateY(-85px); }
        }

        .payment-animation-container .post-line {
          width: 47px; height: 9px; background-color: #1f2937; position: absolute;
          border-radius: 0px 0px 3px 3px; right: 8px; top: 8px;
        }
        .payment-animation-container .post-line:before {
          content: ""; position: absolute; width: 47px; height: 9px;
          background-color: #374151; top: -8px;
        }
        .payment-animation-container .screen {
          width: 47px; height: 23px; background-color: #e5e7eb; position: absolute;
          top: 22px; right: 8px; border-radius: 3px;
        }
        .payment-animation-container .numbers {
          width: 12px; height: 12px; background-color: #6b7280;
          box-shadow: 0 -18px 0 0 #6b7280, 0 18px 0 0 #6b7280;
          border-radius: 2px; position: absolute; transform: rotate(90deg);
          left: 25px; top: 52px;
        }
        .payment-animation-container .numbers-line2 {
          width: 12px; height: 12px; background-color: #9ca3af;
          box-shadow: 0 -18px 0 0 #9ca3af, 0 18px 0 0 #9ca3af;
          border-radius: 2px; position: absolute; transform: rotate(90deg);
          left: 25px; top: 68px;
        }
        .payment-animation-container .dollar {
          position: absolute; font-size: 16px; font-family: "Lexend Deca", sans-serif;
          width: 100%; left: 0; top: 2px; color: #3b82f6; text-align: center;
          animation: fade-in-fwd 0.3s 1.5s backwards;
        }

        @keyframes fade-in-fwd {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }


        /* --- Success Card Styles --- */
        .success-card, .already-paid-card {
          overflow: hidden; position: relative; text-align: left;
          border-radius: 0.5rem; max-width: 350px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          background-color: #fff; animation: fadeIn 0.5s ease-out;
          padding: 1.25rem 1rem;
        }
        .success-card .dismiss, .already-paid-card .dismiss {
          position: absolute;
          right: 10px;
          top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          background-color: #fff;
          color: black;
          border: 2px solid #D1D5DB;
          font-size: 1rem;
          font-weight: 300;
          width: 30px;
          height: 30px;
          border-radius: 7px;
          transition: .3s ease;
          line-height: 1;
        }
        .success-card .dismiss:hover, .already-paid-card .dismiss:hover {
          background-color: #ee0d0d;
          border: 2px solid #ee0d0d;
          color: #fff;
        }
        .success-card .header, .already-paid-card .header { 
            padding: 1.25rem 1rem 1rem 1rem; 
        }
        .success-card .image, .already-paid-card .image {
          display: flex; margin-left: auto; margin-right: auto;
          flex-shrink: 0; justify-content: center;
          align-items: center; width: 3rem; height: 3rem; border-radius: 9999px;
        }
        .success-card .image {
            background-color: #e2feee;
            animation: animate-check .6s linear alternate-reverse infinite;
            transition: .6s ease;
        }
        .already-paid-card .image {
            background-color: #e0f2fe;
        }
        .success-card .image svg { color: #0afa2a; width: 2rem; height: 2rem; }
        .already-paid-card .image svg { color: #0ea5e9; width: 2rem; height: 2rem; }

        .success-card .content, .already-paid-card .content { margin-top: 0.75rem; text-align: center; }
        
        .success-card .title { color: #066e29; }
        .already-paid-card .title { color: #0c4a6e; }

        .success-card .title, .already-paid-card .title {
           font-size: 1rem; font-weight: 600; line-height: 1.5rem;
        }
        .success-card .message, .already-paid-card .message {
          margin-top: 0.5rem; color: #595b5f; font-size: 0.875rem; line-height: 1.25rem;
        }

        @keyframes animate-check {
          from { transform: scale(1); }
          to { transform: scale(1.09); }
        }
    `}</style>
      <div className="payment-container">{renderContent()}</div>
    </>
  );
}

export default Payment;
