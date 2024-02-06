import React, { useState } from 'react';
import Axios from "axios";


const AddProductPage: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("product_name", productName);
    if(imageFile)
    {
    data.append("product_photos", imageFile);
    }
    data.append("product_price", price);
    data.append("product_category", category);
    data.append("product_description", description);
    Axios.post("http://localhost:8000/api/addProduct", data)



    // Clear form fields
    setProductName('');
    setImageFile(null);
    setPrice('');
    setCategory('');
    setDescription('');

  };

  return (
    <div className="container py-8 h-fit bg-slate-100 p-4 rounded-xl">
      <h1 className="text-3xl font-semibold text-center mb-8 " >Add Product</h1>

      <form onSubmit={handleProductSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>


        <div className="mb-4">
          <label htmlFor="imageFile" className="block font-medium mb-2">
            Image File
          </label>
          <input
            type="file"
            id="imageFile"

            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};


  export default AddProductPage