import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const OrderBrowse: React.FC = () => {
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/getAllOrders`).then(data => {
      setOrders(data.data)
    })
  }, [])

  
  return (
    <div className="flex p-2  bg-slate-100 ml-2 rounded-xl h-1/2 w-full ">
      <div className="w-full h-full">


        <div className=" px-2 pt-6 pb-8 h-full">
          <h1 className="text-3xl font-semibold mb-4">Orders</h1>
          <div className="list-disc list-inside overflow-auto h-72">
          <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Postal Code</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Postal code</th>
            </tr>
          </thead>
          <tbody>
          {orders.length > 0 ? (
            
              orders.map((order: any) => {
                return (
                  <tr key={order._id} id={order._id}>
                    <>
                    <td className="mb-2 border px-4 py-2">{order._id}</td>
                    <td key={order.order_userId} className="mb-2 border px-4 py-2">{order.order_userId}</td>
                    <td key={order.order_products} className="mb-2 border px-4 py-2 no-wrap">
                      
                    <select className='border'>
                    <option value="">{}</option>
                      {
                        order.order_products.map((product: any) => (
                          <option value="">{product}</option>
                        ))
                      }
                    </select>
                    <button className='ml-4 px-1 border'>Check</button>
                    
                    </td>
                    <td key={order.order_address} className="mb-2 border px-4 py-2">{order.order_address}</td>
                    <td key={order.order_postalCode} className="mb-2 border px-4 py-2">{order.order_postalCode}</td>
                    </>
                  </tr>
              )})
          ) : (
            <p>No orders found.</p>
          )}
          </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBrowse;