import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Fixed import

const LoginWithSocial = ({ userType }) => {
  const router = useRouter();

  // Handle Google login click
  const handleGoogleLogin = () => {
    const redirectUri = `${window.location.origin}/api/auth/google/callback`;
    const state = encodeURIComponent(JSON.stringify({ type: userType }));

    const googleAuthUrl = `https://backend.rotaracthub.in/api/auth/google?type=${userType}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;

    // Redirect to Google OAuth
    window.location.href = googleAuthUrl;
  };

  // Handle OAuth callback and retrieve token
  const handleGoogleCallback = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const authCode = params.get("code"); // Get authorization code from URL

      if (authCode) {
        // Call backend to exchange auth code for JWT token
        const response = await axios.get(
          `https://backend.rotaracthub.in/api/auth/google/callback?code=${authCode}`,
          { withCredentials: true } // Include cookies if needed
        );

        // const { token, userId, type, companyId } = response.data;
        // document.cookie = `authToken=${token}; path=/`;
        // document.cookie = `type=${type}; path=/`;
        // document.cookie = `userId=${userId}; path=/`;
        // document.cookie = `companyId=${companyId}; path=/`;

        // // Store token and user details
        // sessionStorage.setItem("authToken", token);
        // sessionStorage.setItem("userId", userId);
        // sessionStorage.setItem("userType", type);
        // sessionStorage.setItem("companyId", companyId || null);

        // Redirect to homepage or dashboard
        const redirectPath = userType === "Applicant" 
        ? "/candidates-dashboard" 
        : "/employers-dashboard";
      
      router.replace(redirectPath);
    
      }
    } catch (error) {
      console.error("Authentication error:", error);
      router.push("/login?error=auth_failed");
    }
  };

  // Check for authorization code in URL when component mounts
  useEffect(() => {
    if (window.location.search.includes("code=")) {
      handleGoogleCallback();
    }
  }, []); // Run once when the component mounts

  return (
    <div style={{"display":"flex","justifyContent":"center","textAlign":"center"}}>
      <div className="col-lg-6 col-md-12">
        <button
          className="theme-btn social-btn-two google-btn"
          onClick={handleGoogleLogin}
        >
          <i className="fab fa-google"></i> Sign up via Gmail
        </button>
      </div>
    </div>
  );
};

export default LoginWithSocial;
