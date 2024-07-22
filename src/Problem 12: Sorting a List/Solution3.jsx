import { useEffect, useState } from "react";

const SortList2 = ({ sortBy = "price" }) => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState();
  const isAscOrder = sortOrder === "asc";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products${
            sortOrder ? `?sortBy=${sortBy}&order=${sortOrder}` : ""
          }`
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [sortOrder, sortBy]);

  const toggleSortOder = () =>
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));

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
      <h3>Port products by {sortBy}</h3>

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

export default SortList2;
