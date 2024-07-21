import React, { memo, useEffect, useRef, useState } from "react";
const LIMIT = 10;

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const FetchDataOnScroll = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const loaderRef = useRef(null);
  const listContainerRef = useRef(null);

  useEffect(() => {
    /* Why useEffect running twice and how to handle it well in React? */
    // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
    // https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
    // https://medium.com/@arm.ninoyan/fixed-react-18-useeffect-runs-twice-8480f0bd837f

    const abortController = new AbortController();

    const fetchData = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * LIMIT}`,
          {
            signal: abortController.signal,
          }
        );
        if (response.ok) {
          const result = await response.json();

          setProducts((prevData) => [...prevData, ...result.products]);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        setError(error.message || error.body.message || "Error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [page]);

  const handleObserver = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 500);

  useEffect(() => {
    const option = {
      root: listContainerRef.current,
      rootMargin: "10px",
      threshold: 1.0,
    };
    if (products.length > 0) {
      const observer = new IntersectionObserver(handleObserver, option);
      if (loaderRef.current) observer.observe(loaderRef.current);
      return () => {
        if (loaderRef.current) observer.unobserve(loaderRef.current);
      };
    }
  }, [products]);

  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "scroll",
        border: "1px solid black",
        borderRadius: "5px",
      }}
      ref={listContainerRef}
    >
      {products.map(({ id, title, description }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div ref={loaderRef} />
    </div>
  );
};

export default memo(FetchDataOnScroll);
