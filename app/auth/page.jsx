'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AuthPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Get params
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const userId = params.get("userId");
        console.log(userId);
        const userType = params.get("type");
        const companyId = params.get("companyId");

        if (!token || !userId || !userType) {
          throw new Error("Missing auth parameters");
        }

        // Set cookies with explicit domain and path
        const cookieOptions = "path=/; secure; samesite=lax; max-age=7200"; // 2 hours
        document.cookie = `authToken=${token}; ${cookieOptions}`;
        document.cookie = `userId=${userId}; ${cookieOptions}`;
        document.cookie = `type=${userType}; ${cookieOptions}`;
        if (companyId) {
          document.cookie = `companyId=${companyId}; ${cookieOptions}`;
        }

        // Set session storage
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("type", userType);
        if (companyId) {
          sessionStorage.setItem("companyId", companyId);
        }

        setStatus("Authentication successful, preparing redirect...");

        // Ensure cookies are set before redirect
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use window.location.href for a full page reload
        const redirectPath = userType === "Applicant" 
          ? "/candidates-dashboard" 
          : "/employers-dashboard";
        
        window.location.href = redirectPath;

      } catch (error) {
        console.error("Auth error:", error);
        setStatus("Authentication failed: " + error.message);
        setTimeout(() => {
          window.location.href = "/login?error=auth_failed";
        }, 2000);
      }
    };

    handleAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-gray-700">{status}</p>
          {/* Debug info - remove in production */}
          <div className="text-sm text-gray-500 mt-4">
            Auth Token: {sessionStorage.getItem("authToken") ? "Set ✓" : "Not set ✗"}<br />
            User Type: {sessionStorage.getItem("type") ? "Set ✓" : "Not set ✗"}<br />
            User ID: {sessionStorage.getItem("userId") ? "Set ✓" : "Not set ✗"}
          </div>
        </div>
      </div>
    </div>
  );
}