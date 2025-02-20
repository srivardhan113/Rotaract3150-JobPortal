// CustomCheckbox.jsx
import React from 'react';
import Link from 'next/link';

const CustomCheckbox = ({ accepted, onChange }) => {
  return (
    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
      <div className="input-group ms-2">
        <input
          type="checkbox"
          id="rememberMe"
          checked={accepted}
          onChange={onChange}
          className="custom-checkbox-input mt-2"
        />
        <label htmlFor="rememberMe" className="remember">
          <span className="custom-checkbox"></span> Please accept our{" "}
          <span data-bs-dismiss="modal">
            <Link href="/terms" className='ps-1'>  terms and conditions </Link>
          </span>
        </label>
      </div>

      <style jsx>{`
        .custom-checkbox-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .remember {
          position: relative;
          padding-left: 35px;
          cursor: pointer;
          display: flex;
          align-items: center;
          user-select: none;
          font-size: 16px;
        }

        .custom-checkbox {
          position: absolute;
          top: 5;
          left:0;
          height: 19px;
          width: 19px;
          border: 2px solid #c42c2c;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .custom-checkbox-input:checked ~ .remember .custom-checkbox {
          background-color: #e83737;
          border-color: #ff69b4;
        }

        .custom-checkbox:after {
          content: '';
          position: absolute;
          display: none;
          left: 6px;
          top: 2px;
          width: 4px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .custom-checkbox-input:checked ~ .remember .custom-checkbox:after {
          display: block;
        }

        .remember:hover .custom-checkbox {
          border-color: #ff69b4;
        }

        .remember a {
          color: #ff69b4;
          text-decoration: none;
        }

        .remember a:hover {
          text-decoration: underline;
        }

      `}</style>
    </div>
  );
};

export default CustomCheckbox;