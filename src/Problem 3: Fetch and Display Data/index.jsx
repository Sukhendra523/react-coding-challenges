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
  } = useFetchData("https://jsonplaceholder.typicode.com/posts");

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
