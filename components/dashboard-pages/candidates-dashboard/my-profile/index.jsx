
import MobileMenu from "/components/dashboard-pages/mobileheader";
import DashboardCandidatesSidebar from "/app/candidates-dashboard/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "/components/dashboard-pages/dashboardheader";
import MenuToggler from "../../MenuToggler";
import Achievements from "./components/career-data/Achievements";
import Social from "./components/my-profile/SocialNetworkBox";
import Education from "./components/career-data/Education";
import Experiences from "./components/career-data/Experiences";
import Skills from "./components/career-data/SkillsMultiple";



const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Profile!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profile</h4>
                  </div>
                  <MyProfile />
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
          </div>

        <div className=" dashboard-outer row ls-widget tabs-box form-group col-lg-12 col-md-12  ">
          <Education />
          {/* <!-- Resume / Education --> */}

          <Experiences />
          {/* <!-- Resume / Work & Experience --> */}
          <Achievements />

          <Skills/>

        </div>
        {/* <!--  education and word-experiences --> */}

        <div className=" dashboard-outer row ls-widget tabs-box form-group col-lg-12 col-md-12  ">
            <div className="widget-title">
                <h4>Social Links</h4>
            </div>
          <Social />

        </div>
        {/* <!--  education and word-experiences --> */}





          <div className="form-group col-lg-6 col-md-12">
            <button type="submit" className="theme-btn btn-style-one">
              Save
            </button>
          </div>
          {/* End .row */}
        </div>
        
        {/* End dashboard-outer */}
      </section>
      
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
