/* 

### Problem 15: Editable Table

**Description:**

- Create a table with rows and columns.
- Each cell in the table should be editable.
- Provide a save button to save the edited data.
- Validate the input data before saving and display validation messages if needed.

 */

import React, { useState } from "react";
const placeholderData = [
  { id: 1, name: "John Doe", age: 25, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 30, email: "jane@example.com" },
  { id: 3, name: "Mike Johnson", age: 28, email: "mike@example.com" },
];

const inputType = {
  id: "number",
  name: "text",
  age: "number",
  email: "email",
};

const EditableTable = ({ data = placeholderData }) => {
  const [tableData, setTableData] = useState(data);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [message, setMessage] = useState({});

  const updateTableData = (e, rowIndex, colName) => {
    const newData = [...tableData];
    newData[rowIndex][colName] = e.target.value;

    setTableData(newData);
    setEditingRowIndex(rowIndex);
  };

  const isInvalidData = () => {
    const { name, age, email } = tableData[editingRowIndex];
    let newErrors = {};

    newErrors = {
      name: !name && "Name is required",
      age: !age && "Age is required",
      email: !email && "Email is required",
    };

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Valid email is required.";
    }

    if (isNaN(age) || age <= 0) {
      newErrors.age = "Valid age is required.";
    }

    setMessage(newErrors);
    if (newErrors.name || newErrors.age || newErrors.email) {
      return true;
    }

    return false;
  };

  const handleSaveData = () => {
    if (!isInvalidData()) {
      setMessage({ success: "Data saved successfully" });
    }
  };

  return (
    <div style={{ width: "max-content", margin: "2rem auto" }}>
      <table border="2">
        <thead>
          <tr>
            {Object.keys(tableData[0]).map((key) => (
              <th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr>
              {Object.entries(rowData).map(([colName, cellData]) => (
                <td>
                  {colName === "id" ? (
                    cellData
                  ) : (
                    <input
                      type={inputType[colName]}
                      value={cellData}
                      onChange={(e) => updateTableData(e, rowIndex, colName)}
                      style={{
                        border:
                          editingRowIndex === rowIndex &&
                          message[colName] &&
                          message[colName] !== "success"
                            ? "2px solid red"
                            : "none",
                        outline: "none",
                      }}
                    />
                  )}
                </td>
              ))}
              <td>
                <button onClick={handleSaveData}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        {message.name && <span style={{ color: "red" }}>{message.name}</span>}
        {message.age && <span style={{ color: "red" }}>{message.age}</span>}
        {message.email && <span style={{ color: "red" }}>{message.email}</span>}
        {message.success && (
          <span style={{ color: "green" }}>{message.success}</span>
        )}
      </div>
    </div>
  );
};

export default EditableTable;
