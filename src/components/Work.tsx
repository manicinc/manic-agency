import SectionIntro from './SectionIntro';
import Container from './Container';

const Work = () => {
  return (
    <div className="pt-20">
      <SectionIntro eyebrow="" title="Our work">
        <p>
          Manic Agency houses a number of tech and media oriented platforms
          striking an impact on the world
        </p>
      </SectionIntro>
      <Container className="mt-16">
        {/* <FadeIn className="w-4/4"> */}
        <div className="projects-grid mt-24 sm:mt-32 lg:mt-40">

          <div className="expand3 transform transition-all duration-300 hover:scale-105">
            <div className="info-block opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h2 className="w-full tracking-wider py-1 font-semibold bg-slate-800 bg-opacity-90">
                Hype.blog
              </h2>
              <p className="w-full py-4 px-4 bg-slate-800 bg-opacity-90">
                A automated digital newsroom that uses generative AI to create
                content from trending topics scraped on the web
              </p>
              <a href="#" className="font-semibold hover:text-slate-300 transition-colors duration-300">
                <span>Link coming soon</span>
              </a>
            </div>
            <div className="overlay"></div>
          </div>
          <div className="expand4 transform transition-all duration-300 hover:scale-105">
            <div className="info-block opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h2 className="w-full tracking-wider py-1 font-semibold bg-slate-800 bg-opacity-90">
                Velvet Web Discord
              </h2>
              <p className="w-full py-4 px-4 bg-slate-800 bg-opacity-90">
                A central hub for founders, creators, artists, and devs with AI-powered insights, 
                project management, and code review. Join our community to access specialized AI assistants 
                and stay connected with crypto opportunities.
              </p>
              <a href="https://discord.gg/AqD9Aatdpm" target="_blank" className="font-semibold hover:text-slate-300 transition-colors duration-300">
                <span>Join Discord</span>
              </a>
            </div>
            <div className="overlay"></div>
          </div>
        </div>
        
      </Container>
    </div>
  );
};
export default Work;
