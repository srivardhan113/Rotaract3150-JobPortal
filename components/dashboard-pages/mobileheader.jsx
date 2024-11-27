"use client";

import Link from "next/link";
import Image from "next/image";

const MobileMenu = () => {
  return (
    // Main Header with solid background, no transparency
    <header className="main-header main-header-mobile bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="auto-container flex justify-between items-center py-2 px-4">
        {/* Left side - Logo */}
        <div className="logo-box">
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

        {/* Right side - Name and Contact Us Button */}
        <div className="flex items-center space-x-4 ml-auto">
          <div className="welcome-message text-lg font-bold text-gray-800">
            Hi, Sri Vardhan Yeluri
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
