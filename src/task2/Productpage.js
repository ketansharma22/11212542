
import React, { useState, useEffect } from 'react';
import axiosInstance from '../task2/api';


const ProductPage = () => {

const API_BASE_URL = 'http://20.244.56.144/test';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from different endpoints using the axios instance
        const laptops = await fetchProducts('companies/AMZ/categories/Laptop/products', 'Laptops');
        const phones = await fetchProducts('companies/FLP/categories/Phone/products', 'Phones');
        const tablets = await fetchProducts('companies/SNP/categories/Tablet/products', 'Tablets');

        const allProducts = [...laptops, ...phones, ...tablets];

        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProducts = async (company, category) => {
    const url = `${API_BASE_URL}/companies/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`;
  
    try {
      const response = await axiosInstance.get(url);
      return response.data.products;
    } catch (error) {
      throw new Error(`Error fetching products from ${company}/${category}: "error"`);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;