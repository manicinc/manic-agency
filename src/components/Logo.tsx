import clsx from "clsx";
import Link from "next/link";

const Logo = ({ invert, href, className, children, ...props }) => {
  className = clsx(
    className,
    "black",
    invert ? "text-white hover:text-pink-600" : "text-black hover:text-pink-600"
  );
  const inner = <span className="relative">{children}</span>;
  if (href) {
    return (
      <Link href={href} className={className} {...props}>
        {inner}
      </Link>
    );
  }
  return (
    // <h2
    //   className={clsx(
    //     "cursor-pointer text-2xl font-semibold duration-300",
    //     className
    //   )}
    //   {...props}
    // >
    //   {inner}
    // </h2>
    <h4 className="glitch text-1xl max-w-full">
      <span aria-hidden="true">
        {inner}
        </span>
        {inner}
        <span aria-hidden="true">
        {inner}
      </span>
    </h4>
  );
};

export default Logo;
