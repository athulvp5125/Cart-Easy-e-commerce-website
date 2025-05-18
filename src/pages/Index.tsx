
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { ArrowRight, ShieldCheck, Truck, BarChart3, MessageSquare } from "lucide-react";
import { Product } from "@/types";

export default function Index() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get featured products (in a real app, this would come from an API)
    const featured = products
      .filter((product) => product.featuredBadge || product.rating >= 4.5)
      .slice(0, 4);
    setFeaturedProducts(featured);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Shop Smarter with Our AI Assistant
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover products, get recommendations, and have your questions answered in real-time with DevAI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/products">Browse Products</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Try DevAI Assistant
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 p-4">
              <img
                src="https://images.unsplash.com/photo-1698778574857-990dd1d1ab9c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Shopping with AI"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" asChild>
              <Link to="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Shop with CartEasy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-muted-foreground">
                Our platform uses the latest security measures to keep your data safe and protected.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
              <p className="text-muted-foreground">
                Get personalized product recommendations and answers from our DevAI assistant.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Enjoy quick and reliable shipping on all your orders with real-time tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/products?category=Electronics" className="group">
              <div className="bg-accent aspect-square rounded-lg overflow-hidden relative flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1519558260268-cde7e03a0152"
                  alt="Electronics"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold relative z-10">Electronics</h3>
              </div>
            </Link>
            <Link to="/products?category=Wearables" className="group">
              <div className="bg-accent aspect-square rounded-lg overflow-hidden relative flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1617043786394-f977fa12eddf"
                  alt="Wearables"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold relative z-10">Wearables</h3>
              </div>
            </Link>
            <Link to="/products?category=Fashion" className="group">
              <div className="bg-accent aspect-square rounded-lg overflow-hidden relative flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                  alt="Fashion"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold relative z-10">Fashion</h3>
              </div>
            </Link>
            <Link to="/products?category=Home" className="group">
              <div className="bg-accent aspect-square rounded-lg overflow-hidden relative flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f"
                  alt="Home"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold relative z-10">Home</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
