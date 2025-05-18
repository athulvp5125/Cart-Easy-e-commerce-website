
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Check, Loader, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Shipping cost calculation
  const shippingCost = cartTotal > 50000 ? 0 : 500;
  const taxAmount = cartTotal * 0.18;
  const totalAmount = cartTotal + shippingCost + taxAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    let requiredFields = ['fullName', 'email', 'address', 'city', 'state', 'zipCode'];
    
    // Add card fields to validation if card payment method is selected
    if (paymentMethod === 'card') {
      requiredFields = [...requiredFields, 'cardNumber', 'cardExpiry', 'cardCvc'];
    }
    
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to complete your order.",
        variant: "destructive",
      });
      return;
    }
    
    // Process payment (mock)
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order successful!",
        description: "Thank you for your purchase. Your order has been placed.",
      });
      clearCart();
      navigate("/order-confirmation");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add items to your cart before proceeding to checkout.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/cart" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-card rounded-lg border shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input 
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-card rounded-lg border shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              
              <Tabs defaultValue="card" onValueChange={value => setPaymentMethod(value)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="card" className="flex items-center justify-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Card Payment
                  </TabsTrigger>
                  <TabsTrigger value="qr" className="flex items-center justify-center">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Payment
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="mt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input 
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input 
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="qr" className="mt-0">
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="relative">
                        <QrCode className="w-48 h-48 text-black" strokeWidth={1} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-full p-2">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                              alt="G Pay" 
                              className="h-8 w-8" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="font-medium text-lg mb-1">Scan to Pay {formatPrice(totalAmount)}</p>
                      <p className="text-sm text-muted-foreground">Open your payment app and scan this QR code</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex flex-col items-center p-2 border rounded-md hover:bg-accent/50 cursor-pointer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Google_Pay_Logo.svg" alt="Google Pay" className="h-8 mb-2" />
                        <span className="text-xs">Google Pay</span>
                      </div>
                      <div className="flex flex-col items-center p-2 border rounded-md hover:bg-accent/50 cursor-pointer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-8 mb-2" />
                        <span className="text-xs">Paytm</span>
                      </div>
                      <div className="flex flex-col items-center p-2 border rounded-md hover:bg-accent/50 cursor-pointer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-8 mb-2" />
                        <span className="text-xs">PhonePe</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Ready to accept payment</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'card' ? 
                      <CreditCard className="mr-2 h-4 w-4" /> : 
                      <QrCode className="mr-2 h-4 w-4" />
                    }
                    Complete Order
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-card rounded-lg border shadow-sm p-6 sticky top-24"
          >
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="max-h-64 overflow-y-auto space-y-4 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-md border overflow-hidden mr-2">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{cartTotal > 50000 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (18%)</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Free shipping on orders over ₹50,000</p>
              <p className="mt-2 flex items-center">
                <Check className="w-4 h-4 mr-1 text-green-500" /> 
                Secure payment processing
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
