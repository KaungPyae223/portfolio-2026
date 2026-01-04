// src/app/(index)/layout.tsx
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900 bg-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
