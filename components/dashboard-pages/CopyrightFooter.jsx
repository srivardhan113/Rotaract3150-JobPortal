const CopyrightFooter = () => {
  return (
    <div className="copyright-text">
      <p>
        © {new Date().getFullYear()} Rotaract 3150 - Job Portal{" "}
        <a
          href="https://www.instagram.com/rotaract_3150/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SRIPTO || Sri Vardhan Yeluri
        </a>
        . All Right Reserved.
      </p>
    </div>
  );
};

export default CopyrightFooter;
