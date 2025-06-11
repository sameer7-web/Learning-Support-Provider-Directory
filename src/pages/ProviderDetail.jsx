import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProviders } from '../utils/fetchProviders';

function ProviderDetail() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders().then((data) => {
      const found = data.find((p) => p.id === id);
      setProvider(found);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="p-4 bold text-center">Loading provider details...</p>;

  if (!provider) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 mb-4">Provider not found.</p>
        <Link to="/" className="text-blue-500 underline">← Back to List</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 underline">← Back to List</Link>
      <div className="bg-white mt-4 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">{provider.name}</h1>
        <p className="mb-2"><strong>Specialization:</strong> {provider.specialization}</p>
        <p className="mb-2"><strong>Location:</strong> {provider.location}</p>
        <p className="mb-4"><strong>Rating:</strong> {provider.rating} ⭐</p>
        <p className="text-gray-700 mb-4">{provider.longDescription}</p>
        <p><strong>Contact:</strong> <span className="text-blue-600">{provider.contactEmail}</span> | {provider.phoneNumber}</p>
      </div>
    </div>
  );
}

export default ProviderDetail;