import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1 for email input, 2 for OTP input and new password
const[errormessage,seterrormessage]=useState(false);
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend.rotaracthub.in/api/auth/send-otp', { emailAddress: email });
      console.log(response.data.message);
      setStep(2); // Move to OTP input
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically verify the OTP with your backend
      const response = await axios.post('https://backend.rotaracthub.in/api/auth/update-password-byotp', { emailAddress: email, otp ,NewPassword:newPassword});
      console.log(response.data.message);
      // If OTP is verified successfully, you can proceed to reset the password
      // For demonstration, we'll assume the OTP verification is successful
      // Move to new password input
      if(response.status==200){
        onClose();
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      seterrormessage(true);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="modal-body">
      <div id="forgot-password-modal">
        <div className="forgot-password-form default-form">
          {step === 1 ? (
            <form onSubmit={handleEmailSubmit}>
              <h2 className="fw-semibold text-center fs-4 mb-2">Forgot Password</h2>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="theme-btn btn-style-one w-100">Send OTP</button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <h2 className="fw-semibold text-center  fs-4 mb-2">Enter OTP and New Password</h2>
              <div className="form-group">
                <label>OTP:</label>
                <input
                  type="text"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <label>New Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {
                errormessage&&<div className='text-danger'>
                    Try Once Again 
                </div>
              }
              <button type="submit" className="theme-btn btn-style-one w-100">Verify OTP and Reset Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;