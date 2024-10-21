import Offices from './Offices';
import Border from './Border';
import Link from 'next/link';
import SocialMedia from './SocialMedia';

const ContactDetails = () => {
  return (
    <div>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Our team locations
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        {/* Prefer doing things in person? We don't but we have to list our
        addresses here for legal reasons. */}
      </p>
      <Offices />
      <Border>
        <div className="mt-16 pt-16">
          <h2 className="font-display text-base font-semibold text-neutral-950">
            Email us
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
            {[
              ['Main', 'team@manic.agency'],
              // ["Careers", "reactjsbd.com"],
              // ["Press", "noorjsdivs@gmail.com"],
            ].map(([label, email]) => (
              <div key={email}>
                <dt className="font-semibold text-neutral-950">{label}</dt>
                <dd>
                  <Link
                    href={`mailto:${email}`}
                    className="text-neutral-600 hover:text-neutral-950">
                    {email}
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Border>
      <Border>
        <div className="mt-16 pt-16">
          <h2 className="font-display text-base font-semibold text-neutral-950">
            Follow us
          </h2>
          <SocialMedia className="mt-6" />
          {/* <Link
            href={`mailto:team@manic.agency`}
            className="text-neutral-600 hover:text-neutral-950"
          >
            team@manic.agency
          </Link> */}
        </div>
      </Border>
    </div>
  );
};
export default ContactDetails;
