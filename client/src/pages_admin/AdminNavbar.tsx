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

export default AdminNavbar