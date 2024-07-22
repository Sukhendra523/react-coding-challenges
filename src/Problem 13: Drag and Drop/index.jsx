import { useState } from "react";

const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4"];

const DragAndDrop = () => {
  const [items, setItems] = useState(initialItems);

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("dragItemIndex", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, dropIndex) => {
    const dragItemIndex = e.dataTransfer.getData("dragItemIndex");
    const newItems = [...items];
    const draggedItem = newItems.splice(dragItemIndex, 1)[0];
    newItems.splice(dropIndex, 0, draggedItem);
    setItems(newItems);
  };

  return (
    <div
      style={{
        maxWidth: "200px",
        margin: "0 auto",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "1rem",
      }}
    >
      <h3>Drag and Drop List</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
            style={{
              margin: "0.5rem 0",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "3px",
              backgroundColor: "#f9f9f9",
              cursor: "move",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DragAndDrop;
