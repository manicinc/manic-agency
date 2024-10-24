import Link from 'next/link';

export default function VelvetPricing() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Simple Pricing</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Join our community and help fund the future of crypto
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lifetime Membership</h3>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
              Limited time offer - Get unlimited access to all premium features forever
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What's included</h4>
              <div className="h-px flex-auto bg-gray-100"></div>
            </div>
            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:grid-cols-2 sm:gap-6">
              <li className="flex gap-x-3">Unlimited AI Bot Access</li>
              <li className="flex gap-x-3">Premium GPT Models</li>
              <li className="flex gap-x-3">Code Analysis</li>
              <li className="flex gap-x-3">Project Management</li>
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600 dark:text-gray-300">Limited Time Offer</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">$50</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-300">USD</span>
                </p>
                <Link
                  href="https://buy.stripe.com/velvetweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Lifetime Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
