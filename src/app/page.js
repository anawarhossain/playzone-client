
import HomeFacilityCard from "@/components/FacilityCard/HomeFacilityCard";
import HomeHero from "@/components/HeroSection/HomeHero";
import HowItWork from "@/components/HowItWork/HowItWork";
import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <SearchBar />
      <HomeFacilityCard />
      {/* <App/> */}
      <HowItWork/>
    </div>
  );
}
