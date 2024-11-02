'use client';
import PageIntro from '@/components/PageIntro';
// import './script.js';
import '../styles/work.scss';
import { useEffect, useState } from 'react';

const WorkPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let els =
        document.querySelectorAll<HTMLAnchorElement>('.gallery ul li a');
      for (var i = 0; i < els.length; i++) {
        els[i].addEventListener('click', function (event: MouseEvent) {
          // let itemID = els[i].attr('href');
          // alert("CLICK ITEM ID: ", itemID);
          // itemID.classList.add("item_open");

          const target = event.currentTarget as HTMLAnchorElement;

          try {
            const el = document.getElementById(target.href.split('#')[1]);
            if (el) el.classList.add('item_open');
            event.preventDefault();
          } catch (err) {
            // handle error
          }
        });
      }
      let closeEl = document.getElementsByClassName(
        'close'
      ) as HTMLCollectionOf<HTMLElement>;
      for (var i = 0; i < closeEl.length; i++) {
        closeEl[i].addEventListener('click', function (event: MouseEvent) {
          const target = event.currentTarget as HTMLAnchorElement;
          try {
            const el = document.getElementById(target.href.split('#')[1]);
            if (el) el.classList.remove('item_open');
            event.preventDefault();
          } catch (err) {
            // handle error
          }
        });
      }
    }

    return () => {
      setMounted(false);
    };
  });

  return (
    <>
      <PageIntro eyebrow="Our work" title="Manic creations">
        <p>
          Our organization has a multitude of templates and robust boilerplate
          solutions we utilize to build in-house platforms, SaaSes, and media
          organizations. Depending on the requirements of a client and the needs
          of a project, we can integrate our existing toolkit of templatized
          code to create streamlined solutions for others.
        </p>
        <br></br>
        <p>
          These are the projects that have been developed and are fully owned
          and managed by Manic Agency / Manic Labs.
        </p>
      </PageIntro>
      <div className="container mx-auto">
        <section className="gallery">
          <div className="row">
            <ul>
              <li>
                <a href="#item01" className="">
                  <span className="text-slate-800 text-2xl w-full h-full">
                    Manic Blog
                  </span>
                  <img
                    src="https://jddunn.github.io/assets/projects/hype-blog-article-frontend.png"
                    alt="Hype.blog"
                    className="w-full h-full"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div id="item01" className="port">
            <a href="#item01" className="close text-slate-800"></a>
            <div className="row">
              <div className="description w-full">
                <h1 className="text-slate-700 w-2/3 sm:w-1/3">Manic Blog</h1>
                <p className="text-slate-700 w-2/3 sm:w-1/3 text-sm overflow-y-auto">
                  Hype.blog is a digital media newsroom with AI journalists that
                  can operate the newsroom entirely independently, by scouring
                  content on the web to research topics to write on, and using
                  generative AI to create visual and written content. Human
                  staff can edit, create, and publish articles in a CMS to work
                  together with the AI agents. This was built in React / Next,
                  TypeScript, and Python, with a cognitive AI library we are
                  developing that will be released open-source later in 2024.
                </p>
                <br></br>
                <a
                  className="w-2/3 text-blue-400 hover:text-slate-400"
                  href="#"
                  target="_blank">
                  Link coming soon
                </a>
              </div>
              <img
                src="https://jddunn.github.io/assets/projects/hype-blog-article-frontend.png"
                alt="Hype.blog"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WorkPage;
