
import ChoosePlayzone from "@/components/ChoosePlayzone/ChoosePlayzone";
import HomeFacilityCard from "@/components/FacilityCard/HomeFacilityCard";
import Footer from "@/components/Footer/Footer";
import HomeHero from "@/components/HeroSection/HomeHero";
import HowItWork from "@/components/HowItWork/HowItWork";
import SearchBar from "@/components/SearchBar/SearchBar";
import HomeSportsSection from "@/components/Sports/HomeSportsSection";
import HomeTestimonial from "@/components/Testimonial/HomeTestimonial";
import WaitingCard from "@/components/WaitingCard/WaitingCard";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomeHero />
      {/* <SearchBar /> */}
      <HomeFacilityCard />
      {/* <App/> */}
      <HowItWork />
      <HomeSportsSection />
      <ChoosePlayzone />
      <HomeTestimonial />
      <WaitingCard />
    </div>
  );
}
