export default function VelvetFeatures() {
  const features = [
    {
      name: 'AI Project Management',
      description: 'Framer-powered project manager tracks your goals and keeps you accountable.'
    },
    {
      name: 'Code Analysis',
      description: 'AI-powered code review and valuation for non-technical founders.'
    },
    {
      name: 'Smart Content Curation',
      description: 'Automated link summarization and trending crypto news delivery.'
    },
    {
      name: 'Community Support',
      description: 'Interactive AI bots that encourage participation and founder success.'
    }
  ];

  return (
    <div id="features" className="bg-white dark:bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Powered by AI</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to succeed in crypto
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
