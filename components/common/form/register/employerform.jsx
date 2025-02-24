"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormContent2 = ({onClose}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    emailAddress: "",
    name: "",
    password: "",
    type: "Company",
    otp: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // API Base URL
  const URL = process.env.NEXT_PUBLIC_API_URL;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage(""); // Clear error when user types
  };

  // Handle OTP request
  const requestOTP = async (e) => {
    e.preventDefault();
    
    try {
      // First, request OTP
      const response = await axios.post(`${URL}/api/auth/send-otp`, {
        emailAddress: formData.emailAddress
      });
      
      console.log("OTP request response:", response);
      setSuccessMessage("OTP sent to your email!");
      setStep(2);
      setErrorMessage("");
    } catch (error) {
      console.log("Full error object:", error);
      console.log("Error response data:", error.response?.data);
      console.log("Error response status:", error.response?.status);

      if (error.response) {
        setErrorMessage(error.response.data.message || "Failed to send OTP");
      } else {
        setErrorMessage("Network error. Please check your connection");
      }
      setSuccessMessage("");
    }
  };

  // Handle final submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/api/auth/register-v2`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Full response:", response);
      console.log("Registration successful:", response.data);
      setSuccessMessage("Registration successful!");
      setErrorMessage("");

      setFormData({
        emailAddress: "",
        name: "",
        password: "",
        type: "Company",
        otp: ""
      });

      onClose();
    } catch (error) {
      console.log("Full error object:", error);
      console.log("Error response data:", error.response?.data);
      console.log("Error response status:", error.response?.status);

      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (error.response.data.message === "OTP not found or expired") {
              setErrorMessage("OTP has expired. Please request a new one");
            } else if (error.response.data.message === "Invalid OTP") {
              setErrorMessage("Invalid OTP. Please check and try again");
            } else if (error.response.data.message === "Email address already in use") {
              setErrorMessage("This email address is already registered");
            } else {
              setErrorMessage(error.response.data.message || "Validation error");
            }
            break;
          case 500:
            setErrorMessage("Server error. Please try again later");
            break;
          default:
            setErrorMessage("Registration failed. Please try again");
        }
      } else {
        setErrorMessage("Network error. Please check your connection");
      }
      setSuccessMessage("");
    }
  };

  return (
    <>
      {step === 1 ? (
        <form method="post" onSubmit={requestOTP}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              placeholder="Enter your Email Address"
              required
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              id="password-field"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {errorMessage && (
            <div className="form-group">
              <p style={{ color: "red" }}>{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className="form-group">
              <p style={{ color: "green" }}>{successMessage}</p>
            </div>
          )}

          <div className="form-group">
            <button className="theme-btn btn-style-one" type="submit">
              Request OTP
            </button>
          </div>
        </form>
      ) : (
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP sent to your email"
              required
              value={formData.otp}
              onChange={handleChange}
            />
          </div>

          {errorMessage && (
            <div className="form-group">
              <p style={{ color: "red" }}>{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className="form-group">
              <p style={{ color: "green" }}>{successMessage}</p>
            </div>
          )}

          <div className="form-group">
            <button 
              type="button" 
              className="theme-btn btn-style-one"
              onClick={() => {
                setStep(1);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              style={{ marginRight: '10px' }}
            >
              Back
            </button>
            <button className="theme-btn btn-style-one" type="submit">
              Register
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default FormContent2;