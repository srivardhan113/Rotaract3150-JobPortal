import React from 'react';

const RoleSwitchWarningPopup = ({ show, onClose, onConfirm ,usertype}) => {
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
        id="roleSwitchWarningModal"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onClose}
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            >
              &times;
            </button>

            <div className="modal-body text-center">
              <h5>Warning</h5>
              <p>{`You are about to switch roles and log out,you have to relogin as ${usertype} .Do you want to proceed?`}</p>
              <div className="modal-footer justify-content-center">
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={onConfirm}
                >
                  Yes
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={onClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleSwitchWarningPopup;