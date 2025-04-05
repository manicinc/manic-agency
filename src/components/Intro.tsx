
import Container from "./Container";
import FadeInLong from "./FadeIn";


const Intro = () => {
  return (
    // rounded-2xl
    <div className="mt-24 rounded-2xl bg-slate-600"
    style={{
      background: "#112 url(//images.weserv.nl/?url=i.imgur.com/6QJjYMe.jpg)  center no-repeat",
      backgroundSize: "cover",
      opacity: .9
    }}
    >
      <Container>
        <FadeInLong className="flex items-center gap-x-8 w-full">
        {/* <FadeIn className="max-w-full"> */}
          <div className="logoNeon text-1xl w-full">
            <div className="logoNeonText w-full"> <b><span></span>We&apos;re <span> </span>all<span> m</span>ad here</b></div>
          </div>
        </FadeInLong>
        {/* <FadeInStagger faster> */}
        {/* </FadeInStagger> */}
      </Container>
    </div>
  );
};

export default Intro;
