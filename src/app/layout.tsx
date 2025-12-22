// src/app/(index)/layout.tsx
import NavBar from "@/features/global/components/Nav";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900 bg-white transition-colors duration-300">{children}</body>
    </html>
  );
}
