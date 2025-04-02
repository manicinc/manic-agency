
import Script from "next/script";
import "./globals.css"

export const metadata = {
  title: {
    template: "Manic Agency",
    default: "Manic Agency",
  },
};

export default function Layout({ children }) {

  return (<html>
    <head>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" async></Script>
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js" async></Script>

        <Script src="/globe.js"></Script>
    </head>
    <body>
      {children}
    </body>
  </html>)
  

}
