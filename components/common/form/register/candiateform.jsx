import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormContent = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    emailAddress: "",
    name: "",
    password: "",
    type: "Applicant",
    otp: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error messages when user starts typing
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Name is required");
      return false;
    }
    if (!formData.emailAddress.trim()) {
      setErrorMessage("Email address is required");
      return false;
    }
    if (!formData.password.trim()) {
      setErrorMessage("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const requestOTP = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${URL}/api/auth/send-otp`, {
        emailAddress: formData.emailAddress
      });
      
      setSuccessMessage("OTP sent to your email!");
      setStep(2);
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage(error.response.data.message || "Invalid email address");
            break;
          case 429:
            setErrorMessage("Too many OTP requests. Please try again later");
            break;
          case 500:
            setErrorMessage("Server error. Please try again later");
            break;
          default:
            setErrorMessage("Failed to send OTP. Please try again");
        }
      } else {
        setErrorMessage("Network error. Please check your connection");
      }
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.otp.trim()) {
      setErrorMessage("OTP is required");
      return;
    }

    try {
      const response = await axios.post(`${URL}/api/auth/register-v2`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      console.log("Registration successful:", response.data);
      setSuccessMessage("Registration successful!");
      setErrorMessage("");

      setFormData({
        emailAddress: "",
        name: "",
        password: "",
        type: "Applicant",
        otp: ""
      });
      console.log(response.data);      
      onClose();
    } catch (error) {
      console.log(error)
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
        <form onSubmit={requestOTP}>
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
        <form onSubmit={handleSubmit}>
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

export default FormContent;