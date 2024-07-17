import React, { useState, useEffect, useRef } from "react";

const DebouncedSearch1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef(null);

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

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchTerm) {
      debounceTimeout.current = setTimeout(() => {
        fetchSuggestions(searchTerm);
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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

export default DebouncedSearch1;
