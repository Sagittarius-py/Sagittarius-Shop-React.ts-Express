import React, { useState } from 'react';

const OrderBrowse: React.FC = () => {
  const [orders, setOrders] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated data for demonstration purposes
    const dummyData = [
      'Order 1',
      'Order 2',
      'Order 3',
      'Order 4',
      'Order 5',
    ];

    // Simulating an API call to fetch orders
    setTimeout(() => {
      setOrders(dummyData);
    }, 1000);
  };

  return (
    <div className="flex w-2/3 p-4 bg-slate-100 mx-2 rounded-xl h-fit">
      <div className="w-full">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSearch}>
          <h2 className="text-2xl font-semibold mb-6 text-center">Order Browse</h2>

          <div className="mb-4">
            <label htmlFor="search" className="block font-medium mb-2">
              Search Orders
            </label>
            <input
              type="text"
              id="search"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </div>
        </form>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-semibold mb-6">Orders</h2>

          {orders.length > 0 ? (
            <ul className="list-disc list-inside">
              {orders.map((order) => (
                <li key={order} className="mb-2">
                  {order}
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderBrowse;