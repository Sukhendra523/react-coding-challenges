import { useCallback, useEffect, useState } from "react";
const defaultOptions = { method: "GET" };

const useFetchData = (url, initialData = [], options = defaultOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(initialData);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      }
    } catch (error) {
      setError(
        error.message ||
          error.body.message ||
          "Sorry something went wrong please again later!"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, data, error };
};

export default useFetchData;
