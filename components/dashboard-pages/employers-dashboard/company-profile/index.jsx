import MobileMenu from "/components/dashboard-pages/mobileheader";
import DashboardHeader from "/components/dashboard-pages/dashboardheader";
import LoginPopup from "../../../common/form/login/Loginpage";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";

const index = () => {
    return (
        <div className="page-wrapper dashboard">
            <span className="header-span"></span>
            {/* <!-- Header Span for height --> */}

            {/* <LoginPopup /> */}
            {/* End Login Popup Modal */}

            <DashboardHeader />
            {/* End Header */}

            <MobileMenu />
            {/* End MobileMenu */}

            <DashboardEmployerSidebar />
            {/* <!-- End User Sidebar Menu --> */}

            {/* <!-- Dashboard --> */}
            <section className="user-dashboard">
                <div className="dashboard-outer">
                    <BreadCrumb title="Company Profile!" />
                    {/* breadCrumb */}

                    <MenuToggler />
                    {/* Collapsible sidebar button */}

                    <div className="row">
                        <div className="col-lg-12">
                            {/* Consolidated Form */}
                            <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>My Profile</h4>
                                    </div>
                                    <MyProfile />
                                    {/* My Profile Content */}
                                  
                           
                                    <div className="widget-title">
                                        <h4>Social Network</h4>
                                    </div>
                                    {/* Social Network Content */}
                                    <div className="widget-content">
                                        <SocialNetworkBox />
                                    </div>
        
                                    <div className="widget-title">
                                        <h4>Address</h4>
                                    </div>
                                    {/* Contact Information Content */}
                                    <div className="widget-content">
                                        <ContactInfoBox />
                                    </div>
                                </div>
                            </div>
                            {/* End Contact Information */}

                            {/* Save Button */}
                            <div className="text-center mt-4">
                                <button className="theme-btn btn-style-one">
                                    Save
                                </button>
                            </div>


                            
                        </div>
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
