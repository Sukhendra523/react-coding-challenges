# React problems to practice for frontend developer interviews:

### Problem 1: Character Counter

- **Description:**
  - Create an input box and a paragraph tag under this input box.
  - As the user types in the input box, the paragraph tag should display the number of characters typed.
  - When the character count exceeds 10, the text color in the paragraph tag should turn red.

<details>
  <summary> Solution: </summary>

  ```jsx
  import { useState } from "react";
  import "./styles.css";

  const CharacterCount = ({ limit = 10 }) => {
    const [totalCharacterCount, setTotalCharacterCount] = useState(0);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
      const totalTextLength = e.target.value.length;
      setTotalCharacterCount(totalTextLength);
      setError(totalTextLength > limit);
    };

    return (
      <div>
        <input type="text" onChange={handleChange} />
        <p className={`${error ? "error" : ""}`}>{totalCharacterCount}</p>
      </div>
    );
  };

  export default CharacterCount;
  ```
  ```css
  .error {
    color: red;
  }
  ```
</details>

### Problem 2: Toggle Visibility

- **Description:**
  - Create a button that toggles the visibility of a paragraph.
  - Initially, the paragraph should be visible.
  - When the button is clicked, the paragraph should be hidden, and the button text should change to "Show".
  - When the button is clicked again, the paragraph should be shown, and the button text should change to "Hide".
<details>
  <summary> Solution: </summary>
  
  - **1st**
    ```jsx
    import { useState } from "react";

    const VisibilityToggle = () => {
      const [showParagraph, setShowParagraph] = useState(true);

      const toggleVisiblity = () => setShowParagraph(!showParagraph);
      return (
        <div>
          {showParagraph && <p>Paragraph text</p>}
          <button onClick={toggleVisiblity}>
            {showParagraph ? "Hode" : "Show"}
          </button>
        </div>
      );
    };

    export default VisibilityToggle;
    ```
  - **2nd Reusable.**
    ```jsx
    import { useState } from "react";

    const VisibilityToggle = ({ children }) => {
      const [show, setShow] = useState(true);

      const toggleVisiblity = () => setShow(!show);
      return (
        <div>
          {show && children}
          <button onClick={toggleVisiblity}>{show ? "Hide" : "Show"}</button>
        </div>
      );
    };

    export default VisibilityToggle;
    ```
</details>

### Problem 3: Fetch and Display Data

- **Description:**
  - Create a button that, when clicked, fetches data from an API and displays it in a list.
  - Use a placeholder API like [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
  - Display a loading message while fetching the data and handle any potential errors gracefully.
<details>
  <summary> Solution: </summary>

  - 1st without custom hook
    ```jsx
    /* 
    
    - Create a button that, when clicked, fetches data from an API and displays it in a list.
    - Use a placeholder API like [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
    - Display a loading message while fetching the data and handle any potential errors gracefully.
    
    */

    // PostContainer
    // States = > posts , loading , error
    // fetch post on mount

    import React, { useEffect, useState } from "react";

    const PostContainer = () => {
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);

      const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
          );
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          }
        } catch (error) {
          setError(
            error.message ||
              error.body.message ||
              "Sorry! something went wrong. please try again"
          );
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchPosts();
      }, []);

      return (
        <div>
          {loading && <span>Loading....</span>}
          {!loading &&
            posts.map(({ title, body, id }) => (
              <div key={id}>
                <h1>{title}</h1>
                <p>{body}</p>
              </div>
            ))}
          {error && !loading && <p>{error}</p>}
        </div>
      );
    };

    export default PostContainer;
    ```
  - 2nd with custom hook
    ```jsx
    import { useCallback, useEffect, useState } from "react";
    const defaultOptions = { method: "GET" };

    const useFetchData = (url, initialData, options = defaultOptions) => {
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
    ```
    ```jsx
    /* 
    
    - Create a button that, when clicked, fetches data from an API and displays it in a list.
    - Use a placeholder API like [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
    - Display a loading message while fetching the data and handle any potential errors gracefully.
    
    */

    // PostContainer
    // States = > posts , loading , error
    // fetch post on mount

    import useFetchData from "./Hook/useFetchData";

    const PostContainer = () => {
      const {
        loading,
        data: posts,
        error,
      } = useFetchData("https://jsonplaceholder.typicode.com/posts", []);

      return (
        <div>
          {loading && <span>Loading....</span>}
          {posts.map(({ title, body, id }) => (
            <div key={id}>
              <h1>{title}</h1>
              <p>{body}</p>
            </div>
          ))}
          {error && !loading && <p>{error}</p>}
        </div>
      );
    };

    export default PostContainer;
    ```
</details>

### **Problem 4: Debounced Search**

- **Description:**
  - Create a search input box.
  - As the user types in the search box, fetch suggestions from an API but only after the user stops typing for 300 milliseconds.
  - Display the fetched suggestions in a list below the search box.
<details>
  <summary> Solution: </summary>
  
  - **1st Solution with out debounce** util
    ```jsx
    import React, { useState, useEffect, useRef } from "react";

    const DebouncedSearch1 = () => {
      const [searchTerm, setSearchTerm] = useState("");
      const [suggestions, setSuggestions] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const debounceTimeout = useRef(null);

      const fetchSuggestions = async (term) => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${term}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setSuggestions(responseData.products);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
        setIsLoading(false);
      };

      useEffect(() => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }

        if (searchTerm) {
          debounceTimeout.current = setTimeout(() => {
            fetchSuggestions(searchTerm);
          }, 300);
        } else {
          setSuggestions([]);
        }

        return () => {
          clearTimeout(debounceTimeout.current);
        };
      }, [searchTerm]);

      const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

      return (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {suggestions.map((product) => (
                <li key={product.id}>{product.title}</li>
              ))}
            </ul>
          )}
        </div>
      );
    };

    export default DebouncedSearch1;
    ```
  - **2nd Solution with debounce** util
    ```jsx
    import React, { useState, useCallback } from "react";

    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    const DebouncedSearch = () => {
      const [searchTerm, setSearchTerm] = useState("");
      const [suggestions, setSuggestions] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

      const fetchSuggestions = async (term) => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${term}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setSuggestions(responseData.products);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
        setIsLoading(false);
      };

      const debouncedFetchSuggestions = useCallback(
        debounce(fetchSuggestions, 300),
        []
      );

      const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedFetchSuggestions(value);
      };

      return (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {suggestions.map((product) => (
                <li key={product.id}>{product.title}</li>
              ))}
            </ul>
          )}
        </div>
      );
    };

    export default DebouncedSearch;
    ```
  - 3rd Solution using custom hook useDebounce
    ```jsx
    import React, { useState, useEffect } from "react";

    const useDebouncedValue = (value, delay) => {
      const [debouncedValue, setDebouncedValue] = useState(value);

      useEffect(() => {
        let timer;
        timer = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(timer);
        };
      }, [value, delay]);

      return debouncedValue;
    };

    const DebouncedSearch3 = () => {
      const [searchTerm, setSearchTerm] = useState("");
      const [suggestions, setSuggestions] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const debounceSearchTerm = useDebouncedValue(searchTerm, 300);

      const fetchSuggestions = async (term) => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${term}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setSuggestions(responseData.products);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        if (debounceSearchTerm) {
          fetchSuggestions(debounceSearchTerm);
        } else {
          setSuggestions([]);
        }
      }, [debounceSearchTerm]);

      const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

      return (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {suggestions.map((product) => (
                <li key={product.id}>{product.title}</li>
              ))}
            </ul>
          )}
        </div>
      );
    };

    export default DebouncedSearch3;
    ```
</details>

### **Problem 4.1 : Debounce and Reset input value**

- **Description:**
  - Create an input box and a paragraph tag under this input box.
  - As User enters in that input box. Once the user stops entering into the input box, the program should wait for 4 seconds,
  - After 4 seconds the entered value should appear in the paragraph tag and the input box should be cleared.
<details>
  <summary> Solution: </summary>

  ```jsx
  import React, { useRef, useState } from "react";

  const DebounceInputAndReset1 = () => {
    const [inputValue, setInputValue] = useState("");
    const [displayValue, setDisplayValue] = useState("");
    const debounceTimeout = useRef(null);

    const handleChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setDisplayValue(value);
        setInputValue("");
      }, 4000);
    };

    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
        />
        <p>{displayValue}</p>
      </div>
    );
  };

  export default DebounceInputAndReset1;
  ```
</details>

### Problem 5: Form Validation

- **Description:**
  - Create a simple form with inputs for a username and password.
  - The username should be at least 4 characters long, and the password should be at least 8 characters long.
  - Display validation messages for each input field as the user types.
  - Disable the submit button if either input is invalid.
<details>
  <summary> Solution: </summary>

  ```jsx
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
          {error.username && (
            <p>Username should be at least 4 characters long</p>
          )}
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
          {error.password && (
            <p>password should be at least 8 characters long</p>
          )}
        </div>
        <br />

        <input type="submit" disabled={error.password || error.username} />
      </form>
    );
  };

  export default FormValidation;
  ```
</details>

### Problem 6: Countdown Timer

- **Description:**
  - Create a countdown timer that starts from a given number of seconds.
  - Provide a button to start the countdown.
  - Display the remaining time in seconds in a paragraph tag.
  - When the timer reaches zero, display a message saying "Time's up!".

### Problem 7: Dynamic List

**Description:**

- Create an input box and a button.
- When the user types a value in the input box and clicks the button, add the value to a list displayed below.
- Each item in the list should have a delete button that removes it from the list.

### Problem 8: Controlled Tabs

**Description:**

- Create a tab component with at least three tabs.
- Each tab should display different content when clicked.
- Maintain the active tab's state and ensure the correct content is displayed.

### Problem 9: Light/Dark Mode Toggle

**Description:**

- Create a toggle switch to switch between light and dark modes.
- Apply different styles for light and dark modes to the entire application.
- Persist the selected mode in local storage so that it is maintained across page reloads.

### Problem 10: Modal Popup

**Description:**

- Create a button that opens a modal popup when clicked.
- The modal should have a close button to hide it.
- Ensure that clicking outside the modal or pressing the "Escape" key also closes the modal.

These problems cover a variety of React concepts and will help you prepare for a range of potential interview questions.

Here are 10 more frequently asked React frontend developer interview questions:

### Problem 11: Infinite Scroll

**Description:**

- Create a component that fetches and displays data in an infinite scroll manner.
- As the user scrolls to the bottom of the list, fetch more data and append it to the existing list.
- Display a loading indicator while fetching the new data.

### Problem 12: Sorting a List

**Description:**

- Create a list of items with a sort button.
- Clicking the sort button should toggle between sorting the list in ascending and descending order.
- Display the sorted list accordingly.

### Problem 13: Drag and Drop

**Description:**

- Implement a simple drag-and-drop interface where items from a list can be reordered by dragging.
- Use a library like `react-dnd` or the HTML5 drag-and-drop API to achieve this functionality.

### Problem 14: Accordion

**Description:**

- Create an accordion component with multiple sections.
- Each section should have a title and content.
- Clicking a section title should expand/collapse the section to show/hide the content.
- Only one section should be expanded at a time.

### Problem 15: Editable Table

**Description:**

- Create a table with rows and columns.
- Each cell in the table should be editable.
- Provide a save button to save the edited data.
- Validate the input data before saving and display validation messages if needed.

### Problem 16: Star Rating

**Description:**

- Create a star rating component.
- The user should be able to click on the stars to set the rating.
- Display the current rating as highlighted stars.

### Problem 17: Weather App

**Description:**

- Create a weather app that fetches weather data from an API based on the user’s input city.
- Display the current weather and a 5-day forecast.
- Show a loading indicator while fetching data and handle any potential errors gracefully.

### Problem 18: Timer with Start/Stop/Reset

**Description:**

- Create a timer that counts up from zero.
- Provide buttons to start, stop, and reset the timer.
- Display the elapsed time in a human-readable format (e.g., MM:SS).

### Problem 19: Dynamic Form Fields

**Description:**

- Create a form with dynamic fields.
- Allow the user to add or remove fields dynamically.
- Collect and display the form data upon submission.

### Problem 20: Notification System

**Description:**

- Implement a notification system that displays notifications at the top of the screen.
- Each notification should disappear automatically after a few seconds.
- Provide a close button to manually dismiss a notification.

These problems cover a wide range of React concepts, including state management, event handling, component lifecycle, and integration with APIs. They will help you gain a deeper understanding of React and prepare you for various scenarios in interviews.
