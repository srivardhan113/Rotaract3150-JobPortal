"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { pageItems } from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import LoginPopup from "@/components/common/form/login/LoginPopup";
// Adjust the import path accordingly

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [bgColor, setBgColor] = useState("rgba(0, 0, 0, 0.3)");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for modal visibility
  const pathname = usePathname();
  const isLoggedIn = !!sessionStorage.getItem("authToken");
  const router = useRouter();
  const type = sessionStorage.getItem("type");
  const [isRegister, setIsRegister] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'type=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'companyId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
      setBgColor("rgba(0, 0, 0, 0.3)");
    } else {
      setNavbar(false);
      setBgColor("rgba(0, 0, 0, 0.3)");
    }
  };

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const totalHeight = scrollHeight - clientHeight;

    const progress = (scrollTop / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    window.addEventListener("scroll", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", changeBackground);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  const shiningPinkStyle = {
    background: "linear-gradient(90deg, pink, white, silver)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
    transition: "0.3s ease",
  };

  return (
    <>
      <header
        className={`main-header -type-11 ${
          navbar ? "fixed-header animated slideInDown" : ""
        }`}
        style={{
          backgroundColor: bgColor,
          backdropFilter: navbar ? "blur(20px)" : "none",
          borderRadius: "15px",
          paddingTop: "-40px",
          paddingButton: "-40px",
          paddingLeft: "0px",
          paddingRight: "0px",
          position: "fixed",
          left: "20px",
          right: "20px",
          top: "20px",
          width: "auto",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
          zIndex: 1000,
        }}
      >
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    width={154}
                    height={50}
                    src="/images-rotaract/ri3150-logo.png"
                    alt="ROTARACT3150 || SRIPTO"
                  />
                </Link>
              </div>
            </div>

            <nav className="nav main-menu">
              <ul className="navigation" id="navbar">
                <li className={`${isActiveLink("/", pathname) ? "current" : ""}`}>
                  <Link href="/" className="underline-animation">
                    Home
                  </Link>
                </li>
                <li className={`${isActiveLink("/find-jobs", pathname) ? "current" : ""}`}>
                  <Link href="/job-list" className="underline-animation">
                    Find Jobs
                  </Link>
                </li>
                {type === "Company" && (
                  <li className={`${isActiveLink("/", pathname) ? "current" : ""}`}>
                    <Link href="/employers-dashboard" className="underline-animation">
                      Job Provider Dashboard
                    </Link>
                  </li>
                )}
                {type === "Applicant" && (
                  <li className={`${isActiveLink("/", pathname) ? "current" : ""}`}>
                    <Link href="/candidates-dashboard" className="underline-animation">
                      Job Seeker Dashboard
                    </Link>
                  </li>
                )}
                <li className={`${isActiveParentChaild(pageItems, pathname) ? "current" : ""} dropdown`}>
                  <span className="">More</span>
                  <ul>
                    {pageItems.map((item, i) => (
                      <li className={isActiveLink(item.routePath, pathname) ? "current" : ""} key={i}>
                        <Link href={item.routePath} className="underline-animation">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          <div className="outer-box">
            {!isLoggedIn ? (
              <div className="btn-box">
                <button
                  className="theme-btn btn-style-three btn-white-10 call-modal"
                  onClick={() => {setShowLoginPopup(true)
                    setIsRegister(false)
                  }} // Open the modal
                >
                  Login / Register
                </button>
                <Link href="/employers-dashboard/post-jobs" className="theme-btn btn-style-one btn-white">
                  Job Post
                </Link>
              </div>
            ) : (
              <div className="btn-box">
                <button
                  className="theme-btn btn-style-three btn-white-10 call-modal"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Progress Loader */}
        <div
          style={{
            height: "4px",
            backgroundColor: "#CE1266",
            width: `calc(${scrollProgress}% - 18px)`,
            position: "absolute",
            bottom: "1px",
            borderRadius: "5px",
            left: "9px",
            right: "9px",
            transition: "width 0.2s ease",
          }}
        ></div>
      </header>

      {/* Render the LoginPopup modal */}
      <LoginPopup show={showLoginPopup} onClose={() => setShowLoginPopup(false)} isRegister={isRegister}/>
    </>
  );
};

export default Header;