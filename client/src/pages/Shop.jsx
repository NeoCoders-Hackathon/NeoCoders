import React, { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart, Search, Filter, Grid, List } from 'lucide-react';

const Shop = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setProducts(storedProducts);
        setFavorites(storedFavorites);
        setCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const toggleFavorite = (product) => {
        const isFav = favorites.some(f => f.id === product.id);
        setFavorites(isFav ? favorites.filter(f => f.id !== product.id) : [...favorites, product]);
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

    const categories = ['all', ...new Set(products.map(p => p.category || 'uncategorized'))];

    const filteredProducts = products
        .filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'all' || product.category === selectedCategory)
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low': return parseFloat(a.price) - parseFloat(b.price);
                case 'price-high': return parseFloat(b.price) - parseFloat(a.price);
                case 'name': return a.title.localeCompare(b.title);
                default: return 0;
            }
        });

    const getCartItemCount = () => cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br ">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1e1e3f] to-[#2b2b55] text-white  border-violet-500/20 shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-gray-300">Welcome to NeoShop</h1>
                            <div className="relative">
                                <ShoppingCart className="w-6 h-6 text-gray-600" />
                                {getCartItemCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-gray-300 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {getCartItemCount()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-950 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent w-full sm:w-64 text-gray-300"
                                />
                            </div>

                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-950 rounded-lg focus:ring-2 focus:ring-violet-500 text-gray-300"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className='bg-white text-black'>
                                        {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-950 rounded-lg focus:ring-2 focus:ring-violet-500 text-gray-400"
                            >
                                <option className='bg-white text-black' value="name">Sort by Name</option>
                                <option className='bg-white text-black' value="price-low">Price: Low to High</option>
                                <option className='bg-white text-black' value="price-high">Price: High to Low</option>
                            </select>

                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-violet-500 text-white' : 'bg-black text-gray-600'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 ${viewMode === 'list' ? 'bg-violet-500 text-white' : 'bg-black text-gray-600'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🛍️</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                        <p className=" text-black">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className={viewMode === 'grid'
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                    }>
                        {filteredProducts.map(product => {
                            const isFav = favorites.some(f => f.id === product.id);
                            const rating = 4.2 + Math.random() * 0.8;

                            return viewMode === 'grid' ? (
                                <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
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
                                            onClick={() => toggleFavorite(product)}
                                            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${isFav ? "bg-red-500 text-white shadow-lg" : "bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500"
                                                }`}
                                        >
                                            <Heart className="w-4 h-4" fill={isFav ? "white" : "none"} />
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

                                        <div className="flex items-center justify-between">
                                            <div className="text-2xl font-bold text-green-600">${product.price}</div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex gap-6">
                                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {product.image ? (
                                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <span>No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-800 text-lg">{product.title}</h3>
                                            <button
                                                onClick={() => toggleFavorite(product)}
                                                className={`p-2 rounded-full transition-all duration-200 ${isFav ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                                                    }`}
                                            >
                                                <Heart className="w-4 h-4" fill={isFav ? "white" : "none"} />
                                            </button>
                                        </div>

                                        <p className="text-gray-600 mb-3">{product.description}</p>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="text-sm font-medium text-gray-700 ml-1">{rating.toFixed(1)}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + 10} reviews</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-2xl font-bold text-green-600">${product.price}</div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </button>
                                        </div>
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

export default Shop;