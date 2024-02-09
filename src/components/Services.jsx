"use client";;
import SectionIntro from "./SectionIntro";
import Container from "./Container";
import List, { ListItem } from "./List";
import "../app/styles/glitch.scss";
import { useEffect } from "react";

const Services = () => {
  let is_safari = false;
  useEffect(() => {
    if (typeof window === "undefined") return;
    is_safari = window.navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
  }, [is_safari]);

  return (
    <>
      <SectionIntro
        eyebrow=""
        title="Our services"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Fall down the rabbit hole with us to determine optimal budgeting, ideal market timing, and holistic architecture & design to manifest your vision
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <div className="w-[33.75rem] flex-none lg:w-[45rem]">
              {/* <StylizedImage 
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem" 
                className="justify-center lg:justify-end"
              /> */}
              {is_safari && (
              <svg className="Playground__svg ml-20" viewBox="0 0 100 120">
                  <defs>
                  <image x="0%" y="0%" height="120" id="my-image" className="image-distorion base" preserveAspectRatio="xMidYMid slice" xlinkHref="https://images.unsplash.com/photo-1571977144562-3737f035296a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ" ></image>
                  <image x="0%" y="0%" height="120" id="my-image" className="image-distorion red" preserveAspectRatio="xMidYMid slice" xlinkHref="https://images.unsplash.com/photo-1571977144562-3737f035296a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ" ></image>
                  <image x="0%" y="0%" height="120" id="my-image" className="image-distorion cyan" preserveAspectRatio="xMidYMid slice" xlinkHref="https://images.unsplash.com/photo-1571977144562-3737f035296a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ" ></image>
                  </defs>
              </svg>
              )}
               {!is_safari && (
                <svg className="Playground__svg ml-20" viewBox="0 0 100 120">
                  <defs>
                    <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB" filterRes="1">
                      <feMorphology operator="dilate" radius="10 0" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" result="morphology1"></feMorphology>
                    </filter>
                    <filter id="filter-2" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB" filterRes="1">
                      <feMorphology operator="dilate" radius="10 2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" result="morphology1"></feMorphology>
                    </filter>
                    <filter id="filter-3" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB" filterRes="1">
                      <feMorphology operator="dilate" radius="15 0" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" result="morphology1" filterRes="1"></feMorphology>
                    </filter>
                  </defs>
                  <image x="0%" y="0%" height="120" preserveAspectRatio="xMidYMid slice" xlinkHref="https://images.unsplash.com/photo-1571977144562-3737f035296a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ" id="my-image"></image>
              </svg>
               )}
            </div>
          </div>
          {/* List item */}
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Development and deployments on every platform">
            Each of our devs is full-stack with at least one
            specialization in a particular area, whether that&apos;s frontend, SEO, 
            mobile, VR / AR, deep learning, databases, web scraping, 
            smart contracts, or devops and the cloud.
            </ListItem>
            <ListItem title="Innovative and emergent tech">
            We rely on robust and battle-tested tech
            to stand on the shoulders of. But we also continually keep up-to-date
            with trends and research in upcoming fields poised to strike the mainstream world,
            such as blockchain, generative AI, and virtual and augmented reality.
            We understand demand and innovation are bidirectional.
            </ListItem>
            <ListItem title="Designs with clarity and artistry">
              Our branding and UI / UX skills are unparalleled, as we employ true artists
              with a passion for their craft. We focus on humanistic-centric design and aim
              for simplicity.
            </ListItem>
            <ListItem title="Legal consultation">
              Our team comprises licensed lawyers specializing in financial and software regulations.
              We can help you figure out all the moves you need to secure proper compliance.
            </ListItem>
            <ListItem title="Creative and results-oriented marketing">
              Growth hacking and going viral come naturally for us. Our in-house tools for social media 
              analytics and brand monitoring aid us in bringing campaigns and user acquisition to the next level.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
};

export default Services;
