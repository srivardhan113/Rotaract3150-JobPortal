const CallToActions = () => {
  return (
    <div className="call-to-action-four ">
      <h5>Do you wanna Recruit someone?</h5>
      <p>
      Join Rotaract 3150 - Job Portal to post job opportunities and connect with passionate, skilled candidates who are eager to make an impact.
      </p>
      <a href="/register" className="theme-btn btn-style-one bg-blue">
        <span className="btn-title">Start Recruiting Now</span>
      </a>
      <div
        className="image"
        style={{ backgroundImage: "url(/images/resource/ads-bg-4.png)" }}
      ></div>
    </div>
  );
};

export default CallToActions;
