import React from 'react';

const TeamsPage = () => {
  const executives = [
    { name: 'John Doe', title: 'Chief Executive Officer' },
    { name: 'Jane Smith', title: 'Chief Operating Officer' },
    { name: 'Emily Johnson', title: 'Chief Financial Officer' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Our Executive Team</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {executives.map((exec, index) => (
          <li key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800">{exec.name}</h2>
            <p className="text-gray-500">{exec.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsPage;
