import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginWithSocial = ({ userType }) => {
  const router = useRouter();

  // Handle the OAuth callback
  const handleGoogleCallback = async (code) => {
    try {
      const response = await axios.get(`https://backend.rotaracthub.in/api/auth/google/callback?code=${code}&type=${userType}`);
      
      // Store the token data in sessionStorage
      if (response.data.token) {
        sessionStorage.setItem('authToken', response.data.token);
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('userType', response.data.type);
        sessionStorage.setItem("companyId",response.data.companyId||null);

        
        // Redirect to appropriate page after successful login
        router.push('/');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error appropriately
    }
  };

  // Check for authorization code in URL when component mounts
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleGoogleCallback(code);
    }
  }, []);

  return (
    <div style={{"display":"flex","justifyContent":"center","textAlign":"center"}}>
      {/* <div className="col-lg-6 col-md-12">
        <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress"
          className="theme-btn social-btn-two facebook-btn">
          <i className="fab fa-linkedin"></i> Log In via LinkedIn
        </a>
      </div> */}
      <div className="col-lg-6 col-md-12">
        <button
          className="theme-btn social-btn-two google-btn"
          onClick={handleGoogleCallback}
        >
          <i className="fab fa-google"></i> Sign up via Gmail
        </button>
      </div>
    </div>
  );
};

export default LoginWithSocial;