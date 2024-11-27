import LoginPopup from "../../common/form/login/Loginpage";
import Partner2 from "../../common/partner/Partner2";
import FooterDefault from "/app/home/Footer";
import DefaulHeader from "/app/home/Header";
import MobileMenu from "../../header/MobileMenu";
// import Funfact from "../../fun-fact-counter/Funfact";
import ImgBox from "./ImgBox";
import IntroDescriptions from "./IntroDescriptions";
import CallToAction2 from "../../call-to-action/CallToAction3";
import Testimonial2 from "../../testimonial/Testimonial2";
import Block8 from "../../block/Block8";
import Breadcrumb from "../../common/Breadcrumb";
import Image from "next/image";
import Address from "./Address";
// import ContactForm from "./ContactForm";
import MapBox from "./MapBox";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>
      <span className="header-span"></span>
      

      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="About Us" meta="About Us" />
      {/* <!--End Page Title--> */}

      <section className="about-section-three">
        <div className="auto-container">
          <ImgBox />

          {/* <!-- Fun Fact Section --> */}
          {/* <div className="fun-fact-section">
            <div className="row">
              <Funfact />
            </div>
          </div> */}
          {/* <!-- Fun Fact Section --> */}

          <IntroDescriptions />
        </div>
      </section>
      {/* <!-- End About Section Three --> */}
{/* ------------------------------------------------------------------------------------------------ */}

      <section className="contact-section bg-gray-100">
        <div className="auto-container">
          <h2 className="text-center text-4xl font-extrabold mb-8 text-gray-800">
            Contact Details
          </h2>
          <div className="upper-box mt-1">
            <div className="row">
              <Address />
            </div>
            {/* End .row */}
          </div>
          {/* End upperbox */}
        </div>
      </section>

{/* ------------------------------------------------------------------------------------------------ */}
      <CallToAction2 />
      {/* <!-- End CallToAction2 --> */}

      <section className="testimonial-section-two">
        <div className="container-fluid">
          <div className="testimonial-left">
            <Image
              width={504}
              height={451}
              src="/images/resource/testimonial-left.png"
              alt="testimonial"
            />
          </div>
          {/* End left img group */}

          <div className="testimonial-right">
            <Image
              width={504}
              height={451}
              src="/images/resource/testimonial-right.png"
              alt="testimonial"
            />
          </div>
          {/* End right img group */}

          <div className="sec-title text-center">
            <h2>Testimonials From Our Customers</h2>
            <div className="text">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
            </div>
          </div>
          {/* <!-- Sec Title --> */}

          <div className="carousel-outer" data-aos="fade-up">
            <div className="testimonial-carousel">
              <Testimonial2 />
            </div>
            {/* <!-- Testimonial Carousel --> */}
          </div>
        </div>
      </section>
      {/* <!-- End Testimonial Section --> */}

      {/* <section className="map-section">
        <div className="map-outer">
          <MapBox />
        </div>
      </section> */}
      {/* <!-- End Map Section --> */}

     


      

        {/* <!-- Contact Form --> */}
          {/* <div className="contact-form default-form">
            <h3>Leave A Message</h3>
            <ContactForm />
          </div> */}
          {/* <!--End Contact Form --> */}


      <FooterDefault />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
