
import Script from "next/script";
import "./globals.css"
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    template: "Manic Agency",
    default: "Manic Agency",
  },
};

export default function Layout({ children }) {

  return (<html>
    <head>
    
    </head>
    <body>
      {children}
      <Footer/>
    </body>
  </html>)
  

}
