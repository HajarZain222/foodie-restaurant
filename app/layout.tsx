import "./globals.css";
import Navbar from './../components/Navbar/Navbar'

import { Inter } from "next/font/google";

const interFont = Inter({ subsets: ["latin"]});
console.log(interFont);

export const metadata = {
  title: "Foodie Restaurant",
  description: "Foodie Restaurant"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-full flex flex-col ${interFont.className}`}>
        <nav>
          <Navbar />
        </nav>

        <main>{children}</main>

        <footer>
          {/* <Footer /> */}
        </footer>
      </body>
    </html>
  );
}
