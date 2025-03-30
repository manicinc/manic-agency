'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import PageIntro from '@/components/PageIntro';
import Image from 'next/image';
import Link from 'next/link';

const WorkPage = () => {
  const projects = [
    {
      id: 1,
      imageUrl: '/velvetweb.gif',
      link: 'https://www.manic.agency/velvet',
      title: 'Velvet Web',
    },
    {
      id: 2,
      imageUrl: '/manic.gif',
      link: 'https://manicinc.github.io/logomaker/',
      title: 'Logo Image Generator',
    },
  ];

  return (
    <>
      <PageIntro eyebrow="Our work" title="Manic creations">
        <p>
          Our organization has a multitude of templates and robust boilerplate
          solutions we utilize to build in-house platforms, SaaSes, and media
          organizations. Depending on the requirements of a client and the
          needs of a project, we can integrate our existing toolkit of
          templatized code to create streamlined solutions for others.
        </p>
        <br />
        <p>
          These are the projects that have been developed and are fully owned
          and managed by Manic Agency / Manic Labs.
        </p>
      </PageIntro>
      <div className="container mx-auto px-4">
        <Swiper spaceBetween={20} slidesPerView={1} >
          {projects.map(({ id, imageUrl, link, title }) => (
            <SwiperSlide key={id}>
              <Link href={link} className="block text-center">
                <span className="text-slate-800 font-semibold block mb-5 text-2xl">
                  {title}
                </span>
                <Image src={imageUrl} alt={title} width={800} height={400} className="w-full h-auto" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default WorkPage;
