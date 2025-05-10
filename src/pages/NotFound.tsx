
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen pet-background flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="bg-pettalk-blue rounded-full p-4 inline-block mb-6">
          <div className="text-white text-3xl font-bold">404</div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button className="bg-pettalk-blue hover:bg-blue-700">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
