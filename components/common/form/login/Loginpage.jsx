'use client'

import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import Loginform from "./loginform";
import Link from "next/link";

import LoginPopup from "./LoginPopup";

const Loginpage = ({onClose,ForgotPassword}) => {
  const [userType, setUserType] = useState("Applicant");
 
  const [isRegister, setIsRegister] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); 
  return (
    <div className="form-inner">
      <h3 className="text-center pt-4">Login to Rotaract3150 - Job Portal</h3>

      <Tabs selectedIndex={userType === "Applicant" ? 0 : 1} onSelect={(index) => setUserType(index === 0 ? "Applicant" : "Company")}>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate 
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Employer 
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <Loginform userType={userType} onClose={onClose} Forgot={ForgotPassword} />
        </TabPanel>
        {/* End candidates Form */}

        <TabPanel>
          <Loginform userType={userType} onClose={onClose}  Forgot={ForgotPassword}/>
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Don't have an account?{" "}
          <button onClick={() =>{ setShowLoginPopup(true)
            setIsRegister(true)
          }} className="call-modal login">
            Register
          </button>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial userType={userType} />
      </div>
      
      <LoginPopup show={showLoginPopup} onClose={() => setShowLoginPopup(false)} isRegister={isRegister}/>
    </div>
  );
};

export default Loginpage;