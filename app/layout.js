import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chepkolex AI | Intelligent Execution",
  description: "Advanced AI-powered assistant for business, code, and creative growth.",
  keywords: ["AI automation", "Business intelligence", "Full-stack development", "Chepkolex AI"],
  authors: [{ name: "Denis Kipkoech" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-[#030303] text-white selection:bg-purple-500/30">
        {children}
      </body>
    </html>
  );
}