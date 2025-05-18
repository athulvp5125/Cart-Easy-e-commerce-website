
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild>
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-card rounded-lg border shadow-sm p-6 mb-4">
            <div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-muted-foreground mb-4">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <Separator className="mb-4" />

            {items.map((item) => (
              <div key={item.product.id} className="py-4 border-b last:border-b-0">
                <div className="md:grid md:grid-cols-12 flex flex-col gap-4">
                  {/* Product */}
                  <div className="col-span-6">
                    <div className="flex space-x-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <Link 
                            to={`/products/${item.product.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.product.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 flex md:justify-center items-center">
                    <div className="md:hidden font-medium mr-2">Price:</div>
                    <div>{formatPrice(item.product.price)}</div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex md:justify-center items-center">
                    <div className="md:hidden font-medium mr-2">Quantity:</div>
                    <div className="flex items-center border rounded-md">
                      <button
                        className="p-1 px-2"
                        onClick={() =>
                          handleQuantityChange(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="p-1 px-2"
                        onClick={() =>
                          handleQuantityChange(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 flex md:justify-end items-center">
                    <div className="md:hidden font-medium mr-2">Total:</div>
                    <div className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="outline" asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-card rounded-lg border shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{cartTotal > 50000 ? "Free" : formatPrice(500)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(cartTotal * 0.18)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>
                {formatPrice(
                  cartTotal + (cartTotal > 50000 ? 0 : 500) + cartTotal * 0.18
                )}
              </span>
            </div>
            
            <Button className="w-full mt-6" asChild>
              <Link to="/checkout">
                <CreditCard className="mr-2 h-4 w-4" />
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Free shipping on orders over ₹50,000</p>
              <p className="mt-2">
                Need help? Contact our customer support or check our FAQ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
