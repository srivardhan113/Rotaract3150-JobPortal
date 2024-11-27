import Image from "next/image";
import Link from "next/link";

const SidebarHeader = () => {
  return (
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
      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
