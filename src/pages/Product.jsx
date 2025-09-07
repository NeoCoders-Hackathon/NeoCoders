import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
    };
    setProducts([...products, newProduct]);
    setForm({ name: "", price: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Admin Product Panel
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-lg mx-auto space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            <PlusCircle className="w-5 h-5" /> Add Product
          </button>
        </form>

        {/* Products */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg relative"
            >
              <button
                onClick={() => handleDelete(product.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-300">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
