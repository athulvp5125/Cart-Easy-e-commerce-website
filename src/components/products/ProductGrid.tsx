
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No products found matching your criteria.</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product, index) => (
        <motion.div key={product.id} custom={index}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
