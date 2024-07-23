import { useState } from "react";

function DynamicFormFields() {
  const [formFields, setFormFields] = useState([{ name: "", age: "" }]);
  const [formData, setFormData] = useState(null);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const addFields = () => {
    let object = {
      name: "",
      age: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = formFields.map((field) => field);
    setFormData(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formFields.map((form, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                justifyContent: "center",
              }}
            >
              <input
                name="name"
                placeholder="Name"
                onChange={(event) => handleFormChange(event, index)}
                value={form.name}
              />
              <input
                name="age"
                placeholder="Age"
                onChange={(event) => handleFormChange(event, index)}
                value={form.age}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>

      <button onClick={addFields} style={{ marginRight: "1rem" }}>
        Add More..
      </button>
      <button onClick={handleSubmit}>Submit</button>

      {formData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Form Data:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DynamicFormFields;
