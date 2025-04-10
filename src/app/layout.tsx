
import Script from "next/script";
import "./styles/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    template: "Manic Agency",
    default: "Manic Agency",
  },
};

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {

  return (<html>
    <head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    {/* <link rel="manifest" href="/site.webmanifest"/> */}
    </head>
    <body>
      {children}
      <Footer/>
    </body>
  </html>)
  

}
