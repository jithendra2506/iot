import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import backgroundImage from "../assets/cloudwallpaper.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      <motion.div
        className="relative z-10 bg-white/90 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center backdrop-blur-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to <span className="text-blue-600">Weather Monitor</span>
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Monitor temperature, humidity, and device activity in real-time.
        </motion.p>

        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition duration-300 shadow-lg"
        >
          <FaRocket />
          Get Started (Login)
        </motion.button>

        <p className="text-sm text-gray-600 mb-2">Don’t have an account?</p>

        <button
          onClick={handleRegister}
          className="w-full bg-gray-100 text-blue-600 border border-blue-600 px-6 py-2 rounded-xl font-medium hover:bg-blue-50 transition"
        >
          Register
        </button>
      </motion.div>
    </div>
  );
};

export default HomePage;