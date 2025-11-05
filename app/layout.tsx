import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "DilSe Buddy",
  description:
    "Bilingual expression studio blending Hindi warmth with English flair, crafted for playful affection and heartfelt prompts.",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} bg-background font-body text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
