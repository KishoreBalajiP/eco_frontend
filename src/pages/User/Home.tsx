import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import { Product } from '../../types';
import ProductGrid from '../../components/Products/ProductGrid';
import Chatbot from '../../components/Chatbot/Chatbot';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {query && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Search results for "{query}"
            </h1>
            <p className="text-gray-600 mt-2">
              {loading ? 'Searching...' : `${products.length} products found`}
            </p>
          </div>
        )}
        
        {!query && !loading && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to JayaStores</h1>
            <p className="text-lg text-gray-600">Discover quality products at wholesale prices</p>
          </div>
        )}

        <ProductGrid products={products} loading={loading} />
      </div>
      <Chatbot />
    </div>
  );
};

export default Home;