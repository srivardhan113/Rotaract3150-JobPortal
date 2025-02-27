"use client";

import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from 'cookies-next';
import LoginPopup from "@/components/common/form/login/LoginPopup";
import ForgotPasswordPopup from "@/components/common/form/login/forgotpasswordpopup";
import RoleSwitchWarningPopup from "@/components/common/form/popupwarning";
const MobileMenu = () => {
  const [navbar, setNavbar] = useState(false);
  const [bgColor, setBgColor] = useState("rgba(0, 0, 0, 0.4)");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showForgetPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isRoleSwitching, setIsRoleSwitching] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [type, setType] = useState("");
  
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  // Initialize auth state from cookies on client-side only
  useEffect(() => {
    const authToken = getCookie('authToken');
    const userType = getCookie('type');
    
    setIsLoggedIn(!!authToken);
    setType(userType || "");
  }, []);
  
  const handleLogout = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    sessionStorage.clear();
    // Clear cookies
    deleteCookie('authToken', { path: '/' });
    deleteCookie('type', { path: '/' });
    deleteCookie('userId', { path: '/' });
    deleteCookie('companyId', { path: '/' });
    
    // Update state
    setIsLoggedIn(false);
    setType("");
    setDropdownOpen(false);
    
    router.push('/');
    window.location.reload();
  };
  
  const handleRoleSwitch = async () => {
    try {
      setIsRoleSwitching(true);
      const userId = getCookie('userId');
      const authToken = getCookie('authToken');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/switchRole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          userId: userId,
          type: type === "Company" ? "Applicant" : "Company"
        })
      });
  
      const data = await response.json();
      
      if (response.ok) {
        setShowWarning(false);
        handleLogout({ preventDefault: () => {} });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error switching role:', error);
    } finally {
      setIsRoleSwitching(false);
    }
  };
  
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
      setBgColor("rgba(0, 0, 0, 0.4)");
    } else {
      setNavbar(false);
      setBgColor("rgba(0, 0, 0, 0.4)");
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

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <header
        className={`main-header main-header-mobile ${
          navbar ? "fixed-header animated slideInDown" : ""
        }`}
        style={{
          backgroundColor: bgColor,
          backdropFilter: "blur(20px)",
          borderRadius: "15px",
          padding: "0px 0px",
          position: "fixed",
          top: "10px",
          left: "20px",
          right: "20px",
          zIndex: 1000,
          width: "auto",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        <div className="auto-container">
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
                      className="h-auto mx-auto"
                    />
                  </Link>
                </div>
              </div>
              
              {/* Mobile sidebar */}
              <MobileSidebar isLoggedIn={isLoggedIn} userType={type} />
            </div>

            <div className="outer-box">
              <div className="login-box">
                {!isLoggedIn ? (
                  <a
                    href="#"
                    className="call-modal"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLoginPopup(true);
                      setIsRegister(false);
                    }}
                  >
                    <span className="icon icon-user"></span>
                  </a>
                ) : (
                  <div className="user-actions" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Custom dropdown with explicit toggle */}
                    <div ref={dropdownRef} style={{ position: 'relative' }}>
                      <a href="#" onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="icon icon-user"></span>
                      </a>
                      
                      {dropdownOpen && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          width: '150px',
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          zIndex: 1001,
                          marginTop: '10px'
                        }}>
                          {type === "Company" && (
                            <Link 
                              href="/employers-dashboard" 
                              style={{ 
                                display: 'block', 
                                padding: '10px 15px', 
                                color: '#333',
                                textDecoration: 'none',
                                borderBottom: '1px solid #eee' 
                              }}
                              onClick={() => setDropdownOpen(false)}
                            >
                              Dashboard
                            </Link>
                          )}
                          
                          {type === "Applicant" && (
                            <Link 
                              href="/candidates-dashboard" 
                              style={{ 
                                display: 'block', 
                                padding: '10px 15px', 
                                color: '#333',
                                textDecoration: 'none',
                                borderBottom: '1px solid #eee' 
                              }}
                              onClick={() => setDropdownOpen(false)}
                            >
                              Dashboard
                            </Link>
                          )}
                          
                          <a 
                            href="#" 
                            style={{ 
                              display: 'block', 
                              padding: '10px 15px', 
                              color: '#333',
                              textDecoration: 'none',
                              borderBottom: '1px solid #eee' 
                            }} 
                            onClick={(e) => {
                              e.preventDefault();
                              setShowWarning(true);
                              setDropdownOpen(false);
                            }}
                          >
                            Switch Role
                          </a>
                          
                          <a 
                            href="#" 
                            style={{ 
                              display: 'block', 
                              padding: '10px 15px', 
                              color: '#333',
                              textDecoration: 'none' 
                            }} 
                            onClick={(e) => {
                              handleLogout(e);
                              setDropdownOpen(false);
                            }}
                          >
                            Logout
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {type === "Company" && (
                      <Link 
                        href="/employers-dashboard/post-jobs" 
                        style={{ 
                          display: 'flex', 
                          marginLeft: '15px', 
                          backgroundColor: '#CE1266',
                          color: 'white',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>+</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>

              <a
                href="#"
                className="mobile-nav-toggler"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
              >
                <span className="flaticon-menu-1"></span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Progress Loader */}
        <div
          style={{
            height: "4px",
            backgroundColor: "#CE1266",
            width: `${scrollProgress}%`,
            position: "absolute",
            bottom: "1px",
            borderRadius: "5px",
            left: "9px",
            right: "9px",
            transition: "width 0.2s ease",
          }}
        ></div>
      </header>
      
      {/* Popups */}
      <LoginPopup 
        show={showLoginPopup} 
        onClose={() => setShowLoginPopup(false)} 
        isRegister={isRegister} 
        isForgotPassword={setShowForgotPasswordPopup}
      />
      
      <ForgotPasswordPopup 
        show={showForgetPasswordPopup} 
        onClose={() => setShowForgotPasswordPopup(false)} 
      />
      
      <RoleSwitchWarningPopup
        show={showWarning} 
        onClose={() => setShowWarning(false)} 
        onConfirm={handleRoleSwitch} 
        usertype={type === "Applicant" ? "Company" : "Applicant"}
      />
    </>
  );
};

export default MobileMenu;