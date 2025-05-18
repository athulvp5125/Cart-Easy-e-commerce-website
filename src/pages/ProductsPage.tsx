
import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters, FilterOptions } from "@/components/products/ProductFilters";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Calculate price range for all products
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  useEffect(() => {
    // If category is specified in URL params, apply that filter
    if (categoryParam) {
      applyFilters({
        category: categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1),
        priceRange: [minPrice, maxPrice] as [number, number],
        searchQuery: "",
        inStock: false,
        sortBy: "featured"
      });
    }
  }, [categoryParam, minPrice, maxPrice]);

  const applyFilters = (filters: FilterOptions) => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category !== "All") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply in stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        // For featured, prioritize items with featured badges, then by rating
        filtered.sort((a, b) => {
          if (a.featuredBadge && !b.featuredBadge) return -1;
          if (!a.featuredBadge && b.featuredBadge) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button 
          variant="outline" 
          onClick={toggleMobileFilters}
          className="lg:hidden flex items-center"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
      
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Mobile filter drawer */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleMobileFilters}>
            <div 
              className="absolute right-0 top-0 h-full w-[300px] bg-background p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="icon" onClick={toggleMobileFilters}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ProductFilters
                onFilterChange={applyFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </div>
          </div>
        )}
        
        {/* Desktop filters sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <ProductFilters
            onFilterChange={applyFilters}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
        
        {/* Product grid */}
        <div className="lg:col-span-3">
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
