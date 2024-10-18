"use client";
import PageIntro from "@/components/PageIntro";
// import './script.js';
import '../styles/work.scss';
import { useEffect, useState } from 'react';

const WorkPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
        if (typeof window !== 'undefined') {
          let els = document.querySelectorAll(".gallery ul li a");
          for (var i = 0; i < els.length; i++) {
              els[i].addEventListener('click', function(event) {
                // let itemID = els[i].attr('href');
                // alert("CLICK ITEM ID: ", itemID);
                // itemID.classList.add("item_open");
            try {
                const el = document.getElementById(event.currentTarget.href.split("#")[1]);
                el.classList.add("item_open");
                event.preventDefault();
              } catch (err) {
                pass;
              }
            });
    
          }
          let closeEl = document.getElementsByClassName("close");
          for (var i = 0; i < closeEl.length; i++) {
              closeEl[i].addEventListener("click", function(event) {
            try {
                const el = document.getElementById(event.currentTarget.href.split("#")[1]);
                el.classList.remove("item_open");
                event.preventDefault();
              } catch (err) {
                pass;
              }
              });
          }
        }

      return () => {
          setMounted(false)
      }
  });

  return (
    <>
      <PageIntro
        eyebrow="Our work"
        title="Manic creations"
      >
        <p>
          Our organization has a multitude of templates and robust boilerplate solutions we utilize to build in-house platforms, SaaSes, and media organizations.
          Depending on the requirements of a client and the needs of a project, we can integrate our existing toolkit of templatized code to create streamlined solutions
          for others. 
        </p>
        <br></br>
        <p>
          These are the projects that have been developed and are fully owned and managed by Manic Agency / Manic Labs.
        </p>
      </PageIntro>
      <div className="container mx-auto">
      <section className="gallery">
        <div className="row">
          <ul>
            <li>
              <a href="#item01" className="">
                <span className="text-slate-800 text-2xl w-full h-full">Quire.work</span>
                <img src="https://jddunn.github.io/assets/projects/quire-summarizer-optimized.gif" alt="Quire.work" className="w-full h-full"/>
              </a>
            </li>
            <li>
              <span className="text-slate-800 text-2xl">Fortune.day</span>
              <a className="image" href="#item02">
                <img src="https://jddunn.github.io/assets/projects/fortune-ascii-rogue-demo.gif" alt="Fortune.day"/>
              </a>
            </li>
            <li>
              <span className="text-slate-800 text-2xl">Hype.blog</span>
              <a className="image" href="#item03">
                <img src="https://jddunn.github.io/assets/projects/hype-blog-article-frontend.png" alt="Hype.blog"/>
              </a>
            </li>
          </ul>
        </div>
        <div id="item01" className="port">
          <a href="#item01" className="close text-slate-800"></a>
            <div className="description w-full">
              <h1 className="text-slate-700 w-2/3 sm:w-1/3 text-2xl">Quire.work</h1>
              <p className="text-slate-700 w-2/3 sm:w-1/3 text-sm overflow-y-auto">Quire is a platform where users can create their own autonomous AI agents to automate and perform any type of work. Quire agents can work together in a collaborative manner to achieve common goals. This was built in Next / React, TypeScript, LangChain, and LlamaIndex, and uses both open-source LLMs like Mistral and GPT-3.5 / GPT-4.</p>
              <br></br>
              <a className="w-full text-blue-400 hover:text-slate-400" href="https://quire.work" target="_blank">https://quire.work</a>
            </div>
              <img src="https://jddunn.github.io/assets/projects/quire-summarizer-optimized.gif" className="w-full" alt="Quire.work"/>
            </div>
        <div id="item02" className="port">
        <a href="#item02"  className="close text-slate-800"></a>
          <div className="row">
            <div className="description w-full">
              <h1 className="text-slate-700 w-2/3 sm:w-1/3 ">Fortune.day</h1>
              <p className="text-slate-700 w-2/3 sm:w-1/3 text-sm overflow-y-auto">Fortune is a decentralized metaverse platform with an initial version that will exist on the web. Any type of app or game can exist in Fortune. Worlds are interconnected with persistent player profiles and inventories, with authentication being web3 wallet-based. Users can mint a Fortune NFT (ERC-1155) to gain access to the hosted metaverse and create their own game world where other players can join and interact with each other in an online manner through web sockets. Currency in the metaverse is tokenized with a ERC-20 token. This platform is currently still in-development with plans to be entirely open-source.</p>
              <br></br>
              <a className="w-2/3 text-blue-400 hover:text-slate-400" href="https://fortune.day" target="_blank">https://fortune.day</a>
            </div>
            <img src="https://jddunn.github.io/assets/projects/fortune-ascii-rogue-demo.gif" alt="Fortune.day"/>
          </div> 
        </div> 
        <div id="item03" className="port">
        <a href="#item03" className="close text-slate-800"></a>
          <div className="row">
            <div className="description w-full">
              <h1 className="text-slate-700 w-2/3 sm:w-1/3">Hype.blog</h1>
              <p className="text-slate-700 w-2/3 sm:w-1/3 text-sm overflow-y-auto">Hype.blog is a digital media newsroom with AI journalists that can operate the newsroom entirely independently, by scouring content on the web to research topics to write on, and using generative AI to create visual and written content. Human staff can edit, create, and publish articles in a CMS to work together with the AI agents. This was built in React / Next, TypeScript, and Python, with a cognitive AI library we are developing that will be released open-source later in 2024.</p>
              <br></br>
              <a className="w-2/3 text-blue-400 hover:text-slate-400" href="#" target="_blank">Link coming soon</a>
            </div>
            <img src="https://jddunn.github.io/assets/projects/hype-blog-article-frontend.png" alt="Hype.blog"/>
          </div> 
        </div> 
      </section> 
      </div>
      </>
  );
};

export default WorkPage;
