"use client"
import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";
import Intro from "@/components/Intro";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Work from "@/components/Work";
import { Header } from "@/components/Header";
import "./embla.css";

export default function Home() {
  return (
    <main className="text-slate-850 text-base">
      <Header />
      <Services />
      <Work/>
      {/* <Intro/>
      <Clients />
      <ContactSection /> */}
    </main>
  );
}
