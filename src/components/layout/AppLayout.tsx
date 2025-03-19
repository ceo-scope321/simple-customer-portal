
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, MobileMenuToggle } from './Navbar';
import { Toaster } from '@/components/ui/toaster';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex w-full">
      {/* Navbar */}
      <Navbar />
      
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <MobileMenuToggle onClick={() => setMobileMenuOpen(true)} />
      )}
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen pb-6 lg:pl-0 md:pl-0">
        <div className="flex-1 p-6 md:px-8 lg:px-10 overflow-y-auto">
          <Outlet />
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
