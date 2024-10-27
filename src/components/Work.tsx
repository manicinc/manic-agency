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
          <div className="expand1">
            <div className="info-block w-full">
              <h2 className="w-full tracking-wider py-1 font-semibold bg-slate-800 bg-opacity-90	">
                Quire.work
              </h2>
              <p className="w-full py-4 px-4 bg-slate-800 bg-opacity-90">
                A platform to create and manage AI agents that can work
                collaboratively to automate tasks
              </p>
              <a
                href="https://quire.work"
                target="_blank"
                className="font-semibold">
                <span>Go to link</span>
              </a>
            </div>
            <div className="overlay"></div>
          </div>
          <div className="expand2">
            <div className="info-block">
              <h2 className="w-full tracking-wider py-1 font-semibold bg-slate-800 bg-opacity-90	">
                Fortune.day
              </h2>
              <p className="w-full py-4 px-4 bg-slate-800 bg-opacity-90">
                A open-source (eventually) decentralized web-based metaverse
                with tokenized membership and economy
              </p>
              <a
                href="https://fortune.day"
                target="_blank"
                className="font-semibold">
                <span>Go to link</span>
              </a>
            </div>
            <div className="overlay"></div>
          </div>
          <div className="expand3">
            <div className="info-block">
              <h2 className="w-full tracking-wider py-1 font-semibold bg-slate-800 bg-opacity-90">
                Hype.blog
              </h2>
              <p className="w-full py-4 px-4 bg-slate-800 bg-opacity-90">
                A automated digital newsroom that uses generative AI to create
                content from trending topics scraped on the web
              </p>
              <a href="#" className="font-semibold">
                <span>Link coming soon</span>
              </a>
            </div>
            <div className="overlay"></div>
          </div>
          <div className="expand4">
            <div className="info-block">
              <h2 className="w-full tracking-wider py-1 font-semibold bg-slate-800 bg-opacity-90">
                Velvet Web Discord
              </h2>
              <p className="w-full py-4 px-4 bg-slate-800 bg-opacity-90">
                A central hub for founders, creators, artists, and devs with AI-powered insights, 
                project management, and code review. Join our community to access specialized AI assistants 
                and stay connected with crypto opportunities.
              </p>
              <a href="https://discord.gg/AqD9Aatdpm" target="_blank" className="font-semibold">
                <span>Join Discord</span>
              </a>
            </div>
            <div className="overlay"></div>
          </div>
        </div>
        {/* </FadeIn> */}

        {/* <div className="expand4">
          <div className="info-block">
            <h2 className="bg-slate-600">Retail & General Public</h2>
            <p>Looking to fit out your next project? Look no further, make a trade account with us today. We are experienced with working alongisde commercial, grass root and the self-employed.</p>
            <a href="#"><span>Shop Products</span></a>
          </div>
          <div className="overlay"></div>
        </div> */}
        {/* <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage 
                src={imageLaptop} 
                sizes="(min-width: 1024px) 41rem, 31rem" 
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Web development">
              We specialise in crafting beautiful, high quality marketing pages.
              The rest of the website will be a shell that uses lorem ipsum
              everywhere.
            </ListItem>
            <ListItem title="Application development">
              We have a team of skilled developers who are experts in the latest
              app frameworks, like Angular 1 and Google Web Toolkit.
            </ListItem>
            <ListItem title="E-commerce">
              We are at the forefront of modern e-commerce development. Which
              mainly means adding your logo to the Shopify store template we've
              used for the past six years.
            </ListItem>
            <ListItem title="Custom content management">
              At Studio we understand the importance of having a robust and
              customised CMS. That's why we run all of our client projects out
              of a single, enormous Joomla instance.
            </ListItem>
          </List> */}
      </Container>
    </div>
  );
};
export default Work;
