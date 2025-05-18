
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight, QrCode } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderConfirmation() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  // Generate random delivery date (3-5 business days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3));
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <motion.div 
        className="max-w-lg mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="h-16 w-16 text-green-500" />
        </motion.div>
        
        <motion.h1 
          className="text-2xl md:text-3xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thank You for Your Order!
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          We've received your order and are getting it ready to be shipped. 
          We will notify you when your order has been shipped.
        </motion.p>
        
        <motion.div 
          className="bg-card rounded-lg border shadow-sm p-6 mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Order Number</span>
            <span className="font-bold">{orderNumber}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-sm">
            <div className="bg-accent/30 p-3 rounded-md">
              <p className="font-medium mb-1">Shipping Address</p>
              <p className="text-muted-foreground">Your order will be delivered to your provided address</p>
            </div>
            
            <div className="bg-accent/30 p-3 rounded-md">
              <p className="font-medium mb-1">Payment Method</p>
              <p className="text-muted-foreground">Payment completed successfully</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-6">
            <Package className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm">
              Estimated delivery: <span className="font-semibold">{formattedDeliveryDate}</span>
            </span>
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Scan to view order details</p>
            <div className="inline-flex justify-center mt-2 p-2 bg-white rounded-lg">
              <QrCode className="h-24 w-24 text-primary" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <Button asChild>
            <Link to="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
