"use client";

import Link from "next/link";
import { pageItems } from "../../data/mainMenuData";
import { isActiveParent, isActiveLink, isActiveParentChaild } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";

const HeaderNavContent = () => {
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* Home button */}
          <li className={`${isActiveLink("/", usePathname()) ? "current" : ""}`}>
            <Link href="/">Home</Link>
          </li>

          {/* Find Jobs button */}
          <li
            className={`${
              isActiveLink("/find-jobs", usePathname()) ? "current" : ""
            }`}
          >
            <Link href="/find-jobs">Find Jobs</Link>
          </li>

          {/* Employers button */}
          <li
            className={`${
              isActiveLink("/employers", usePathname()) ? "current" : ""
            }`}
          >
            <Link href="/employers">Employers</Link>
          </li>

          {/* Candidates button */}
          <li
            className={`${
              isActiveLink("/candidates", usePathname()) ? "current" : ""
            }`}
          >
            <Link href="/candidates">Candidates</Link>
          </li>

          {/* Blog button */}
          <li
            className={`${
              isActiveLink("/blog", usePathname()) ? "current" : ""
            }`}
          >
            <Link href="/blog">Blog</Link>
          </li>

          {/* Pages button with dropdown */}
          <li
            className={`${
              isActiveParentChaild(pageItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, usePathname()) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
