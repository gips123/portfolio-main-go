import type { Metadata } from "next";
import { Poppins, Anton } from "next/font/google";
import "./globals.css";
import TransitionProvider from "./components/transitions/TransitionProvider";
import Navbar from "./components/navigation/Navbar";
import InitialSplashScreen from "./components/transitions/InitialSplashScreen";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Portfolio - Ghifary Ahmad Alfirdausy",
  description: "Ghifary Ahmad Alfirdausy's Portfolio",
  icons: {
    icon: "/assets/gips-icon.png",
    shortcut: "/assets/gips-icon.png",
    apple: "/assets/gips-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${anton.variable} antialiased`}
      >
        <InitialSplashScreen />
        <Navbar />
        <TransitionProvider>
        {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
