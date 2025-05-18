
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { products, formatPrice } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check, Minus, Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Find product by ID (in a real app, this would be an API call)
    const foundProduct = products.find((p) => p.id === id) || null;
    setProduct(foundProduct);
    
    // Reset quantity when product changes
    setQuantity(1);

    // Find related products (same category or similar price range)
    if (foundProduct) {
      const related = products
        .filter(
          (p) =>
            p.id !== foundProduct.id &&
            (p.category === foundProduct.category ||
              Math.abs(p.price - foundProduct.price) < 15000)
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add product multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }

      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} added to your cart.`,
      });
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden border">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <div className="mb-2">
            <Link
              to="/products"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Products
            </Link>
            {" > "}
            <Link
              to={`/products?category=${product.category}`}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {product.category}
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
            {!product.inStock && (
              <Badge variant="destructive" className="mt-2">
                Out of Stock
              </Badge>
            )}
            {product.featuredBadge && (
              <Badge className="mt-2 ml-2 bg-primary">
                {product.featuredBadge}
              </Badge>
            )}
          </div>

          <div className="border-t border-b py-4 my-4">
            <p className="mb-4">{product.description}</p>
            
            {product.inStock ? (
              <div className="flex items-center text-sm text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span>In Stock & Ready to Ship</span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Currently unavailable
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <button
                className="border rounded-l-md p-2"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.inStock}
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="border-t border-b px-6 py-2">{quantity}</div>
              <button
                className="border rounded-r-md p-2"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Button
              className="w-full"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          <div className="bg-muted rounded-md p-4 text-sm">
            <h3 className="font-semibold mb-2">Have questions about this product?</h3>
            <p className="text-muted-foreground">
              Use our DevAI shopping assistant for information about specifications,
              compatibility, or anything else.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
