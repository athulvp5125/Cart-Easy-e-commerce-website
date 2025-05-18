
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/data/products";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  searchQuery: string;
  inStock: boolean;
  sortBy: string;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  minPrice: number;
  maxPrice: number;
}

export function ProductFilters({ onFilterChange, minPrice, maxPrice }: ProductFiltersProps) {
  // Default filter state
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    priceRange: [minPrice, maxPrice],
    searchQuery: "",
    inStock: false,
    sortBy: "featured",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  // Effect to process URL search parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setFilters({
        ...filters,
        category: categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1),
      });
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Effect to apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category,
    });
    onFilterChange({
      ...filters,
      category,
    });
  };

  const handlePriceChange = (value: number[]) => {
    // Ensure the array has exactly two elements
    const priceRange: [number, number] = [value[0] ?? minPrice, value[1] ?? maxPrice];
    
    setFilters({
      ...filters,
      priceRange,
    });
    onFilterChange({
      ...filters,
      priceRange,
    });
  };

  const handleInStockChange = (checked: boolean) => {
    setFilters({
      ...filters,
      inStock: checked,
    });
    onFilterChange({
      ...filters,
      inStock: checked,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      sortBy: e.target.value,
    });
    onFilterChange({
      ...filters,
      sortBy: e.target.value,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value,
    });
    onFilterChange({
      ...filters,
      searchQuery: e.target.value,
    });
  };

  const clearSearch = () => {
    setFilters({
      ...filters,
      searchQuery: "",
    });
    onFilterChange({
      ...filters,
      searchQuery: "",
    });
  };

  const resetFilters = () => {
    const resetState: FilterOptions = {
      category: "All",
      priceRange: [minPrice, maxPrice],
      searchQuery: "",
      inStock: false,
      sortBy: "featured",
    };
    setFilters(resetState);
    onFilterChange(resetState);
    setSearchParams({});
  };

  // Available categories
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home",
    "Beauty",
    "Sports",
    "Wearables",
    "Automotive",
  ];

  return (
    <div className="bg-card rounded-md p-4 border">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
          {filters.searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <Button
                  variant={filters.category === category ? "default" : "ghost"}
                  className="justify-start h-auto py-1.5 px-3 text-sm w-full"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="px-2">
            <Slider
              min={minPrice}
              max={maxPrice}
              step={100}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {formatPrice(filters.priceRange[0])}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(filters.priceRange[1])}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Availability</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={handleInStockChange}
            />
            <Label htmlFor="in-stock">In stock only</Label>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Sort By</h3>
          <select
            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
            value={filters.sortBy}
            onChange={handleSortChange}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>

        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
