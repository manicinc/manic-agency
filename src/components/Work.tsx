'use client';

import SectionIntro from './SectionIntro';
import Container from './Container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: number;
  imageUrl: string;
  link: string;
  title: string;
}

const projects: Project[] = [
  {
    id: 1,
    imageUrl: '/velvetweb.gif',
    link: 'https://www.manic.agency/velvet',
    title: 'Velvet Web',
  },
  {
    id: 2,
    imageUrl: "/manic.gif",
    link: 'https://manicinc.github.io/logomaker/',
    title: "Logo Image Generator"
  }
];

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
        
        <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full">
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.id}>
                <Link href={project.link} passHref target='_blank'>
                  <Card className="w-full h-[500px]">
                    <CardContent className="p-0 relative w-full h-full">
                      <Image
                        src={project.imageUrl || '/placeholder.svg'}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                        <h2 className="text-2xl font-bold">{project.title}</h2>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </div>
  );
};
export default Work;
