"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import CustomInput from "@/components/SearchBar/CustomInput";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // পাসওয়ার্ড ভ্যালিডেশন রুলস চেক
  const isMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = isMinLength && hasUppercase && hasLowercase;

  // পাসওয়ার্ডের শক্তির ওপর ভিত্তি করে প্রোগ্রেস বার ভ্যালু (০ থেকে ৩)
  const getStrengthScore = () => {
    let score = 0;
    if (isMinLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    return score;
  };

  const registerHandle = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const { name, email, password, profileUrl } = Object.fromEntries(
      formData.entries(),
    );

    // ক্লায়েন্ট সাইড ভ্যালিডেশন
    if (!name || !email || !password) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet all security requirements.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        name: name,
        email: email,
        password: password,
        image: profileUrl || "",
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Failed to create an account.");
        toast.error(authError.message || "Registration failed.", toastOptions);
      } else {
        toast.success("Account created successfully!", toastOptions);
        await authClient.signOut(); // Better Auth রেজিস্ট্রেশনের পর সেশন তৈরি করলে তা ক্লিয়ার করার জন্য
        router.push("/login");
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
      toast.error("Google authentication failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Side: Hero Section (Desktop only) */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
          alt="Sports Stadium"
          fill
          className="object-cover opacity-60 scale-110"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />

        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">
              Play<span className="text-[#10b981]">Zone</span>
            </span>
          </div>

          <div>
            <h1 className="text-6xl font-black text-white leading-tight mb-6">
              Join PlayZone Today
            </h1>
            <p className="text-gray-200 text-lg max-w-md leading-relaxed">
              Book sports facilities in seconds and join the community of
              athletes in your city.
            </p>
          </div>

          {/* Social Proof Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 w-fit">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative w-10 h-10 rounded-full border-2 border-gray-800 overflow-hidden bg-gray-200"
                >
                  <Image
                    src={`https://i.pravatar.cc/150?u=${i}`}
                    alt="player"
                    fill
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                10,000+ Happy Players
              </p>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                Booking daily across 50 cities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Form Section */}
      <section className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 overflow-y-auto bg-white">
        <div className="w-full max-w-md">
          <header className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-500 font-medium text-sm">
              Start booking your favorite sports venues
            </p>
          </header>

          {/* Error message UI */}
          {error && (
            <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-sm font-semibold">
              <FiAlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={registerHandle}>
            <CustomInput
              label="Full Name *"
              name="name"
              required
              placeholder="Enter Your Full Name"
              icon={<HiOutlineUser size={20} />}
            />

            <CustomInput
              label="Email Address *"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              icon={<HiOutlineMail size={20} />}
            />

            <div className="space-y-1">
              <CustomInput
                label="Profile Photo URL (Optional)"
                name="profileUrl"
                type="url"
                placeholder="https://your-photo-url.com"
                icon={<HiOutlinePhotograph size={20} />}
              />
              <p className="text-[10px] text-gray-400 font-bold px-1 uppercase tracking-tight">
                Paste a direct image URL
              </p>
            </div>

            {/* Password Field */}
            <CustomInput
              label="Password *"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<HiOutlineLockClosed size={20} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff size={20} />
                  ) : (
                    <HiOutlineEye size={20} />
                  )}
                </button>
              }
            />

            {/* Dynamic Password Validation UI */}
            {password.length > 0 && (
              <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 animate-fadeIn">
                <PasswordStrength score={getStrengthScore()} />
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <ValidationItem label="Min 6 chars" isValid={isMinLength} />
                  <ValidationItem
                    label="One uppercase"
                    isValid={hasUppercase}
                  />
                  <ValidationItem
                    label="One lowercase"
                    isValid={hasLowercase}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#004d35] disabled:bg-gray-400 text-white font-black rounded-2xl shadow-xl shadow-[#004d35]/20 hover:brightness-110 transition-all active:scale-95 cursor-pointer flex justify-center items-center"
            >
              {loading ? "Creating Account..." : "Create Account"}
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

          <footer className="mt-12 text-center">
            <p className="text-gray-500 font-medium text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#004d35] font-black hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
};

// অভ্যন্তরীণ বা এক্সটার্নাল হেল্পার কম্পোনেন্টস (আপনার স্ট্রাকচার অনুযায়ী সাব-কম্পোনেন্টে রাখতে পারেন)
const PasswordStrength = ({ score }) => {
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-[11px] font-bold text-gray-500 uppercase">
        <span>Password Strength</span>
        <span className={score === 3 ? "text-green-600" : "text-gray-600"}>
          {labels[score] || labels[0]}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex gap-0.5">
        {[0, 1, 2].map((step) => (
          <div
            key={step}
            className={`h-full flex-1 transition-all duration-300 ${
              score > step ? colors[score] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ValidationItem = ({ label, isValid }) => (
  <div
    className={`flex items-center gap-1.5 ${isValid ? "text-green-600" : "text-gray-400"}`}
  >
    {isValid ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
    <span>{label}</span>
  </div>
);

export default RegisterPage;
