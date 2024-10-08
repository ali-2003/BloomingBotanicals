import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from '../context/CartContext'; // Adjust the path if necessary


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blooming Botanicals",
  description: "Hair Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head> <link rel="icon" href="/images/logo.png" /></head>
      
      <body
        className="{`${geistSans.variable} ${geistMono.variable} antialiased`} min-h-screen flex flex-col"
        style={{
          backgroundImage: 'url("/images/bg.jpg")', // Path to your background image
          backgroundSize: "cover",  // Adjust to "contain" if you prefer that
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // Keeps background fixed during scroll
          backgroundPosition: "center",
        }}
      >
        {/* Move Navbar inside the body tag */}
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"/>
        
        <Navbar />
        <CartProvider>
        {children}
        </CartProvider>
        <Footer />
        
      </body>
      
    </html>
  );
}




// app/layout.tsx



