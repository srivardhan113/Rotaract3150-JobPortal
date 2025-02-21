'use client'

import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import candidatesuData from "/app/candidates-dashboard/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname, useRouter } from "next/navigation";

const DashboardCandidatesSidebar = () => {
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;
  const dispatch = useDispatch();
  const router = useRouter();

  // menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // handle logout
  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'type=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'companyId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    
    // Redirect to login page
    router.push('/');
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {candidatesuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, usePathname()) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={() => {
                menuToggleHandler();
                // If this is the logout item, handle logout
                if (item.name === "Logout") {
                  handleLogout();
                }
              }}
            >
              {item.name === "Logout" ? (
                // For logout, use a button styled as a link
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </a>
              ) : (
                // For other items, use Next.js Link
                <Link href={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;