import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zgłoś kłusownika",
  description:
    "Pomóż w walce z kłusownictwem! Zgłaszaj nielegalne działania i ratuj dzikie zwierzęta dzięki naszej platformie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className} id="start">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
