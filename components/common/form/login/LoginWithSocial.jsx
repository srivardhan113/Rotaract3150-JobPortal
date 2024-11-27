const LoginWithSocial = () => {
  return (
    <div className="btn-box row">
      <div className="col-lg-6 col-md-12">
        <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress"

            className="theme-btn social-btn-two facebook-btn">
          <i className="fab fa-linkedin"></i> Log In via LinkedIn
        </a>
      </div>
      <div className="col-lg-6 col-md-12">
        <a href="https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile"
        className="theme-btn social-btn-two google-btn">
          <i className="fab fa-google"></i> Log In via Gmail
        </a>
      </div>
    </div>
  );
};

export default LoginWithSocial;
