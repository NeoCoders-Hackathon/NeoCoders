import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavs);
  }, []);

  const toggleFavourite = (product) => {
    const updatedFavs = favourites.filter((f) => f.id !== product.id);
    setFavourites(updatedFavs);
    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">❤️ Favourites</h1>

      {favourites.length === 0 ? (
        <p>No favourite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favourites.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded shadow-lg p-4 bg-white flex flex-col relative"
            >
              {/* ❤️ Like tugma (bosilsa o‘chadi) */}
              <button
                onClick={() => toggleFavourite(product)}
                className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white"
              >
                <Heart className="w-5 h-5" fill="red" />
              </button>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-800 font-medium mb-3">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
