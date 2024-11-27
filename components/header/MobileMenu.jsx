"use client";

import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";

const MobileMenu = () => {
  return (
    // <!-- Main Header-->
    <header
      className="main-header main-header-mobile"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Transparent black background
        backdropFilter: "blur(20px)", // Apply blur for glass effect
        borderRadius: "15px",
        padding: "0px 0px", // Padding for inner spacing
        position: "fixed", // Make it floating
        top: "10px", // Floating from top
        left: "20px", // Floating from left
        right: "20px", // Floating from right
        zIndex: 1000, // Ensure it stays on top
        width: "auto",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow for elevation
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease", // Smooth transitions
      }}
    >
      <div className="auto-container">
        {/* Main box */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    width={120}
                    height={50}
                    src="/images-rotaract/ri3150-logo.png"
                    alt="ROTARACT3150 || SRIPTO"
                    className="h-auto mx-auto" // Tailwind for logo alignment and scaling
                  />
                </Link>
              </div>
            </div>
            {/* End logo-box */}

            {/* Mobile sidebar */}
            <MobileSidebar />
          </div>
          {/* End nav-outer */}

          <div className="outer-box">
            <div className="login-box">
              <a
                href="/register"
                className="call-modal"
              >
                <span className="icon icon-user"></span>
              </a>
            </div>
            {/* Login popup end */}

            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1"></span>
            </a>
            {/* Right hamburger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
