'use client'

import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import Loginform from "./loginform";
import Link from "next/link";

const Loginpage = () => {
  const [userType, setUserType] = useState("Applicant");

  return (
    <div className="form-inner">
      <h3 className="text-center pt-4">Login to Rotaract3150 - Job Portal</h3>

      <Tabs selectedIndex={userType === "Applicant" ? 0 : 1} onSelect={(index) => setUserType(index === 0 ? "Applicant" : "Company")}>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate (Job Seeker)
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Employer (Job Provider)
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <Loginform userType={userType} />
        </TabPanel>
        {/* End candidates Form */}

        <TabPanel>
          <Loginform userType={userType} />
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Don't have an account?{" "}
          <Link href="/register" className="call-modal login">
            Register
          </Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Loginpage;