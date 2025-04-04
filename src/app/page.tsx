"use client"
import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";
import Intro from "@/components/Intro";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Work from "@/components/Work";
import { Header } from "@/components/Header";
import "./embla.css";
import Script from "next/script";

export default function Home() {
  return (
    <main className="text-slate-850 text-base">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" async></Script>
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js" async></Script>

        <Script src="/globe.js"></Script>
      <Header />
      <Services />
      <Work/>
      {/* <Intro/>
      <Clients />
      <ContactSection /> */}
    </main>
  );
}
