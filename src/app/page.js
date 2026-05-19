
import HomeHero from "@/components/HomeHero";
import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <SearchBar/>
    </div>
  );
}
