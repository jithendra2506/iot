import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  };

  const handleRegister = () => {
    if (!validateEmail(email)) {
      setMessage("Please enter a valid Gmail address.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setMessageType("error");
      return;
    }

    setMessage("Registration successful!");
    setMessageType("success");

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Create an Account
        </h2>

        <input
          type="email"
          placeholder="Enter Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 outline-none"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg pr-10 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Animated Message Popup */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 flex items-center gap-3 p-4 rounded-xl shadow-lg text-sm ${
                messageType === "error"
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {messageType === "error" ? (
                <FaExclamationCircle className="text-lg" />
              ) : (
                <FaCheckCircle className="text-lg" />
              )}
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegisterPage;