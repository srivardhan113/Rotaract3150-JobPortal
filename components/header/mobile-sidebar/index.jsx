"use client";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import { isActiveLink } from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Save pathname to avoid multiple calls
  const [userType, setUserType] = useState(null); // State to hold user type

  // Fetch user type from session storage
  useEffect(() => {
    const storedUserType = sessionStorage.getItem("type");
    setUserType(storedUserType);
  }, []);

  // Define menu data
  const menuData = [
    { id: 1, label: "Home", routePath: "/" },
    { id: 2, label: "Jobs List", routePath: "/job-list" },
    // Conditional menu items based on user type
    ...(userType === "Company"
      ? [
          {
            id: 3,
            label: "Job Provider Dashboard",
            routePath: "/employers-dashboard",
          },
        ]
      : []),
    ...(userType === "Applicant"
      ? [
          {
            id: 4,
            label: "Job Seeker Dashboard",
            routePath: "/candidates-dashboard",
          },
        ]
      : []),
    { id: 5, label: "Who are we?", routePath: "/about" },
    { id: 6, label: "FAQ's", routePath: "/faqs" },
    { id: 7, label: "Terms", routePath: "/terms" },
  ];

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      <Sidebar className="bg-white flex flex-col justify-between h-full">
        <Menu>
          {menuData.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => router.push(item.routePath)} // Navigate on click
              className={`rounded-md cursor-pointer px-3 ${
                isActiveLink(item.routePath, pathname)
                  ? "text-pink-600 font-bold" // Active state styling
                  : "text-gray-700 hover:bg-pink-100 hover:text-pink-600" // Default and hover styling
              }`}
              aria-label={item.label} // Accessibility
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default MobileSidebar;
