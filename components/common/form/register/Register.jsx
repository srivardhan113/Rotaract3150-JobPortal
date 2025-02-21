
'use client'

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import FormContent1 from "./candiateform";
import FormContent2 from "./employerform";
import Link from "next/link";
import { useState } from "react";
import LoginPopup from "../login/LoginPopup";
const Register2 = ({onClose}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false); 
    const [userType, setUserType] = useState("Applicant");
  return (
    <div className="form-inner ">
      
       <h3 className="text-center">Register to Rotaract3150 - Job Portal</h3>

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
          <FormContent1 onClose={onClose} />
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <FormContent2 onClose={onClose}/>
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <button onClick={onClose}>
            LogIn
            </button>
        </div>
        <div className="divider ">
          <span>or</span>
        </div>
        {/* <LoginWithSocial /> */}
        <LoginWithSocial userType={userType} />
      </div>
      {/* End bottom-box LoginWithSocial */}
      <LoginPopup show={showLoginPopup} onClose={() => setShowLoginPopup(false)} isRegister={isRegister}/>
    </div>
  );
};

export default Register2;
