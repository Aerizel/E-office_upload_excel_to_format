import type { Metadata } from "next";
import "./globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "../components/Navbar";
import { LanguageProvider } from "./LanguageContext";

export const metadata: Metadata = {
  title: "Converting Document",
  description: "Converting Document",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ntLogo.png" sizes="any" />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
