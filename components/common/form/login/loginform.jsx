"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormContent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login-cp`;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post(URL, {
        emailAddress: email,
        password: password,
        type:props.userType
      });

      if (response.status === 200) {
        // Assuming the API returns a token or relevant user data
        const { token } = response.data;
        const type = response.data.userType;
        const userId= response.data.id;
        const companyId=response.data.companyId;
        console.log("token : ", response.data.token, "userType : ", type);
        // Save the token in sessionStorage for the current session
        sessionStorage.setItem("authToken", token);
        // In your handleSubmit function, after setting sessionStorage:
        document.cookie = `authToken=${token}; path=/`;
        document.cookie = `type=${type}; path=/`;
        document.cookie = `userId=${userId}; path=/`;
        document.cookie = `companyId=${companyId}; path=/`;
        sessionStorage.setItem("type", type);
        sessionStorage.setItem("userId",userId);
        sessionStorage.setItem("companyId",companyId);

        // Optionally, save user information if provided in the response
        // Example:
        // sessionStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect the user to a dashboard or home page
        router.push("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
        // API error response
        setErrorMessage(error.response.data.message || "Login failed");
      } else {
        console.log(error)
        // Other errors
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="username"
          placeholder="Username"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      {errorMessage && (
        <div className="form-group">
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default FormContent;
