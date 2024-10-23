"use client"
import ComponentLayout from "./ComponentLayout";
import { useRouter } from 'next/router'
import { PropsWithChildren } from "react"

export default function RoutingLayout({children}: PropsWithChildren){
    const {pathname} = useRouter();
    console.log(pathname)

      // If the segment matches your excluded route
  if (pathname === '/velvet') {
    return <>{children}</>;
  }

  return (
   <ComponentLayout>
    {children}
   </ComponentLayout>
  );
}
