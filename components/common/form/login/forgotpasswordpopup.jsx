import React from 'react';
import ForgotPassword from '../forgotpassword';
 // Import the ForgotPassword component

const ForgotPasswordPopup = ({ show, onClose }) => {
  if (!show) return null; // Don't render if not visible

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1040,
        }}
      />

      {/* Modal */}
      <div 
        className="modal fade show" 
        style={{ 
          display: 'block',
          position: 'fixed',
          zIndex: 1050,
          overflow: 'auto'
        }} 
        onClick={onClose} 
        id="loginPopupModal"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered login-modal modal-dialog-scrollable">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onClose}
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            >
              &times;
            </button>

            <div className="modal-body">
              <div id="login-modal">
                <div className="login-form default-form">
                  <ForgotPassword onClose={onClose} /> {/* Only show ForgotPassword */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPopup;