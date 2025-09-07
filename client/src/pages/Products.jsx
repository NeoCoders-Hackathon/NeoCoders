import React, { useState, useEffect } from 'react';
import { Pencil, Trash, Plus } from 'lucide-react';
import { FaRegHeart } from "react-icons/fa6";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '' // rasm uchun
  });

  // LocalStorage'dan yuklash
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const saveToLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    if (!formData.title.trim()) return;

    if (currentProduct) {
      const updatedProducts = products.map(p =>
        p.id === currentProduct.id ? { ...p, ...formData } : p
      );
      setProducts(updatedProducts);
      saveToLocalStorage(updatedProducts);
    } else {
      const newProduct = { id: Date.now(), ...formData };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      saveToLocalStorage(updatedProducts);
    }

    setFormData({ title: '', description: '', price: '', image: '' });
    setCurrentProduct(null);
    setIsDrawerOpen(false);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    saveToLocalStorage(updatedProducts);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image || ''
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-4 flex relative">
      {/* Products List */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={() => { setCurrentProduct(null); setFormData({ title:'', description:'', price:'', image:'' }); setIsDrawerOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border border-gray-300 rounded shadow-lg p-4 bg-white flex flex-col">
                {product.image && (
                  <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-3" />
                )}
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div>
                <p className="text-gray-800 font-medium mb-3">${product.price}</p>
                <FaRegHeart />
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-1"
                  >
                    <Trash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-gray-900 text-white shadow-2xl transition-transform duration-300 p-6 z-50 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className="text-xl font-bold mb-4">{currentProduct ? 'Edit Product' : 'Add Product'}</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input placeholder='Title product'
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-gray-300 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded  border border-gray-300 text-white" placeholder='description product'
            ></textarea>
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-white border border-gray-300 " placeholder='price product'
            />
          </div>
          <div>
            <label className="block mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-white border border-gray-300 rounded p-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              {currentProduct ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}
    </div>
  );
};

export default Products;
