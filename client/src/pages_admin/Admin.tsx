import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AdminPanel from './AdminPanel';
import AddProductPage from './AddProductPage';
import OrderBrowse from './OrderBrowse';
import UserManagement from './UserManagement';

const AdminNavbar: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-lg font-semibold">Admin Panel</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <a href="/admin/addProduct" className='text-white'>Add Product</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};


const Admin = () => {
    return(
        <>
          <AdminNavbar />
          <div className='flex'>
            <div id="leftPanel" className='w-1/5 h-screen bg-slate-600 p-2'>
            <AddProductPage/> 

            </div>
            <div id="rightPanel" className='w-4/5 h-screen p-2 flex bg-slate-500'>

                  <OrderBrowse />
                  <UserManagement />
            </div>
            </div>
        </>
    )
}





export {Admin};