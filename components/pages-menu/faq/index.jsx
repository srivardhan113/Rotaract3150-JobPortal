import Breadcrumb from "../../common/Breadcrumb";
// import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "/app/home/Footer";
import DefaulHeader from "/app/home/Header";
import MobileMenu from "../../header/MobileMenu";
import Faqrotaract from "./Faq-rotaract";
import Faqjob from "./Faq-jobportal";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Frequently Asked Questions" meta="Faq's" />
      {/* <!--End Page Title--> */}

      <section className="faqs-section">
        <div className="auto-container">
          {/* <div className="sec-title text-center">
            <h2>Frequently Asked Questions</h2>
            <div className="text">Home / Faq</div>
          </div> */}

          <h3>About Rotaract 3150</h3>
          {/* <!--Accordian Box--> */}
          <ul className="accordion-box">
            <Faqrotaract />
          </ul>

          <h3>About Job Portal</h3>
          {/* <!--Accordian Box--> */}
          <ul className="accordion-box mb-0">
            <Faqjob />
          </ul>
        </div>
      </section>
      {/* <!-- End Faqs Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
