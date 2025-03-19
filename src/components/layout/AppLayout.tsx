
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, MobileMenuToggle } from './Navbar';
import { Toaster } from '@/components/ui/toaster';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Set content as loaded after initial render
  useEffect(() => {
    setContentLoaded(true);
  }, []);
  
  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <MobileMenuToggle onClick={() => setMobileMenuOpen(true)} />
      )}
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 p-6 md:px-8 lg:px-10 overflow-y-auto">
          {contentLoaded && <Outlet />}
        </div>
      </main>
      
      {/* Toaster for notifications */}
      <Toaster />
      
      {/* Mobile Menu Backdrop */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
