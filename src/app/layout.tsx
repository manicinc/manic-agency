// src/app/layout.tsx
// NO "use client" here
// NO import { usePathname } from "next/navigation"; // REMOVE THIS IMPORT

import "./styles/globals.css";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
// Import the Client Wrapper component
import LayoutClient from "./LayoutClient"; // Make sure path is correct

export const metadata = {
  title: {
    template: "%s | Manic Agency",
    default: "Manic Agency",
  },
  // Add other metadata here
};

// Layout remains a Server Component
export default function RootLayout({ children }: { children: ReactNode }) {
  // REMOVE const pathname = usePathname();
  // REMOVE const isBlogArticle = ... test(pathname);

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
          {children}
          {/* Render the Client Component which handles pathname logic */}
          <LayoutClient />
          <Footer />
      </body>
    </html>
  );
}