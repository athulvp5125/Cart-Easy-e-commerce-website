
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/data/products";
import { formatPrice } from "@/data/products";

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  minPrice: number;
  maxPrice: number;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  searchQuery: string;
  inStock: boolean;
  sortBy: string;
}

export function ProductFilters({
  onFilterChange,
  minPrice,
  maxPrice,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    priceRange: [minPrice, maxPrice],
    searchQuery: "",
    inStock: false,
    sortBy: "featured",
  });

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: any
  ) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: "All",
      priceRange: [minPrice, maxPrice],
      searchQuery: "",
      inStock: false,
      sortBy: "featured",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="mt-1">
              <Input
                id="search"
                placeholder="Search products..."
                value={filters.searchQuery}
                onChange={(e) =>
                  handleFilterChange("searchQuery", e.target.value)
                }
              />
            </div>
          </div>
          
          <Accordion type="single" collapsible defaultValue="category">
            <AccordionItem value="category">
              <AccordionTrigger className="text-sm font-medium">
                Categories
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div className="flex items-center space-x-2" key={category}>
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.category === category}
                        onCheckedChange={() =>
                          handleFilterChange("category", category)
                        }
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="price">
              <AccordionTrigger className="text-sm font-medium">
                Price Range
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  min={minPrice}
                  max={maxPrice}
                  step={1000}
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value)
                  }
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {formatPrice(filters.priceRange[0])}
                  </span>
                  <span className="text-sm">
                    {formatPrice(filters.priceRange[1])}
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="options">
              <AccordionTrigger className="text-sm font-medium">
                Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="instock"
                    checked={filters.inStock}
                    onCheckedChange={() =>
                      handleFilterChange("inStock", !filters.inStock)
                    }
                  />
                  <label
                    htmlFor="instock"
                    className="text-sm cursor-pointer"
                  >
                    In Stock Only
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div>
            <Label htmlFor="sort">Sort By</Label>
            <select
              id="sort"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-1"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
              <option value="rating-desc">Rating: Highest First</option>
            </select>
          </div>
          
          <Button className="w-full" variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
