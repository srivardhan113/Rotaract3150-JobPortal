"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`main-header ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/" className="noSticky">
                  <Image
                    width={154}
                    height={50}
                    src="/images-rotaract/ri3150-logo.png"
                    alt="logo"
                    title="brand"
                  />
                </Link>
                <Link href="/" className="isSticky">
                  <Image
                    width={154}
                    height={50}
                    src="/images-rotaract/ri3150-logo.png"
                    alt="logo"
                    title="brand"
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* End nav-outer */}

          <div className="outer-box flex justify-between items-center">
            {/* <!-- Left Side (Hi, Sri Vardhan Yeluri) --> */}
            <div className="welcome-message text-4xl text-gray-800">
              Hi, Sri Vardhan Yeluri
            </div>

            {/* <!-- Login/Register Button --> */}
            <div className="btn-box">
              <Link href="/contact" className="theme-btn btn-style-one">
                <span className="btn-title">Contact Us!!</span>
              </Link>
            </div>
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default Header;
