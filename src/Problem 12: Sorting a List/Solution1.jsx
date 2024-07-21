import { useEffect, useState } from "react";

const SortList1 = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("des");
  const isAscOrder = sortOrder === "asc";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Create a new array for sorting
    const sortedProducts = [...products].sort((a, b) =>
      isAscOrder ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
  }, [sortOrder]);

  const toggleSortOder = () =>
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "des" : "asc"));

  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "scroll",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "1rem",
      }}
    >
      {products.length > 0 && (
        <button
          onClick={toggleSortOder}
          style={{
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Sort {isAscOrder ? "Descending" : "Ascending"}
        </button>
      )}
      {products?.map(({ id, title, description, price }) => (
        <div key={id}>
          <h3>{title}</h3>
          <span>{price}</span>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};

export default SortList1;
