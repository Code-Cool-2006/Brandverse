import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm({ onLogin }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // API call to login endpoint
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Call parent login handler if provided
        if (onLogin) {
          onLogin(data.user);
        }

        // Navigate to dashboard or home page
        navigate("/user-dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // API call to register endpoint
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message instead of auto-login
        setSuccess(
          "Registration successful! Please login with your credentials."
        );

        // Clear form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Switch to login mode
        setIsRegister(false);

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: "Poppins", sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .container {
            width: 850px;
            height: 450px;
            background: #fff;
            border-radius: 30px;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
            display: flex;
            overflow: hidden;
            position: relative;
          }

          .forms-panel {
            flex: 0 0 500px;
            order: 1;
            overflow: hidden;
            position: relative;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .side-panel {
            flex: 0 0 350px;
            order: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40px;
            background: #7494ec;
            color: #fff;
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* State when Register is active */
          .container.shifted .forms-panel {
            order: 2;
          }

          .container.shifted .side-panel {
            order: 1;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          .form-track {
            display: flex;
            width: 200%;
            height: 100%;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .container.shifted .form-track {
            transform: translateX(-50%);
          }

          .form-box {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            text-align: center;
            box-sizing: border-box;
          }

          .form-box h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 30px;
            color: #333;
          }

          .input-box {
            position: relative;
            margin: 20px 0;
            width: 100%;
          }

          .input-box input {
            width: 100%;
            padding: 13px 50px 13px 20px;
            background: #f5f5f5;
            border-radius: 8px;
            border: 2px solid transparent;
            outline: none;
            font-size: 16px;
            font-family: "Poppins", sans-serif;
            color: #333;
            transition: border-color 0.3s ease;
          }

          .input-box input:focus {
            border-color: #7494ec;
            background: #fff;
          }

          .input-box input.error {
            border-color: #e74c3c;
          }

          .input-box input::placeholder {
            color: #888;
            font-weight: 400;
          }

          .input-box i {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #555;
          }

          .btn {
            width: 100%;
            height: 48px;
            background: #7494ec;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: #fff;
            font-weight: 600;
            margin-top: 10px;
            transition: 0.3s;
            font-family: "Poppins", sans-serif;
            position: relative;
            overflow: hidden;
          }

          .btn:hover:not(:disabled) {
            background: #5a78d0;
          }

          .btn:disabled {
            background: #bdc3c7;
            cursor: not-allowed;
          }

          .btn.loading::after {
            content: "";
            position: absolute;
            width: 16px;
            height: 16px;
            top: 50%;
            left: 50%;
            margin-left: -8px;
            margin-top: -8px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s ease-in-out infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          /* Side-panel buttons */
          .side-panel .btn {
            width: 160px;
            background: transparent;
            border: 2px solid #fff;
            color: #fff;
          }

          .side-panel .btn:hover {
            background: #fff;
            color: #7494ec;
          }

          .error-message {
            background: #e74c3c;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
            text-align: center;
          }

          .success-message {
            background: #2ecc71;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
            text-align: center;
          }

          /* Mobile styles */
          @media screen and (max-width: 650px) {
            .container {
              flex-direction: column;
              height: 100vh;
              width: 100%;
              border-radius: 0;
            }
            .forms-panel {
              flex: 0 0 50vh;
              order: 2;
            }
            .side-panel {
              flex: 0 0 50vh;
              order: 1;
              border-bottom-right-radius: 0;
              border-bottom-left-radius: 0;
            }
            .container.shifted {
                flex-direction: column;
            }
            .container.shifted .forms-panel {
                order: 1;
            }
            .container.shifted .side-panel {
                order: 2;
                border-top-right-radius: 0;
                border-top-left-radius: 0;
            }
          }
        `}
      </style>
      <div className={`container ${isRegister ? "shifted" : ""}`}>
        <div className="forms-panel">
          <div className="form-track">
            <form className="form-box" onSubmit={handleLoginSubmit}>
              <h1>Login</h1>
              {error && <div className="error-message">{error}</div>}
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <i className="fa-solid fa-lock"></i>
              </div>
              <button
                type="submit"
                className={`btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <form className="form-box" onSubmit={handleRegisterSubmit}>
              <h1>Register</h1>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <i className="fa-solid fa-lock"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <i className="fa-solid fa-lock"></i>
              </div>
              <button
                type="submit"
                className={`btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>
            </form>
          </div>
        </div>
        <div className="side-panel">
          {isRegister ? (
            <>
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button className="btn" onClick={() => setIsRegister(false)}>
                Login
              </button>
            </>
          ) : (
            <>
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button className="btn" onClick={() => setIsRegister(true)}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AuthForm;
