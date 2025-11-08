import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog App",
  description: "A simple blog application built with Next.js and Tailwind CSS",
}

type RootLayoutProps = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className="light">
      <body>
        {children}
      </body>
    </html>
  );
}
