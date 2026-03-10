import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Automaxions",
  description: "AI-Powered Automation Solutions for Modern Businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
