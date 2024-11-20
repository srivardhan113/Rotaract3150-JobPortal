import Image from "next/image";
import Link from "next/link";

const About9 = () => {
  return (
    <>
      {/* <!-- About Section --> */}
      <section className="about-section-two style-two layout-pt-60 layout-pb-60">
        <div className="auto-container">
          <div className="row justify-content-between align-items-center">
            {/* <!-- Image Column --> */}
            <div className="image-column -no-margin col-xl-6 col-lg-6 col-md-12 col-sm-12 wow fadeInRight">
              <div className="image-box -type-1">
                <figure
                  className="main-image"
                  data-aos-delay="500"
                  data-aos="fade-in"
                >
                  <Image
                    width={570}
                    height={558}
                    src="/images-rotaract/home-about.png"
                    alt="resource"
                  />
                </figure>

                {/* <!-- Info BLock One --> */}
                <div
                  className="info_block"
                  data-aos-delay="800"
                  data-aos="fade-in"
                >
                  <span className="icon flaticon-email-3"></span>
                  <p>
                    Get your dream Job <br />
                    Through Rotaract 3150
                  </p>
                </div>

                {/* <!-- Info BLock Two --> */}
                <div
                  className="info_block_two"
                  data-aos-delay="1100"
                  data-aos="fade-in"
                >
                  <p>For the People <br/> By the People</p>
                  <div className="image">
                    <Image
                      width={206}
                      height={53}
                      src="/images/resource/multi-peoples.png"
                      alt="resource"
                    />
                  </div>
                </div>

                {/* <!-- Info BLock Four --> */}
                <div
                  className="info_block_four"
                  data-aos-delay="1300"
                  data-aos="fade-in"
                >
                  <span className="icon flaticon-file"></span>
                  <div className="inner">
                    <p>Apply Now</p>
                    <span className="sub-text">
                      Every Near to achieve your Dream
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* End img-column */}

            {/* <!-- Content Column --> */}
            <div className="content-column mb-0 col-xl-5 col-lg-6 col-md-12 col-sm-12">
              <div data-aos="fade-right">
                <div className="sec-title">
                  <h2 className="fw-700">
                  Discover the Rotaract 3150 Career Hub
                  </h2>
                  <div className="text mt-30">
                  The Rotaract 3150 Job Portal connects Rotaract members with leading companies offering exciting career opportunities. It empowers members to showcase their skills, apply for jobs, and build professional networks, all while serving the community. For companies, it provides a platform to post job openings and access a talented pool of passionate and driven individuals. Join us today to unlock a world of opportunities!
                  </div>
                </div>
                <Link
                  href="/candidates-dashboard/cv-manager"
                  className="theme-btn btn-style-one"
                >
                  Job Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End About Section -->  */}
    </>
  );
};

export default About9;
