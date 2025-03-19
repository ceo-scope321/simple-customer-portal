
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  PieChart, 
  CheckSquare, 
  MessageSquare, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Pipeline', path: '/pipeline', icon: PieChart },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  { name: 'Messages', path: '/messages', icon: MessageSquare },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-elegant transition-all duration-300 ease-apple z-30
                    lg:translate-x-0 
                    lg:relative
                    lg:block
                    lg:w-64
                    lg:flex-shrink-0
                    md:w-20
                    md:translate-x-0
                    md:relative
                    md:block
                    sm:fixed
                    sm:w-64
                    sm:transition-transform
                    sm:duration-300
                    sm:ease-apple
                    sm:z-50"
          style={{ 
            transform: isMobile ? (mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none'
          }}>
      
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute right-4 top-4"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
      
      {/* Logo */}
      <div className="p-6 mb-6 flex items-center justify-center md:justify-start">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <span className="font-semibold text-xl md:block hidden">SimpleWork</span>
        </div>
      </div>
      
      {/* Navigation Links */}
      <div className="px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <li key={item.name}>
                <Link 
                  to={item.path}
                  className={cn(
                    "nav-item flex items-center space-x-3 hover:bg-secondary",
                    isActive && "active"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="md:block lg:block hidden">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-medium">JD</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Mobile Menu Toggle Button (used in AppLayout)
export function MobileMenuToggle({ onClick }: { onClick: () => void }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={onClick}
      className="lg:hidden md:hidden fixed top-4 left-4 z-40"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
