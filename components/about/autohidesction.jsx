"use client";
import { useState, useEffect } from 'react';
import RegBanner from '../block/RegBanner';

const AutoHideSection = ({ setIsRegister, setShowLoginPopup }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initial check
    const checkLoginStatus = () => {
      const userId = sessionStorage.getItem("userId");
      setIsLoggedIn(!!userId);
    };

    // Check on mount
    checkLoginStatus();

    // Set up storage event listener
    const handleStorageChange = (e) => {
      if (e.key === "userId") {
        checkLoginStatus();
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Add interval to check periodically (useful for direct sessionStorage modifications)
    const interval = setInterval(checkLoginStatus, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Don't render anything if logged in
  if (isLoggedIn) return null;

  return (
    <section className="layout-pt-60 layout-pb-60">
      <div className="auto-container">
        <div className="row" data-aos="fade-up">
          <RegBanner 
            setIsRegister={setIsRegister} 
            setShowLoginPopup={setShowLoginPopup} 
          />
        </div>
      </div>
    </section>
  );
};

export default AutoHideSection;