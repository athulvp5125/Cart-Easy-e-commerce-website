
import { Product } from "@/types";

export const products: Product[] = [
  // Electronics
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
  
  // Fashion
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
    id: "13",
    name: "Premium Silk Dress",
    description: "Elegant silk dress perfect for special occasions and formal events.",
    price: 12999,
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
    category: "fashion",
    inStock: true,
    rating: 4.6
  },
  {
    id: "14",
    name: "Men's Formal Suit",
    description: "Classic tailored suit that offers both comfort and style for any formal occasion.",
    price: 24999,
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    category: "fashion",
    inStock: true,
    rating: 4.8
  },
  
  // Home Electronics
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
  
  // Photography
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
  
  // Furniture
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
    id: "15",
    name: "Modern Coffee Table",
    description: "Stylish coffee table with minimalist design, perfect for contemporary living rooms.",
    price: 14999,
    imageUrl: "https://images.unsplash.com/photo-1567016526105-22da7c13161a",
    category: "furniture",
    inStock: true,
    rating: 4.3
  },
  
  // Audio
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
  
  // Appliances
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
    id: "16",
    name: "Air Fryer",
    description: "Healthy cooking made easy with this advanced air fryer. Cook crispy foods with little to no oil.",
    price: 8999,
    imageUrl: "https://images.unsplash.com/photo-1648170722333-1eee6874f59f",
    category: "appliances",
    inStock: true,
    rating: 4.7,
    featuredBadge: "Hot Deal"
  },
  
  // Audio
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
  
  // Smart Home
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
    id: "17",
    name: "Smart Security Camera",
    description: "Keep your home safe with this HD security camera featuring motion detection and night vision.",
    price: 6999,
    imageUrl: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f",
    category: "smart home",
    inStock: true,
    rating: 4.4
  },
  
  // Gaming
  {
    id: "12",
    name: "Mechanical Gaming Keyboard",
    description: "Enhance your gaming experience with this responsive mechanical keyboard with customizable RGB lighting.",
    price: 8499,
    imageUrl: "https://images.unsplash.com/photo-1595225476474-419632c2e831",
    category: "gaming",
    inStock: true,
    rating: 4.7
  },
  {
    id: "18",
    name: "Gaming Console",
    description: "Next-generation gaming console with stunning graphics and fast performance for an immersive gaming experience.",
    price: 49999,
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e",
    category: "gaming",
    inStock: true,
    rating: 4.9,
    featuredBadge: "New Gen"
  },
  
  // Beauty
  {
    id: "19",
    name: "Luxury Skincare Set",
    description: "Complete premium skincare routine with natural ingredients for radiant, healthy skin.",
    price: 12999,
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
    category: "beauty",
    inStock: true,
    rating: 4.8,
    featuredBadge: "Best Seller"
  },
  {
    id: "20",
    name: "Professional Hair Dryer",
    description: "Salon-quality hair dryer with multiple heat settings and ionic technology for quick, frizz-free drying.",
    price: 5999,
    imageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da",
    category: "beauty",
    inStock: true,
    rating: 4.5
  },
  
  // Books
  {
    id: "21",
    name: "E-Book Reader",
    description: "Ultra-thin e-reader with anti-glare screen and weeks of battery life. Holds thousands of books.",
    price: 11999,
    imageUrl: "https://images.unsplash.com/photo-1544164559-2e64cde4d1c6",
    category: "electronics",
    inStock: true,
    rating: 4.6
  },
];

export const categories = [
  "All",
  "Electronics",
  "Wearables",
  "Fashion",
  "Furniture",
  "Appliances",
  "Smart Home",
  "Gaming",
  "Beauty"
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
