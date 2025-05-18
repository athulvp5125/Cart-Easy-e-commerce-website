
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderConfirmation() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        
        <p className="text-muted-foreground mb-6">
          We've received your order and are getting it ready to be shipped. 
          We will notify you when your order has been shipped.
        </p>
        
        <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Order Number</span>
            <span className="font-bold">{orderNumber}</span>
          </div>
          
          <div className="flex items-center justify-center mt-6">
            <Package className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Estimated delivery: 3-5 business days
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
