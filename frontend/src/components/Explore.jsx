import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Explore = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('Instagram');
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=253b5afd229e442fbd17a6b2af2a8525`
        );
        if (res.data.status === 'ok') {
          setData(res.data.articles);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setQuery(input);
  };

  return (
   <div className="p-4 md:pl-64 max-w-7xl">

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Explore Latest Tech News..."
          className="border px-4 py-2 rounded-l w-2/3 sm:w-1/2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 && (
          <p className="text-center col-span-full">No news found.</p>
        )}
        {data.map((d, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            {d.urlToImage && (
              <img
                src={d.urlToImage}
                alt="news"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h2 className="text-black font-semibold mb-2">{d.title}</h2>
              <p className="text-sm text-gray-600 flex-grow">
                {d.description?.slice(0, 100)}...
              </p>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-600 hover:underline"
              >
                Read Full Article →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
