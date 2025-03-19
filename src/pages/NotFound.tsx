
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="w-full max-w-md text-center space-y-5">
        <h1 className="text-6xl font-bold tracking-tight text-primary animate-float">404</h1>
        <h2 className="text-2xl font-medium mt-2">Page not found</h2>
        <p className="text-muted-foreground mt-4">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button className="mt-8" size="lg" asChild>
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
