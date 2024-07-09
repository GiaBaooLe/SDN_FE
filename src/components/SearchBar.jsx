import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-2 mb-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Ba mẹ muốn tìm mua gì hôm nay?"
        className="w-full px-3 py-2 placeholder-gray-400 border rounded-l-lg focus:outline-none focus:ring focus:border-pink-300"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-pink-500 rounded-r-lg focus:outline-none hover:bg-pink-700"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17.05 10.5a6.55 6.55 0 11-13.1 0 6.55 6.55 0 0113.1 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
