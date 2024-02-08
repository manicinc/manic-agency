import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";
import Intro from "@/components/Intro";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main className="text-slate-850">
      <Container className="mt-24 sm:mt-32">
        <div className="max-w-3xl">
          {/* <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Make your online presence a reality with us!
          </h1> */}
          <p className="mt-6 text-xl text-neutral-600">
            We are a group of web developers, digital marketers, machine learning / AI engineers, product designers, game designers, and legal specialists, working at the intersection of 
            reality, mixed reality, web3, and the emerging metaverse.
          </p>
        </div>
      </Container>
      <Intro/>
      <Services />
      <Clients />
      <Work/>
      {/* <Testimonials
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: "Phobia", logo: logoPhobiaDark }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user microphone without triggering one of
        those annoying permission dialogs.
      </Testimonials> */}
      <ContactSection />
    </main>
  );
}
