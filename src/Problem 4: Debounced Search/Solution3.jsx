import React, { useState, useEffect } from "react";

const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const DebouncedSearch3 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearchTerm = useDebouncedValue(searchTerm, 300);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSuggestions(debounceSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debounceSearchTerm]);

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

export default DebouncedSearch3;
