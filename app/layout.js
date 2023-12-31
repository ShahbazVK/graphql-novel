import { Inter } from "next/font/google";
import "./globals.css";
import { Client } from "./components/Client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Client children={children}></Client>
        {/* {children} */}
      </body>
    </html>
  );
}
