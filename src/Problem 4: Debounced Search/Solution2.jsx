import React, { useState, useCallback } from "react";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const DebouncedSearch2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async (term) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${term}`
      );
      if (response.ok) {
        const responseData = await response.json();
        setSuggestions(responseData.products);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
    setIsLoading(false);
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedFetchSuggestions(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {suggestions.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DebouncedSearch2;
