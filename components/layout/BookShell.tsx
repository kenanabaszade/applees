"use client";

import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";

export function BookShell({ children }: { children: ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    setSidebarWidth(saved === "true" ? 64 : 260);

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    const handleSidebarToggle = () => {
      const collapsed = localStorage.getItem("sidebar-collapsed") === "true";
      setSidebarWidth(collapsed ? 64 : 260);
    };

    window.addEventListener("sidebar-toggle", handleSidebarToggle);
    
    return () => {
      window.removeEventListener("sidebar-toggle", handleSidebarToggle);
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-fg">
      <Sidebar />
      <div 
        className="w-full transition-all duration-300 ease-in-out"
        style={{ 
          paddingLeft: isDesktop ? `${sidebarWidth}px` : '0px' 
        }}
      >
        <main
          id="main-content"
          className="w-full"
          role="main"
          aria-label="Main content"
        >
          <div className="container-docs mx-auto px-6 py-12 lg:px-8 lg:py-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
