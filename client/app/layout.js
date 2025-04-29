import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import { Lexend } from "next/font/google";

export const metadata = {
  title: "TigerVerse - Bangladesh Cricket Team",
  description: "Explore the legacy and history of Bangladesh cricket team",
};

import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
});

const lexend = Lexend({   
  subsets: ['latin'],
  weight: ['400'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={[poppins].className} >
      <body >
        <NavigationBar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}


