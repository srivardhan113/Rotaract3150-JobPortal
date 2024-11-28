"use client"

import Login from "../../common/form/login/Loginpage";
import MobileMenu from "../../header/MobileMenu";
import Header from "./Header";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";// Ensure CSS is imported

import { useEffect } from "react";

const index = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="login-section">
        <div className="image-layer">
          <div className="image-box">
            <div className="row">
              <div
                className="column col-lg-6 col-md-6 col-sm-12"
                data-aos-delay="1500"
                data-aos="fade-right"
              >
                <figure className="image">
                  <Image
                    width={317}
                    height={449}
                    src="/images/hero/1-hero.jpg"
                    alt="resource"
                  />
                </figure>
              </div>
              <div
                className="column col-lg-6 col-md-6 col-sm-12"
                data-aos-delay="2000"
                data-aos="fade-left"
              >
                <figure className="image">
                  <Image
                    width={317}
                    height={302}
                    src="/images/hero/2-hero.jpg"
                    alt="resource"
                  />
                </figure>
                <figure className="image">
                  <Image
                    width={317}
                    height={302}
                    src="/images/hero/3-hero.jpg"
                    alt="resource"
                  />
                </figure>
              </div>
            </div>
            <div className="info_block" data-aos-delay="2500" data-aos="fade-in">
              <span className="icon flaticon-email-3"></span>
              <p>
                Send your Resume!! <br />
                Get the Chance!!
              </p>
            </div>
          </div>
        </div>

        <div className="outer-box">
          <div className="login-form default-form">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
