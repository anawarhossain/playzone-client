import Link from 'next/link';
import React from 'react';
import FooterHeading from './FooterHeading';
import ContactItem from './ContactItem';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import FooterLink from './FooterLink';
import SocialIcon from './SocialIcon';
import { IoLogoIonic } from 'react-icons/io';

const Footer = () => {
  const currentYear = new Date().getFullYear();
    return (
      <footer className="bg-inverse-surface pt-16 pb-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* উপরের মেইন গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* কলাম ১: ব্র্যান্ডিং ও সোশ্যাল */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary-container p-2 rounded-xl">
                  <IoLogoIonic size={28} className="text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  Play<span className="text-primary-container">Zone</span>
                </span>
              </div>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                Empowering sports enthusiasts with easy access to high-quality
                facilities. Play more, worry less with our seamless booking
                experience.
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={FaFacebookF} href="#" />
                <SocialIcon icon={FaTwitter} href="#" />
                <SocialIcon icon={FaInstagram} href="#" />
                <SocialIcon icon={FaLinkedinIn} href="#" />
              </div>
            </div>

            {/* কলাম ২: About Links */}
            <div>
              <FooterHeading>About</FooterHeading>
              <ul className="space-y-4">
                <FooterLink href="/about">Our Story</FooterLink>
                <FooterLink href="/how-it-works">How it Works</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
              </ul>
            </div>

            {/* কলাম ৩: Quick Links */}
            <div>
              <FooterHeading>Quick Links</FooterHeading>
              <ul className="space-y-4">
                <FooterLink href="/venues">Find Venues</FooterLink>
                <FooterLink href="/partner">Partner With Us</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
              </ul>
            </div>

            {/* কলাম ৪: Contact Info */}
            <div>
              <FooterHeading>Contact</FooterHeading>
              <div className="space-y-5">
                <ContactItem icon={HiOutlineLocationMarker}>
                  123 Sports Ave, Fitness City, FC 56789
                </ContactItem>
                <ContactItem icon={HiOutlinePhone}>
                  +1 (234) 567-890
                </ContactItem>
                <ContactItem icon={HiOutlineMail}>
                  support@playzone.com
                </ContactItem>
              </div>
            </div>
          </div>

          {/* নিচের কপিরাইট এরিয়া */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary text-xs md:text-sm">
              © {currentYear} PlayZone. All rights reserved.
            </p>
            <div className="flex gap-8 text-xs md:text-sm text-secondary">
              <Link
                href="/privacy"
                className="hover:text-primary-container transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary-container transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="hover:text-primary-container transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;