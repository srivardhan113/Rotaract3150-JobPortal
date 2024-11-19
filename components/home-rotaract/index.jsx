import About9 from "../about/About9";
import AppSection3 from "../app-section/AppSection3";
import Block8 from "../block/Block8";
import RegBanner from "../block/RegBanner";
import LoginPopup from "../common/form/login/LoginPopup";
import CallToAction6 from "../call-to-action/CallToAction6";
import Partner2 from "../common/partner/Partner2";
import MobileMenu from "../header/MobileMenu";
import Hero13 from "../hero/hero-13";
import JobCategorie1 from "../job-categories/JobCategorie1";
import JobFeatured9 from "../job-featured/JobFeatured9";
// import Pricing3 from "../pricing/Pricing3";
// import TopCompany from "../top-company/TopCompany";
import Header from "./Header";
import Footer from "./Footer";

const index = () => {
  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero13 />
      {/* End Hero Section */}


{/* ----------------------------------------------------------------------------------------------------------------- */}


      <section className="job-categories style-two" style={{ backgroundColor: '#ffffff' }}>
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Popular Job Categories - Jobs Live</h2>
            <div className="text">Rotaract 3150</div>
          </div>

          <div
            className="row "
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {/* <!-- Category Block --> */}
            <JobCategorie1 />
          </div>
        </div>
      </section>
      {/* End Job Categorie Section */}

{/* ----------------------------------------------------------------------------------------------------------------- */}


      <section className="layout-pt-120 layout-pb-120">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>How It Works</h2>
            <div className="text">
            The Rotaract 3150 Job Portal connects members with job opportunities and employers seamlessly.
            </div>
          </div>
          {/* End sec-title */}

          <div className="row grid-base pt-50" data-aos="fade-up">
            <Block8 />
            {/* <!-- Work Block --> */}
          </div>
        </div>
      </section>
      {/* <!-- End Work Section --> */}

{/* ----------------------------------------------------------------------------------------------------------------- */}


      <About9 />
      {/* <!-- End About Section --> */}

{/* ----------------------------------------------------------------------------------------------------------------- */}

      <section className="layout-pt-60 layout-pb-60">
        <div className="auto-container">
          <div className="featured-column">
            <div className="sec-title text-center">
              <h2 className="color-blue-dark fw-700">Latest Jobs</h2>
              <div className="text">
                Know your worth and find the job that qualify your life
              </div>
            </div>
            {/* End .sec-title */}
          </div>
          {/* End .featured-column */}

          <div
            className="outer-box job-block-five-separated"
            data-aos="fade-up"
          >
            <JobFeatured9 />
          </div>
          {/* End outer-box */}
        </div>
      </section>
      {/* <!-- End Job Section --> */}

{/* ----------------------------------------------------------------------------------------------------------------- */}

      <section className="layout-pt-60 layout-pb-60">
        <div className="auto-container">
          <div className="row" data-aos="fade-up">
            <RegBanner />
          </div>
        </div>
      </section>
      {/* <!-- End Registeration Banners --> */}


 {/* ----------------------------------------------------------------------------------------------------------------- */}
      
{/* 
      <section className="ayout-pt-60 layout-pb-60">
        <div className="auto-container">
          <div className="row justify-content-between align-items-end">
            <div className="col-lg-6">
              <div className="sec-title mb-0">
                <h2 className="color-blue-dark fw-700">
                  Top Company Registered
                </h2>
                <div className="text">
                  Some of the companies we have helped recruit excellent
                  applicants over the years.
                </div>
              </div>
            </div>
            {/* End .col */}

            {/* <div className="col-auto">
              <a href="#" className="button -arrow text-dark-blue">
                Browse
                <span className="fa fa-angle-right ms-1"></span>
              </a>
            </div>
          </div>
          {/* End .row */}

          {/* <div className="carousel-outer pt-50" data-aos="fade-up">
            <div className="companies-carousel">
              <TopCompany />
            </div>
          </div>
        </div>
      </section> */}
      {/* <!-- End Top Companies --> */}
{/* 
      <section className="layout-pt-60 layout-pb-120">
        <div className="auto-container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="sec-title -type-2 text-center">
                <h2>Choose a plan that’s right for you.</h2>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                </div>
              </div>
            </div>
          </div> */}
          {/* End .row */}

          {/* <div className="row grid-base pricing3_hover" data-aos="fade-up">
            <Pricing3 />
          </div> */}
          {/* End .row */}
        {/* </div>
      </section> */}
      {/* <!-- End Pricing Section --> */}

{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* <AppSection3 /> */}
      {/* <!-- End App Section --> */}

{/* ----------------------------------------------------------------------------------------------------------------- */}


      <section className="clients-section-two alternate layout-pt-120 layout-pb-60">
        <div className="auto-container">
        <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="sec-title -type-2 text-center">
                <h2>Top Recruiters of Rotaract 3150</h2>
                <div className="text">
                Explore career opportunities with top recruiters partnered with Rotaract 3150, connecting talent with impactful organizations.
                </div>
              </div>
            </div>
          </div> 
          <div className="sponsors-outer wow fadeInUp">
            <div className="sponsors-carousel">
              <Partner2 />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Clients Section --> */}

{/* ----------------------------------------------------------------------------------------------------------------- */}

      <CallToAction6 />


{/* ----------------------------------------------------------------------------------------------------------------- */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
