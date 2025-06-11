import React, { useEffect, useState } from 'react';
import { fetchProviders } from '../utils/fetchProviders';
import { Link } from 'react-router-dom';

function ProviderList() {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchProviders().then(setProviders);
  }, []);

  const filtered = providers.filter((provider) =>
    provider.name.toLowerCase().includes(search.toLowerCase()) ||
    provider.specialization.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setShowResults(search.trim().length > 0);
  }, [search]);

  const handleShowAll = () => {
    setSearch('');
    setShowResults(true);
  };

  const handleClear = () => {
    setSearch('');
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10 text-center animate-fade-in">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-blue-700 mb-2 transition-all duration-500 ease-in-out">
        Learning Support Providers
      </h1>
      <p className="text-lg text-gray-700 mb-6 animate-fade-in-delay">
        Enter the name or specialization to explore support services.
      </p>

      {/* Search & Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        <div className="flex gap-2 w-full md:w-auto justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform hover:scale-105"
            onClick={handleShowAll}
          >
            Show All Providers
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-transform hover:scale-105"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Provider List */}
      {showResults && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
          {filtered.map((p, index) => (
            <li
              key={p.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-500 border transform hover:-translate-y-1 opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <Link to={`/providers/${p.id}`} className="block">
                <h2 className="text-xl font-semibold text-blue-600 mb-1">{p.name}</h2>
                <p className="text-sm text-gray-700">{p.specialization} — {p.location}</p>
                <p className="text-sm text-yellow-600 mt-1">Rating: {p.rating} ⭐</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProviderList;