
'use client'

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import FormContent1 from "./candiateform";
import FormContent2 from "./employerform";
import Link from "next/link";

const Register2 = () => {
  return (
    <div className="form-inner r">
      
       <h3 className="text-center pt-4">Create a Free Account for Rotaract3150 - Job Portal</h3>

      <Tabs>
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
          <FormContent1 />
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <FormContent2 />
        </TabPanel>
        {/* End Employer Form */}
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link href="/login" className="call-modal login">
            LogIn
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

export default Register2;
