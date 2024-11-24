"use client";
import React, { useState } from "react";
import Sidebar from "../app/components/sideBar";
import Header from "../app/components/headers";
import { Users, Shield, LayoutDashboard } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/pages/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/pages/users", icon: Users },
  { name: "Roles", href: "/pages/roles", icon: Shield },
];

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex bg-black">
      <Sidebar
        navigation={navigation}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          isProfileMenuOpen={isProfileMenuOpen}
          setIsProfileMenuOpen={setIsProfileMenuOpen}
        />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-black to-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}