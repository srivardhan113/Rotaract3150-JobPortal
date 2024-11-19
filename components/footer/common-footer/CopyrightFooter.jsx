import Social from "./Social";

const CopyrightFooter = () => {
  return (
    <div className="footer-bottom">
      <div className="auto-container">
        <div className="outer-box">
          <div className="copyright-text">
            © {new Date().getFullYear()} Rotaract 3150 - Job Portal by{" "}
            <a
              href="https://www.instagram.com/srivardhan_yeluri/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SRIPTO || Sri Vardhan Yeluri
            </a>
            . All Right Reserved.
          </div>
          <div className="social-links">
            <Social />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
