import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Automaxions | AI Calling That Brings Leads Back",
  description:
    "Recover missed leads and qualify prospects with a friendly 24/7 AI calling system. Setup within 24 hours with a 15-day free trial.",
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
