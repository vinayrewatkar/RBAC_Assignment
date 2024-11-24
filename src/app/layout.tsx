import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RootLayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: "Role-Based Access Control Dashboard",
  description: "Admin dashboard for managing users, roles, and permissions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}