import Container from "./Container";
import FadeInLong from "./FadeIn";

const Intro = () => {
  return (
    // Removed mt-24 and rounded-2xl for seamlessness
    // Added shadow-inner for subtle edge blending (Option 1)
    // Removed bg-slate-600 (redundant)
    <div 
      className="shadow-inner" // Option 1: Subtle inner shadow. Remove for no shadow.
      style={{
        // Use a linear gradient overlay for background color opacity
        background: 
          `linear-gradient(rgba(17, 17, 34, 0.9), rgba(17, 17, 34, 0.9)), url(//images.weserv.nl/?url=i.imgur.com/6QJjYMe.jpg) center center / cover no-repeat`,
        // backgroundSize: "cover", // Included in the shorthand above
        // backgroundPosition: "center", // Included in the shorthand above
        // Removed opacity: 0.9 - Handled by the gradient now
        // Add padding inside if needed, e.g., py-8 or py-12 if Container doesn't handle it
      }}
    >
      {/* Container likely adds horizontal padding/max-width, which is usually desired */}
      <Container>
        {/* Apply vertical padding here if Container doesn't, or if more space is needed */}
        <FadeInLong className="flex items-center gap-x-8 w-full py-12 md:py-16"> {/* Added py-12/py-16 for example vertical spacing INSIDE */}
          <div className="logoNeon text-1xl w-full">
            <div className="logoNeonText w-full">
              <b><span></span>We&apos;re <span> </span>all<span> m</span>ad here</b>
            </div>
          </div>
        </FadeInLong>
      </Container>
    </div>
  );
};

export default Intro;