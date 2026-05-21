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
import CustomInput from "@/components/SearchBar/CustomInput";
import PasswordStrength from "@/components/Register/PasswordStrength";
import ValidationItem from "@/components/Register/ValidationItem";
import { authClient } from "../lib/auth-client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const registerHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    const { name, email, password, profileUrl } = userData;

    const { data, error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
      image: profileUrl || "",
      callbackURL: "/",
    });

    console.log("sign up response:", { data, error });

    if (error) {
      alert("Error signing up: " + error.message);
    }
    if (data) {
      toast.success("Account Create successfully", toastOptions);
      await authClient.signOut();
      router.push("/login");
    }
  };

  const HandleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
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
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />

        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">
              Play<span className="text-primary-container">Zone</span>
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
      <section className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md">
          <header className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-500 font-medium text-sm">
              Start booking your favorite sports venues
            </p>
          </header>

          <form className="space-y-6" onSubmit={registerHandle}>
            <CustomInput
              label="Full Name"
              name="name"
              placeholder="Enter Your Full Name"
              icon={<HiOutlineUser size={20} />}
            />
            <CustomInput
              label="Email Address"
              name="email"
              placeholder="your@email.com"
              icon={<HiOutlineMail size={20} />}
            />

            <div className="space-y-1">
              <CustomInput
                label="Profile Photo URL"
                name="profileUrl"
                placeholder="https://your-photo-url.com"
                icon={<HiOutlinePhotograph size={20} />}
              />
              <p className="text-[10px] text-gray-400 font-bold px-1 uppercase tracking-tight">
                Paste a direct image URL
              </p>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <CustomInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<HiOutlineLockClosed size={20} />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-4 text-gray-400 hover:text-primary transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>

            {/* Password Validation UI */}
            {/* <div>
              <PasswordStrength strength={2} />
              <div className="grid grid-cols-2 gap-3">
                <ValidationItem label="Min 6 chars" isValid={true} />
                <ValidationItem label="One uppercase" isValid={true} />
                <ValidationItem label="One lowercase" isValid={false} />
              </div>
            </div> */}

            <button
              type="submit"
              className="w-full py-4 bg-primary-container text-white font-black rounded-2xl shadow-xl shadow-primary-container/20 hover:brightness-110 transition-all active:scale-95 cursor-pointer"
            >
              Create Account
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
                className="text-primary-container font-black hover:underline ml-1"
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

export default RegisterPage;
