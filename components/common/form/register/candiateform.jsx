"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import LoginPopup from "../login/LoginPopup";

const FormContent = ({onClose}) => {
  const [formData, setFormData] = useState({
    emailAddress: "",
    name: "",
    password: "",
    type: "Applicant",
  });
  // const [isRegister, setIsRegister] = useState(false);
  // const [showLoginPopup, setShowLoginPopup] = useState(false); 
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
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      // API Call
      const response = await axios.post(`${URL}/api/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // On success
      console.log("Registration successful:", response.data);
      setSuccessMessage("Registration successful!");
      setErrorMessage(""); // Clear previous error messages

      // Clear form inputs
      setFormData({
        emailAddress: "",
        name: "",
        password: "",
        type: "Applicant",
      });
      onClose();
      // setShowLoginPopup(true)
      //       setIsRegister(false)
      
    } catch (error) {
      // On failure
      console.error("Registration failed:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setSuccessMessage(""); // Clear previous success messages
    }
  };

  return (<>
    <form onSubmit={handleSubmit}>
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
          Register
        </button>
      </div>
    </form>
    {/* <LoginPopup show={showLoginPopup} onClose={() => setShowLoginPopup(false)} isRegister={isRegister}/> */}
    </>
  );
};

export default FormContent;
