
import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters, FilterOptions } from "@/components/products/ProductFilters";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useSearchParams } from "react-router-dom";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1 mb-6 lg:mb-0">
          <ProductFilters
            onFilterChange={applyFilters}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
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
