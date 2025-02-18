'use client';

import Link from "next/link";
import Image from "next/image";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname, useRouter } from "next/navigation";

const DashboardEmployerSidebar = () => {
    const { menu } = useSelector((state) => state.toggle);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    // Menu toggle handler
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
        router.push('/login');
    };

    return (
        <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
            {/* Start sidebar close icon */}
            <div className="pro-header text-end pb-0 mb-0 show-1023">
                <div className="fix-icon" onClick={menuToggleHandler}>
                    <span className="flaticon-close"></span>
                </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="sidebar-inner">
                <ul className="navigation">
                    {employerMenuData.map((item) => (
                        <li
                            className={`${
                                isActiveLink(item.routePath, pathname)
                                    ? "active"
                                    : ""
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

export default DashboardEmployerSidebar;