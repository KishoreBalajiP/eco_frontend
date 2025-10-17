import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import { Product } from '../../types';
import ProductGrid from '../../components/Products/ProductGrid';
import Chatbot from '../../components/Chatbot/Chatbot';

// Added import for animations
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productsAPI.getProducts(query);
        setProducts(response.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    // Animated wrapper for whole page
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {query && (
          // Fade-in animation for search header
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-900">
              Search results for "{query}"
            </h1>
            <p className="text-gray-600 mt-2">
              {loading ? 'Searching...' : `${products.length} products found`}
            </p>
          </motion.div>
        )}
        
        {!query && !loading && (
          // Subtle slide animation for welcome section
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to JayaStores</h1>
            <p className="text-lg text-gray-600">Discover quality products at wholesale prices</p>
          </motion.div>
        )}

        {/* Fade-in for product grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProductGrid products={products} loading={loading} />
        </motion.div>
      </div>

      {/* Smooth entry for chatbot */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Chatbot />
      </motion.div>
    </motion.div>
  );
};

export default Home;
