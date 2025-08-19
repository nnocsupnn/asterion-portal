import React, { useState } from 'react';
import { FiSearch, FiAlertTriangle, FiPackage, FiDollarSign, FiUpload } from 'react-icons/fi';
import AddProduct from '../Add_Product/addProduct';
import { IoAdd } from "react-icons/io5";
const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - replace with your actual data source
  const inventoryData = [
    {
      product: 'MacBook Pro 14" Apple Inc.',
      sku: 'NBP14-801',
      category: 'Laptops',
      stock: 25,
      minStock: 5,
      price: 1999.99,
      cost: 1599.99,
      status: 'In Stock',
      notes: '',
      actions: true
    },
    {
      product: 'iPhone 15 Pro Apple Inc.',
      sku: '1P15P-801',
      category: 'Smartphones',
      stock: 3,
      minStock: 10,
      price: 999.99,
      cost: 799.99,
      status: 'Low Stock',
      notes: 'Made in Bolt',
      actions: true
    }
  ];

  const filteredProducts = inventoryData.filter(product =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = inventoryData.length;
  const inStockCount = inventoryData.filter(p => p.status === 'In Stock').length;
  const lowStockCount = inventoryData.filter(p => p.status === 'Low Stock').length;
  const outOfStockCount = inventoryData.filter(p => p.stock === 0).length;

    

  const handleAddProduct = (productData) => {
    // Handle the new product data here
    console.log('New product:', productData);
    // Add your logic to save the product
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
      {/* Text Content - Always on top on mobile, on left for larger screens */}
      <div className="text-header order-1 sm:order-1 mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Inventory Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-2 sm:mb-4">
          Manage your products, stock levels, and inventory operations
        </p>
      </div>
      
      {/* Buttons - Below text on mobile, on right for larger screens */}
      <div className="buttons order-2 sm:order-2 flex mb-2 xs:flex-col gap-2 sm:gap-3 justify-start sm:justify-end sm:mb-0 ">
        <button 
          type="button" 
          className="inline-flex items-center justify-center gap-2 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 
                    focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center 
                    dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900
                    w-full xs:w-auto"
        >
          <FiUpload className='font-bold'/> 
          <span className="whitespace-nowrap">Export</span>
        </button>
        
        <button 
          type="button" 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                  focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none 
                  dark:focus:ring-blue-800 text-center w-full xs:w-auto"
        >
          <IoAdd/> 
          <span className="whitespace-nowrap">Add Product</span>
        </button>
        
        <AddProduct
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddProduct={handleAddProduct} 
        />
      </div>
    </div>
        

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center">
              <FiPackage className="text-blue-500 mr-2" />
              <h3 className="font-medium">Total Products</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{totalProducts}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center">
              <FiPackage className="text-green-500 mr-2" />
              <h3 className="font-medium">In Stock</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{inStockCount}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center">
              <FiAlertTriangle className="text-yellow-500 mr-2" />
              <h3 className="font-medium">Low Stock</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{lowStockCount}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center">
              <FiPackage className="text-red-500 mr-2" />
              <h3 className="font-medium">Out of Stock</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{outOfStockCount}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {product.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {product.stock} <span className="text-xs text-gray-400">Min: {product.minStock}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      ${product.price.toFixed(2)} <span className="text-xs text-gray-400">Cost: ${product.cost.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'In Stock' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : product.status === 'Low Stock' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {product.status}
                      </span>
                      {product.notes && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{product.notes}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {product.actions && (
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                          ✓
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

export default InventoryPage;