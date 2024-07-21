import { useEffect, useState } from "react";
const stringSort = {
  asc: function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  },
  des: function (a, b) {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  },
};
const numberSort = { asc: (a, b) => a - b, des: (a, b) => b - a };

const SortList2 = ({ sortBy = "title" }) => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("des");
  const isAscOrder = sortOrder === "asc";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 'https://dummyjson.com/products?sortBy=title&order=asc'
        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const compareFunc = {
    title: stringSort,
    price: numberSort,
    description: stringSort,
  };

  useEffect(() => {
    // Create a new array for sorting
    const sortedProducts = [...products].sort((a, b) =>
      compareFunc[sortBy][sortOrder](a[sortBy], b[sortBy])
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

export default SortList2;
