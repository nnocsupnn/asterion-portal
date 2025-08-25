import React, { useState, useEffect } from "react";
import { 
  FiX, FiSave, FiEdit3, FiPlus, FiTrash2, FiTag, 
  FiPackage, FiShoppingBag, FiImage, FiDollarSign,
  FiBox, FiLayers, FiMinusCircle, FiBarChart2 
} from "react-icons/fi";
import { categories } from "../../data/mockdata";

const EditProduct = ({ isOpen, onClose, product, onSave }) => {
  if (!isOpen || !product) return null;

  const [formData, setFormData] = useState(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle variant changes
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };


  // Add new variant
  const addVariant = () => {
    const newVariant = {
        id: `variant-${Date.now()}`,
        name: "",
        sku: "",
        stock: 0,
        minStock: 1,
        price: 0,
        costPrice: 0,
        weight: 0,
        image: "",
    };

    setFormData((prev) => ({
        ...prev,
        variants: [...prev.variants, newVariant],
    }));

    // 👇 Scroll to bottom after rendering
    setTimeout(() => {
        const container = document.getElementById("modal-container");
        if (container) {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
        }
    }, 100);
  };


  // Remove variant
  const removeVariant = (index) => {
    if (formData.variants.length <= 1) {
      alert("Product must have at least one variant");
      return;
    }
    
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  // Calculate profit for a variant
  const calculateProfit = (price, costPrice) => {
    if (!costPrice || costPrice === 0) return 0;
    return ((price - costPrice) / costPrice) * 100;
  };

  // Save product
  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  // Generate status based on stock levels
  const getStatusFromStock = (variants) => {
    const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
    const minStock = Math.min(...variants.map(v => v.minStock));
    
    if (totalStock === 0) return "Out of Stock";
    if (totalStock <= minStock) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div id="modal-container" className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-modal-appear border border-gray-200/50 dark:border-gray-700/30">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/60 dark:border-gray-700/50">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                <FiEdit3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Edit Product
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update product details and inventory information
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110 group"
            >
              <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Product Image & Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Image Section */}
              <div className="lg:col-span-1 space-y-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FiImage className="w-4 h-4" /> Product Image
                </label>
                <div className="relative border-2 border-dashed border-gray-300/70 dark:border-gray-600/50 rounded-2xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm h-64 flex flex-col items-center justify-center">
                  {formData.image ? (
                    <>
                      <img 
                        src={formData.image} 
                        alt={formData.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10 hidden flex-col items-center justify-center">
                        <FiImage className="w-12 h-12 text-gray-400/70 mb-3" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">Image failed to load</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <FiImage className="w-16 h-16 text-gray-400/70 mb-3" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">No image available</p>
                      <button className="mt-3 px-4 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                        Upload Image
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-gradient-to-r from-blue-50/30 to-indigo-50/30 dark:from-blue-900/10 dark:to-indigo-900/10 p-5 rounded-2xl border border-gray-100/50 dark:border-gray-700/30">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <FiTag className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Basic Information
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-800/70 rounded-xl dark:text-white border border-gray-300/70 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Brand & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Brand *
                        </label>
                        <input
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          placeholder="Enter brand name"
                          className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-800/70 rounded-xl dark:text-white border border-gray-300/70 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-800/70 rounded-xl dark:text-white border border-gray-300/70 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Status (auto-calculated) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <div className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-800/70 rounded-xl dark:text-white border border-gray-300/70 dark:border-gray-600/50">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          getStatusFromStock(formData.variants) === "In Stock" 
                            ? "bg-green-100 text-green-800" 
                            : getStatusFromStock(formData.variants) === "Low Stock"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {getStatusFromStock(formData.variants)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          (Auto-calculated based on stock levels)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variants Section */}
            <div className="bg-gradient-to-r from-purple-50/30 to-pink-50/30 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-2xl border border-gray-100/50 dark:border-gray-700/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <FiPackage className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Product Variants
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage different variations of this product
                  </p>
                </div>
                <button
                  onClick={addVariant}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-600/40"
                >
                  <FiPlus className="w-4 h-4" /> Add Variant
                </button>
              </div>

              <div className="space-y-4">
                {formData.variants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="bg-white dark:bg-gray-800/70 rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <FiLayers className="w-4 h-4 text-blue-500" />
                        Variant {index + 1}
                      </h4>
                      {formData.variants.length > 1 && (
                        <button
                          onClick={() => removeVariant(index)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Remove variant"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                      {/* Variant Name */}
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Variant Name
                        </label>
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                          className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300/70 dark:border-gray-600/50 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Variant name"
                        />
                      </div>

                      {/* SKU */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          SKU
                        </label>
                        <input
                          type="text"
                          value={variant.sku}
                          onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                          className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300/70 dark:border-gray-600/50 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="SKU"
                        />
                      </div>

                      {/* Stock */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Stock
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={variant.stock}
                          onChange={(e) => handleVariantChange(index, "stock", Number(e.target.value))}
                          className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300/70 dark:border-gray-600/50 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      {/* Min Stock */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Min Stock
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={variant.minStock}
                          onChange={(e) => handleVariantChange(index, "minStock", Number(e.target.value))}
                          className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300/70 dark:border-gray-600/50 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Price (₱)
                        </label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, "price", Number(e.target.value))}
                            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300/70 dark:border-gray-600/50 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Cost Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cost (₱)
                        </label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={variant.costPrice}
                            onChange={(e) => handleVariantChange(index, "costPrice", Number(e.target.value))}
                            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300/70 dark:border-gray-600/50 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Profit Indicator */}
                    {variant.costPrice > 0 && (
                      <div className="mt-4 flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <FiBarChart2 className="w-4 h-4 text-green-500" />
                          <span className="font-medium">Profit:</span>
                          <span className={calculateProfit(variant.price, variant.costPrice) >= 0 ? "text-green-600" : "text-red-600"}>
                            {calculateProfit(variant.price, variant.costPrice).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-3 w-px bg-gray-300 dark:bg-gray-600"></div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Margin:</span>
                          <span className="text-blue-600">
                            ₱{(variant.price - variant.costPrice).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-200/60 dark:border-gray-700/50">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-3.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                <FiSave className="w-5 h-5" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EditProduct;