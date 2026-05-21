"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { IoLogoIonic, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FiAlertCircle } from "react-icons/fi";
import CustomInput from "@/components/SearchBar/CustomInput";
import { toast } from "react-toastify";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("Invalid email or password"); 
  const router = useRouter();
  
  const toastOptions = {
      position: "top-center",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };
  
    const loginHandle = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      console.log(userData);
  
      const { email, password } = userData;
  
      const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
        rememberMe: true,
        callbackURL: "/",
      });
  
      console.log("sign up response:", { data, error });
  
      if (error) {
        console.log("Error signing up: " , error.message);
      }
      if (data) {
        toast.success("Login successfully", toastOptions);
        router.push("/");
      }
  };

  const HandleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">
      {/* Left Side: Brand Hero Section */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-[#004d35] items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
            alt="Sports Field"
            fill
            className="object-cover opacity-20"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-12">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-[#10b981] p-4 rounded-3xl shadow-xl">
              <IoLogoIonic size={50} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              PlayZone
            </h1>
          </div>

          <h2 className="mt-12 text-6xl font-black text-white leading-tight">
            Your Game, <br /> Your Schedule
          </h2>

          {/* Feature Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <FeatureBadge label="Easy Booking" />
            <FeatureBadge label="Instant Confirm" />
            <FeatureBadge label="Best Price" />
          </div>
        </div>
      </section>

      {/* Right Side: Login Form Section */}
      <section className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex justify-center mb-10">
            <IoLogoIonic size={40} className="text-primary-container" />
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-500 font-medium">
              Login to book your favorite sports facility
            </p>
          </div>

          <form className="space-y-6" onSubmit={loginHandle}>
            {/* Email Input */}
            <div className="space-y-1">
              <CustomInput
                label="Email Address"
                name="email"
                placeholder="your@email.com"
                icon={<HiOutlineMail size={22} />}
              />
              {error && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold px-1 mt-1">
                  <FiAlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="relative group">
              <CustomInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<HiOutlineLockClosed size={22} />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-4 text-gray-400 hover:text-primary transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={22} />
                ) : (
                  <HiOutlineEye size={22} />
                )}
              </button>
            </div>

            {/* Extra Actions */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary-container focus:ring-primary-container cursor-pointer"
                />
                <span className="text-gray-600 font-semibold group-hover:text-gray-900 transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                size={20}
                className="text-primary-container font-black hover:underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary-container text-white font-black rounded-2xl shadow-xl shadow-primary-container/20 hover:brightness-110 transition-all active:scale-95 cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              OR
            </span>
          </div>

          {/* Social Auth */}
          <button
            onClick={HandleGoogleLogin}
            type="button"
            className="w-full py-4 border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          {/* Footer Link */}
          <footer className="mt-12 text-center">
            <p className="text-gray-500 font-medium text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary-container font-black hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
};

// ছোট হেল্পার কম্পোনেন্ট: ফিচার ব্যাজ
const FeatureBadge = ({ label }) => (
  <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold">
    <IoCheckmarkCircleOutline className="text-primary-container" size={18} />
    {label}
  </div>
);

export default LoginPage;
