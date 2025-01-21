import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/auth/signup`, {
        username,
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("Registration successful! Check your email for the OTP.");
        setOtpSent(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/auth/verify-otp`, { email, otp });

      if (response.status === 200) {
        setMessage("Account verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "OTP verification failed. Try again.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-center text-2xl font-bold mb-4">
          {otpSent ? "Verify OTP" : "Sign Up"}
        </h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        {!otpSent ? (
          <form onSubmit={handleRegister}>
            <div className="mb-6">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerify}>
            <div className="mb-6">
              <label className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
              Verify OTP
            </button>
          </form>
        )}
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Login Here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
