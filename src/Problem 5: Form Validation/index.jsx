/* 

- **Description:**
    - Create a simple form with inputs for a username and password.
    - The username should be at least 4 characters long, and the password should be at least 8 characters long.
    - Display validation messages for each input field as the user types.
    - Disable the submit button if either input is invalid. 
*/

import { useEffect, useState } from "react";

const initialFormData = { username: "", password: "" };
const initialError = { username: false, password: false };

const FormValidation = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialError);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setError({
      username: formData.username.length > 0 && formData.username.length < 4,
      password: formData.password.length > 0 && formData.password.length < 8,
    });
  }, [formData]);

  return (
    <form autoComplete="off">
      <div>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          autoComplete="off"
        />
        {error.username && <p>Username should be at least 4 characters long</p>}
      </div>
      <br />

      <div>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          autoComplete="new-password"
        />
        {error.password && <p>password should be at least 8 characters long</p>}
      </div>
      <br />

      <input type="submit" disabled={error.password || error.username} />
    </form>
  );
};

export default FormValidation;
