"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect, useRef } from "react";
import SplashScreen from "./SplashScreen";

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(true);
  const prevPathnameRef = useRef(pathname);
  const [isSplashActive, setIsSplashActive] = useState(false);
  
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setShowContent(false);
      setIsSplashActive(true);
      
      const timer = setTimeout(() => {
        setShowContent(true);
        setIsSplashActive(false);
        prevPathnameRef.current = pathname;
      }, 2250);
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);
  
  return (
    <div className="w-full min-h-screen bg-[#1a1a1a]" style={{ backgroundColor: '#1a1a1a' }}>
      {showContent && (
        <div key={pathname} className="w-full">
          {children}
        </div>
      )}
      {isSplashActive && <SplashScreen />}
    </div>
  );
}

