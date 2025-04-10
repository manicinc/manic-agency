"use client"
import "./styles/globals.css";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ScrollToTop from "@/components/ScrollBtns/ScrollToTop";
import ScrollToTopArticle from "@/components/ScrollBtns/ScrollToTopArticle";

// export const metadata = {
//   title: {
//     template: "Manic Agency",
//     default: "Manic Agency",
//   },
// };

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isBlogArticle = /^\/blog\/[^\/]+\/[^\/]+$/.test(pathname); // Matches /blog/category/title

  return (
    <html>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        {children}
        {isBlogArticle ? <ScrollToTopArticle /> : <ScrollToTop />}
        <Footer />
      </body>
    </html>
  );
}
