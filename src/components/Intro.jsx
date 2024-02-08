// import logoBrightPath from "../images/clients/bright-path/logo-light.svg";
// import logoFamilyFund from "../images/clients/family-fund/logo-light.svg";
// import logoGreenLife from "../images/clients/green-life/logo-light.svg";
// import logoHomeWork from "../images/clients/home-work/logo-light.svg";
// import logoMailSmirk from "../images/clients/mail-smirk/logo-light.svg";
// import logoNorthAdventures from "../images/clients/north-adventures/logo-light.svg";
// import logoUnseal from "../images/clients/unseal/logo-light.svg";
import Container from "./Container";

const clients = [
  ["Edelman", ""],
  ["Hereafterlegacy.ai", ""],
  ["EmergeX", ""],
  ["NuBloom NFTs", ""],
  ["Smurf.finance", ""],
  // ["", ""],
  // ["Bright Path", ""],
  // ["North Adventures", ""],
];

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
        {/* <FadeInLong className="flex items-center gap-x-8 w-full"> */}
        {/* <FadeIn className="max-w-full"> */}
          <div className="logoNeon text-1xl w-full">
            <div className="logoNeonText w-full"> <b><span></span>We&apos;re <span> </span>all<span> m</span>ad here</b></div>
          </div>
        {/* </FadeInLong> */}
        {/* <FadeInStagger faster> */}
        {/* </FadeInStagger> */}
      </Container>
    </div>
  );
};

export default Intro;
