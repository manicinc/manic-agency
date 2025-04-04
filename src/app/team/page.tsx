"use client"
import React from 'react';
import { Nav } from '@/components/Nav';

const TeamsPage = () => {
  const executives = [
    { name: 'Johnny Dunn', title: 'Lead developer & Co-founder', emoji: '🦁', description: 'Johnny Dunn is a developer and artist working in California, and comes from a game design background. He enjoys making experimental experiences around text and interactive fiction. Previously: eBay, Amelia.ai, 5th Place Winner AT&T National VR and AR Challenge 2017 (THiNKIMMERSIVE team).' },
    { name: 'Nathan', title: 'Lead Designer & Co-founder', emoji: '🦊', description: 'Senior Multi-Disciplinary Designer based in Melbourne, Australia, specializing in Product Design and Design Systems. Cautiously passionate about Generative AI and its potential for impactful use cases.' },
    { name: 'Victor E.', title: 'Developer', emoji: '🐻‍❄️', description: 'Victor is a full-stack software developer from Nigeria, passionate about blockchain, AI, social media, and digital illustration and animation.' },
  ];

  return (
    <>
    <div className='bg-[#23153c]'>
    <Nav />
    </div>
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-blue-100 to-purple-100 my-10">
      <h1 className="text-4xl font-bold mb-12 text-center text-blue-600 animate-bounce">Our Executive Team</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {executives.map((exec, index) => (
          <li key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex flex-col items-center">
              <div className="text-6xl mb-4">{exec.emoji}</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{exec.name}</h2>
              <p className="text-gray-500 text-center">{exec.title}</p>
              <p className="text-gray-600 text-center mt-4">{exec.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default TeamsPage;
