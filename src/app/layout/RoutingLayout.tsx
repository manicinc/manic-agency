"use client";
import ComponentLayout from "./ComponentLayout";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function RoutingLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  console.log(pathname);

  // If the segment matches your excluded route
  if (pathname === "/velvet") {
    return (
      <html>
        <head></head>
        <body>{children}</body>
      </html>
    );
  }

  return <ComponentLayout>{children}</ComponentLayout>;
}
