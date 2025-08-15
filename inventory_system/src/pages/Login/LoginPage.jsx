import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { mockUsers } from "../../data/mockdata";
import '../../App.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/user/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
        <div className="">
          {/* Logo */}
          {/* <img src={logo} alt="Your Company" className="w-[100px] sm:w-[200px] lg:w-[250px] h-auto mx-auto" /> */}

          <div className="w-auto max-w-md space-y-8 bg-gray/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-xl p-6 sm:p-8 ">
            
            <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-blue-600 text-center">
              Sign in to your account
            </h2>

          {/* Heading & Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-blue-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your Email"
                className="block w-[250px] sm:w-[300px] lg:w-[380px] h-auto mx-auto rounded-md bg-gray-100 border border-white/20  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-blue-500 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your Password"
                  className="block w-[250px] sm:w-[300px] lg:w-[380px] rounded-md bg-gray-100 border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 "
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Remember Me / Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="flex items-center text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
                />
                <span className="ml-2 text-blue-600 hover:text-blue-400">
                  Remember me
                </span>
              </label>

              <a
                href="#"
                className="text-sm font-semibold text-blue-600 hover:text-blue-400"
              >
                Forgot password?
              </a>
            </div>


            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-blue-600 transition"
            >
              Sign in
            </button>

            {/* Demo Credentials */}
            <div className="mt-8">
              <div className="inline-block rounded-lg bg-gray-100/50 px-4 py-3 shadow-sm w-full">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  Demo Credentials
                </p>
                <div className="text-sm text-gray-800 space-y-1">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">
                      demo@example.com
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Password:</span>{" "}
                    <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">
                      password123
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500 border-t border-gray-200 bg-white/70 dark:bg-gray-800/70 flex items-center justify-center gap-2">
        <span>
          © 2025 <span className="font-semibold text-blue-600">LOGO™</span> | Powered by <span className="font-semibold text-blue-600">Asterion Solution</span>
        </span>
      </footer>
    </div>
  );
};

export default LoginPage;
