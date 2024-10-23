import React from 'react';

const TeamsPage = () => {
  const executives = [
    { name: 'Johnny Dunn', title: 'Lead developer & Co-founder', emoji: '🦁', description: 'Johnny is a passionate developer with over 10 years of experience in building scalable web applications.' },
    { name: 'Nathan', title: 'Lead Designer & Co-founder', emoji: '🦊', description: 'Nathan is a creative designer who loves crafting beautiful and user-friendly interfaces.' },
    { name: 'Victor E.', title: 'Developer', emoji: '🐒', description: 'Victor is a skilled developer with a knack for solving complex problems and optimizing performance.' },
  ];

  return (
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
  );
};

export default TeamsPage;
