import React from 'react';

const TeamsPage = () => {
  const executives = [
    { name: 'John Doe', title: 'Chief Executive Officer' },
    { name: 'Jane Smith', title: 'Chief Operating Officer' },
    { name: 'Emily Johnson', title: 'Chief Financial Officer' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Our Executive Team</h1>
      <ul>
        {executives.map((exec, index) => (
          <li key={index} className="mb-2">
            <h2 className="text-xl font-semibold">{exec.name}</h2>
            <p className="text-gray-600">{exec.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsPage;
