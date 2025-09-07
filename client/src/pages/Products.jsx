import React, { useState, useEffect } from 'react';
import { Pencil, Trash, Plus, Heart, Star } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', image: '' });

  // LocalStorage dan ma'lumotlarni olish
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setProducts(storedProducts);
    setFavourites(storedFavourites);
  }, []);

  // products o‘zgarganda localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // favourites o‘zgarganda localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    if (!formData.title.trim()) return;

    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? { ...p, ...formData } : p));
    } else {
      setProducts([...products, { id: Date.now(), ...formData }]);
    }

    setFormData({ title: '', description: '', price: '', image: '' });
    setCurrentProduct(null);
    setIsDrawerOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setFavourites(favourites.filter(f => f.id !== id));
    setMenuOpenId(null);
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
    setMenuOpenId(null);
  };

  const toggleFavourite = (product) => {
    const isFav = favourites.some(f => f.id === product.id);
    setFavourites(isFav ? favourites.filter(f => f.id !== product.id) : [...favourites, product]);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => { setCurrentProduct(null); setFormData({ title: '', description: '', price: '', image: '' }); setIsDrawerOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {favourites.length > 0 && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-pink-50 border border-pink-200 rounded-lg">
          <h2 className="text-lg font-semibold text-pink-800 mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5" fill="red" /> Favourites ({favourites.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {favourites.map(fav => (
              <span key={fav.id} className="px-3 py-1 bg-pink-200 text-pink-800 rounded-full text-sm">{fav.title}</span>
            ))}
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products added yet.</p>
          <p className="text-gray-400">Click "Add Product" to get started!</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => {
            const isFav = favourites.some(f => f.id === product.id);
            const rating = 3.9;
            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group">

                <div className="absolute top-4 left-4 z-10">
                  <button
                    onClick={() => toggleFavourite(product)}
                    className={`p-2 rounded-full transition-all duration-200 ${isFav ? "bg-red-500 text-white shadow-lg hover:shadow-xl" : "bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500"}`}
                  >
                    <Heart className="w-5 h-5" fill={isFav ? "white" : "none"} />
                  </button>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setMenuOpenId(menuOpenId === product.id ? null : product.id)}
                    className="text-gray-600 hover:text-gray-900 font-bold px-2 py-1 bg-white/90 rounded-full shadow-md"
                  >
                    ⋮
                  </button>
                  {menuOpenId === product.id && (
                    <div className="absolute top-8 right-0 bg-white shadow-lg border border-gray-200 rounded-lg z-20 min-w-[120px]">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                      >
                        <Pencil className="w-4 h-4 text-gray-950" /> <p className='text-gray-950'>Edit</p>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600"
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><span>No Image</span></div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-3 capitalize">men's clothing</span>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-600">${product.price}</div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">Buy</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-950">{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Product Title *" className="w-full p-2 border rounded-lg text-gray-950" />
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Description" className="w-full p-2 border rounded-lg text-gray-950" />
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="w-full p-2 border rounded-lg text-gray-950" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-lg text-gray-950" />
              {formData.image && <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mt-2 text-gray-950" />}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsDrawerOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-950">Cancel</button>
              <button onClick={handleSaveProduct} disabled={!formData.title.trim()} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">{currentProduct ? 'Update' : 'Add'} Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
