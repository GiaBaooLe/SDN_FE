import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative flex items-center mt-2 mb-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Ba mẹ muốn tìm mua gì hôm nay?"
        className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300 pr-10"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-12 top-2/4 transform -translate-y-2/4 text-gray-500 focus:outline-none"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <button
        type="submit"
        onClick={() => onSearch(searchTerm)}
        className="absolute right-2 top-2/4 transform -translate-y-2/4 text-white bg-pink-500 rounded-lg focus:outline-none hover:bg-pink-700 px-2 py-1"
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
    </div>
  );
};

export default SearchBar;
  