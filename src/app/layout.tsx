import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Next",
  description: "Mi primer poryecto con next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
