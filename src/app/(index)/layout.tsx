import type { Metadata } from "next";
import NavBar from "@/features/global/components/Nav";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Kaung Pyae's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
