/* 
### Problem 7: Dynamic List

**Description:**

- Create an input box and a button.
- When the user types a value in the input box and clicks the button, add the value to a list displayed below.
- Each item in the list should have a delete button that removes it from the list. 

*/

import React, { useState } from "react";

const DynamicList = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  const addItem = () => {
    setList([...list, inputValue]);
    setInputValue("");
  };

  const deleteItem = (itemToBeRemoved) => {
    const updatedList = list.filter((item) => itemToBeRemoved !== item);
    setList(updatedList);
  };

  const randomString = () => Math.random().toString(36).slice(2);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />{" "}
        <button onClick={addItem}>Add</button>
      </div>

      <div>
        {list.map((item, i) => (
          <div key={i + randomString()} style={{ marginBottom: "1rem" }}>
            <span>{item} </span>
            <button onClick={() => deleteItem(item)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicList;
