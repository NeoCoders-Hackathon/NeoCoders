import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react";

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setFavorites(storedFavs);
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFavorite = (product) => {
    const updatedFavs = favorites.filter((f) => f.id !== product.id);
    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
          <h1 className="text-3xl font-bold text-gray-300">My Favorites</h1>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
            {favorites.length} items
          </span>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Start adding products to your favorites to see them here</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-violet-600 hover:to-purple-600 transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => {
              const rating = 4.2 + Math.random() * 0.8;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => removeFavorite(product)}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-gray-700 ml-1">{rating.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + 10} reviews</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-green-600">${product.price}</div>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
