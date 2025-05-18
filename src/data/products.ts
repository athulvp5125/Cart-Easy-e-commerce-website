
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Enjoy crystal-clear audio with these premium wireless headphones. Perfect for music lovers and professionals alike.",
    price: 24999,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "electronics",
    inStock: true,
    rating: 4.8,
    featuredBadge: "Best Seller"
  },
  {
    id: "2",
    name: "Ultra-Slim Laptop",
    description: "Powerful performance in an ultra-slim design. Perfect for work and entertainment on the go.",
    price: 89999,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    category: "electronics",
    inStock: true,
    rating: 4.5
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and more.",
    price: 12999,
    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    category: "wearables",
    inStock: true,
    rating: 4.3,
    featuredBadge: "New Arrival"
  },
  {
    id: "4",
    name: "Designer Leather Bag",
    description: "Handcrafted from premium leather, this designer bag combines style with functionality.",
    price: 7999,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    category: "fashion",
    inStock: true,
    rating: 4.7
  },
  {
    id: "5",
    name: "HD Smart TV",
    description: "Experience stunning visuals with this 4K Ultra HD Smart TV. Stream your favorite content with built-in apps.",
    price: 45999,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    category: "electronics",
    inStock: false,
    rating: 4.6
  },
  {
    id: "6",
    name: "Professional DSLR Camera",
    description: "Capture perfect moments with this professional-grade DSLR camera. Includes multiple lenses and accessories.",
    price: 120000,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
    category: "electronics",
    inStock: true,
    rating: 4.9,
    featuredBadge: "Premium"
  },
  {
    id: "7",
    name: "Ergonomic Office Chair",
    description: "Work in comfort with this ergonomic office chair, designed to provide optimal support for long hours.",
    price: 18999,
    imageUrl: "https://images.unsplash.com/photo-1505843490701-5be5d488e953",
    category: "furniture",
    inStock: true,
    rating: 4.4
  },
  {
    id: "8",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with premium sound quality and long battery life.",
    price: 9999,
    imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
    category: "electronics",
    inStock: true,
    rating: 4.2
  },
  {
    id: "9",
    name: "Coffee Maker Machine",
    description: "Brew perfect coffee every morning with this premium coffee maker with multiple brewing options.",
    price: 15999,
    imageUrl: "https://images.unsplash.com/photo-1570659124054-1d7639603f7a",
    category: "appliances",
    inStock: true,
    rating: 4.5
  },
  {
    id: "10",
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere with this powerful portable Bluetooth speaker with 20-hour battery life.",
    price: 8999,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "electronics",
    inStock: true,
    rating: 4.3
  },
  {
    id: "11",
    name: "Smart Home Hub",
    description: "Control all your smart home devices from one central hub with voice control capabilities.",
    price: 19999,
    imageUrl: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4",
    category: "smart home",
    inStock: true,
    rating: 4.1,
    featuredBadge: "Popular"
  },
  {
    id: "12",
    name: "Mechanical Gaming Keyboard",
    description: "Enhance your gaming experience with this responsive mechanical keyboard with customizable RGB lighting.",
    price: 8499,
    imageUrl: "https://images.unsplash.com/photo-1595225476474-419632c2e831",
    category: "gaming",
    inStock: true,
    rating: 4.7
  }
];

export const categories = [
  "All",
  "Electronics",
  "Wearables",
  "Fashion",
  "Furniture",
  "Appliances",
  "Smart Home",
  "Gaming"
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
