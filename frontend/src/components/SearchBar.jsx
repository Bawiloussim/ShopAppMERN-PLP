// Créez un nouveau composant SearchBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative">
        <input
            type="text"
            placeholder="Rechercher un produit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
        />
        <button type="submit" className="absolute right-3 top-2 text-gray-400 hover:text-blue-600">
            <i className="fas fa-search"></i>
        </button>
        </form>
    );
};

export default SearchBar;