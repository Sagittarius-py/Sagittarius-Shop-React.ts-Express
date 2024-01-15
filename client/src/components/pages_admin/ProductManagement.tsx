import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  product_name: string;
  product_category: string;
  product_price: number;
  product_stock: number;
  product_reviews: string[];
  product_description: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    _id: '',
    product_name: '',
    product_category: '',
    product_price: 0,
    product_stock: 0,
    product_reviews: [],
    product_description: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/get').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // axios.post('/api/get', product).then((response) => {
    //   setProducts([...products, response.data]);
    // });
  };

  const handleDelete = (id: string) => {
    // axios.delete(`/api/products/${id}`).then(() => {
    //   setProducts(products.filter((product) => product._id !== id));
    // });
  };

  return (
    <div className="container mx-auto bg-slate-200 p-4 rounded-xl ml-2">
    <h1 className="text-3xl font-bold mb-4">Product List</h1>
    
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Product Name</th>
          <th className="px-4 py-2">Product Category</th>
          <th className="px-4 py-2">Product Price</th>
          <th className="px-4 py-2">Product Description</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td className="border border-black px-4 py-2">{product.product_name}</td>
            <td className="border border-black px-4 py-2">{product.product_category}</td>
            <td className="border border-black px-4 py-2">{product.product_price}</td>
            <td className="border border-black px-4 py-2">{product.product_description}</td>
            <td className="border border-black px-4 py-2">
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};


export default ProductManagement;



