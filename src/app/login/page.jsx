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
import { FiAlertCircle as AlertIcon } from "react-icons/fi";
import CustomInput from "@/components/SearchBar/CustomInput";
import { toast } from "react-toastify";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // ইনিশিয়ালি খালি থাকবে
  const [loading, setLoading] = useState(false); // লোডিং স্টেট যুক্ত করা হয়েছে
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
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    // বেসিক ক্লায়েন্ট সাইড ভ্যালিডেশন
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: email,
        password: password,
        rememberMe: true, // আপনি চাইলে এই ভ্যালুটা চেকবক্সের স্টেটের সাথে ডায়নামিক করতে পারেন
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Invalid email or password");
        toast.error(authError.message || "Login failed", toastOptions);
      } else {
        toast.success("Logged in successfully!", toastOptions);
        router.push("/");
        router.refresh(); // সেশন আপডেট নিশ্চিত করতে
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const HandleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">
      {/* Left Side: Brand Hero Section */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-[#004d35] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
            alt="Sports Field"
            fill
            className="object-cover opacity-20"
            priority // হিরো ইমেজের জন্য প্রায়োরিটি দেওয়া ভালো
          />
        </div>

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
          <div className="lg:hidden flex justify-center mb-10">
            <IoLogoIonic size={40} className="text-[#004d35]" />
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-500 font-medium">
              Login to book your favorite sports facility
            </p>
          </div>

          {/* গ্লোবাল এরর মেসেজ অ্যালার্ট */}
          {error && (
            <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-sm font-semibold">
              <AlertIcon size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={loginHandle}>
            {/* Email Input */}
            <CustomInput
              label="Email Address"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              icon={<HiOutlineMail size={22} />}
            />

            {/* Password Input - রিফ্যাক্টর্ড rightIcon প্রপ দিয়ে */}
            <CustomInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              icon={<HiOutlineLockClosed size={22} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff size={22} />
                  ) : (
                    <HiOutlineEye size={22} />
                  )}
                </button>
              }
            />

            {/* Extra Actions */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="w-4 h-4 rounded border-gray-300 text-[#004d35] focus:ring-[#004d35] cursor-pointer"
                />
                <span className="text-gray-600 font-semibold group-hover:text-gray-900 transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[#004d35] font-black hover:underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button - উইথ লোডিং স্টেট */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#004d35] disabled:bg-gray-400 text-white font-black rounded-2xl shadow-xl shadow-emerald-900/10 hover:brightness-110 transition-all active:scale-95 cursor-pointer flex justify-center items-center"
            >
              {loading ? "Logging in..." : "Login"}
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
                className="text-[#004d35] font-black hover:underline ml-1"
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

const FeatureBadge = ({ label }) => (
  <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold">
    <IoCheckmarkCircleOutline className="text-[#10b981]" size={18} />
    {label}
  </div>
);

export default LoginPage;
