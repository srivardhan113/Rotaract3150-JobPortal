import Link from "next/link";

const CallToAction6 = () => {
  return (
    <section className="call-to-action-three style-two" style={{ backgroundImage: "url(/images/index-16/cta/bg.png)" }}>
      <div className="auto-container">
        <div className="outer-box">
          <div className="sec-title light">
            <h2>"Need help or have questions? We're here to assist you every step of the way!"</h2>
            <div className="text">
            If you need assistance or have any queries, feel free to reach out to us!! <br/>
            We're here to help!" <br />
            <a href="mailto:support@rotaract3150.org">Gmail: support@rotaract3150.org</a>

            </div>
          </div>
          {/* End sec-title */}

          <div className="btn-box">
            <Link href="/faq" className="theme-btn btn-style-three">
              FAQ's
            </Link>
          </div>
        </div>
        {/* End outer-box */}
      </div>
    </section>
  );
};

export default CallToAction6;
