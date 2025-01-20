import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInsatnce";
import { useAuth } from "../context/AuthProvider";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
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
      setEmail("");
      setPassword("");
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance
      .post("/auth/login", { email, password })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        navigate("/");
        toast.success("Login successful");
      })
      .catch((e) => {
        console.error("Error while logging in", e);
        setLoading(false);
        toast.error("Login failed");
      });
  };

  return (
    <form
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 mt-10"
      onSubmit={handleSubmit}
    >
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
        {loading ? "Logging..." : "Login"}
      </button>

      <p className="text-blue-500">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
};

export default Login;
