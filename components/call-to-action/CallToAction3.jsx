import Link from "next/link";

const CallToAction3 = () => {
  return (
    <section className="call-to-action-three">
      <div className="auto-container">
        <div className="outer-box">
          <div className="sec-title">
            <h2>We Connect You to the Career Opputunities</h2>
            <div className="text">
            "We connect you to the jobs that match your skills, passion, and aspirations, empowering your career growth through Rotaract 3150."
            </div>
          </div>
          {/* End sec title */}

          <div className="btn-box">
            <Link
              href="/job-list"
              className="theme-btn btn-style-one bg-blue"
            >
              <span className="btn-title">Search Job</span>
            </Link>
          </div>
          {/* End btn-box */}
        </div>
        {/* End outer-box */}
      </div>
    </section>
  );
};

export default CallToAction3;
