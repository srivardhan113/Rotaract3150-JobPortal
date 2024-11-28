'use client';

import Link from "next/link";
import Image from "next/image";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname } from "next/navigation";

const DashboardEmployerSidebar = () => {
    const { menu } = useSelector((state) => state.toggle);
    const dispatch = useDispatch();
    const pathname = usePathname(); // Hook moved outside of the loop

    // Menu toggle handler
    const menuToggleHandler = () => {
        dispatch(menuToggle());
    };

    return (
        <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
            {/* Sidebar Logo */}
            <div className="pro-header">
                {/* Logo Section */}
                <Link href="/">
                    <Image
                        width={154}
                        height={50}
                        src="/images-rotaract/ri3150-logo.png"
                        alt="ROTARACT3150 || SRIPTO"
                    />
                </Link>
                {/* End logo */}

                {/* Close Icon */}
                <button
                    className="fix-icon"
                    onClick={menuToggleHandler}
                    aria-label="Close Sidebar"
                >
                    <span className="flaticon-close"></span>
                </button>
                {/* End close icon */}
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
                            onClick={menuToggleHandler}
                        >
                            <Link href={item.routePath}>
                                <i className={`la ${item.icon}`}></i> {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardEmployerSidebar;
