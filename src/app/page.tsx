import Intro from "@/components/Intro";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Work from "@/components/Work";
import { Header } from "@/components/Header";
import "./styles/embla.css";
import Script from "next/script";
import { getAllPosts } from "@/lib/getAllPosts";
import { BlogPost } from "@/types/blog";
import { HeroSection } from "@/components/HeroSection";
export default function Home() {

  const featuredPosts: BlogPost[] = getAllPosts() // Fetch data here
  .filter(post => (post.tags ?? []).includes('featured'))
  .slice(0, 3);


  return (
    <main className="text-slate-850 text-base">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" async></Script>
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js" async></Script>

        <Script src="/globe.js"></Script>
      <Header />      
      <Intro />
      <HeroSection featuredPosts={featuredPosts}/>
      <Services />
      {/* <Work/> */}
      {/* <Intro/>
      <Clients />
      <ContactSection /> */}
    </main>
  );
}
