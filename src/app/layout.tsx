import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "../store/userContext"; // Corrected the path
 // Corrected the path

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrapping the children with the context providers */}
        <UserProvider>
            {children}
        </UserProvider>
      </body>
    </html>
  );
}
