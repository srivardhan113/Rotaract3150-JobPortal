'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { pageItems } from "../../data/mainMenuData";
import { isActiveParent, isActiveLink, isActiveParentChaild } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const pathname = usePathname(); // Used to determine the active route

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground); // Cleanup listener
  }, []);

  return (
    <header
      className={`main-header -type-11 ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="main-box">
        {/* Logo Section */}
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

          {/* Navigation Menu */}
          <nav className="nav main-menu">
            <ul className="navigation" id="navbar">
              {/* Home */}
              <li className={`${isActiveLink("/", pathname) ? "current" : ""}`}>
                <Link href="/">Home</Link>
              </li>

              {/* Find Jobs */}
              <li className={`${isActiveLink("/find-jobs", pathname) ? "current" : ""}`}>
                <Link href="/job-list">Find Jobs</Link>
              </li>

              {/* Employers */}
              <li className={`${isActiveLink("/", pathname) ? "current" : ""}`}>
                <Link href="/employers-dashboard">Job Provider Dashboard</Link>
              </li>

              {/* Candidates */}
              <li className={`${isActiveLink("/", pathname) ? "current" : ""}`}>
                <Link href="/candidates-dashboard">Job Seeker Dashboard</Link>
              </li>

              {/* Blog */}
              {/* <li className={`${isActiveLink("/blog", pathname) ? "current" : ""}`}>
                <Link href="/blog">Blog</Link>
              </li> */}

              {/* Pages Dropdown */}
              <li
                className={`${
                  isActiveParentChaild(pageItems, pathname) ? "current" : ""
                } dropdown`}
              >
                <span>More</span>
                <ul>
                  {pageItems.map((item, i) => (
                    <li
                      className={isActiveLink(item.routePath, pathname) ? "current" : ""}
                      key={i}
                    >
                      <Link href={item.routePath}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        {/* Login/Register and Job Post Buttons */}
        <div className="outer-box">
          <div className="btn-box">
            <a
              href="/register"
              className="theme-btn btn-style-three btn-white-10 call-modal"
              // data-bs-toggle="modal"
              // data-bs-target="#loginPopupModal"
            >
              Login / Register
            </a>
            <Link
              href="/employers-dashboard/post-jobs"
              className="theme-btn btn-style-one btn-white"
            >
              Job Post
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
