import Container from './Container';
import FooterNavigation from './FooterNavigation';
import Logo from './Logo';
import Link from 'next/link';

const ArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  );
};

const NewsletterForm: React.FC = () => {
  return (
    <></>
  );
};

const Footer: React.FC = () => {
  return (
    <Container
      as="footer"
      className="mt-24 w-full sm:mt-32 lg:mt-40 rounded-2xl">
      {/* <div className=""> */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
        <FooterNavigation />
        <div className="flex lg:justify-end">
          <NewsletterForm />
        </div>
      </div>
      <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
        <Link href={'/'} aria-label="Home">
          <Logo className="h-8">Manic Agency</Logo>
        </Link>
        <p className="text-sm text-neutral-700 mb-4">team@manic.agency</p>
        <p className="text-sm text-neutral-700 mb-4">Lagos, Nigeria</p>
        <p className="text-sm text-neutral-700 mb-4">
          © Manic Agency {new Date().getFullYear()}
        </p>
      </div>
      <div className="pb-20"></div>
      {/* </div> */}
    </Container>
  );
};
export default Footer;
