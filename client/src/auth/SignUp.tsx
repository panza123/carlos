import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { axiosInstance } from "../lib/axiosInsatnce";
import { useAuth } from '../context/AuthProvider';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { setUser, user } = useAuth(); // Added user to check if already logged in
  const navigate = useNavigate();

  useEffect(() => {
    // If a user is already logged in, redirect them to the home page
    if (user) {
      navigate("/");
    } else {
      // Clear form fields if the user is logged out (in case they were already logged in)
      setUsername("");
      setEmail("");
      setPassword("");
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance
      .post("/auth/signup", { username, email, role, password })
      .then((res) => {
        setUser(res.data); // Set the user after successful signup
        setLoading(false);
        navigate("/");
        toast.success("Account created successfully");
      })
      .catch((e) => {
        console.error("Error while signing up", e);
        setLoading(false);
        toast.error("Failed to create account");
      });
  };

  return (
    <form
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 mt-10"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center border-b border-gray-300 py-2">
        <FaUser className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="flex items-center border-b border-gray-300 py-2">
        <FaEnvelope className="text-gray-400 mr-3" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="flex items-center border-b border-gray-300 py-2">
        <FaUserShield className="text-gray-400 mr-3" />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex items-center border-b border-gray-300 py-2">
        <FaLock className="text-gray-400 mr-3" />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="ml-3 text-gray-400"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>

      <p className="text-blue-600">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default SignUp;
