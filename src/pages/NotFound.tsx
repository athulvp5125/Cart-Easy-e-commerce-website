
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Package } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 1] }}
          transition={{ times: [0, 0.5, 1], duration: 0.8 }}
        >
          <AlertCircle className="w-16 h-16 text-destructive" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          404
        </motion.h1>
        
        <motion.p 
          className="text-xl text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Oops! We couldn't find the page you're looking for.
        </motion.p>
        
        <motion.div 
          className="h-32 mb-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "linear"
            }}
          >
            <Package className="w-24 h-24 text-primary opacity-50" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button asChild>
            <Link to="/" className="flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
