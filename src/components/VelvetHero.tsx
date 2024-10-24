import Link from 'next/link';
import Image from 'next/image';

export default function VelvetHero() {
  return (
    <div className="relative isolate pt-14 dark:bg-gray-900">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto flex justify-center mb-8">
            <Image
              src="/images/velvet-web-logo.png"
              alt="Velvet Web Logo"
              width={120}
              height={120}
              priority
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Velvet Web: AI-Powered Community for Crypto Innovators
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Your central hub for founders, creators, and developers. Get AI-curated insights, 
              project management, and code analysis - all focused on growing the crypto ecosystem.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://discord.gg/velvetweb"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Join Our Community
              </Link>
              <Link
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
