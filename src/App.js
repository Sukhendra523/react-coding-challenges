import "./App.css";
import CharacterCount from "./Problem 1: Character Counter";
import VisibilityToggle from "./Problem 2: Toggle Visibility";
import PostContainer from "./Problem 3: Fetch and Display Data";

function App() {
  return (
    <>
      <header className="App-header">React Problems Practice</header>

      <main className="App">
        <h1>Problem 1: Character Counter</h1>
        <CharacterCount />
        <hr />

        <h1>Problem 2: Toggle Visibility</h1>
        {/* <VisibilityToggle /> */}
        <VisibilityToggle>
          <p>
            Note that the development build is not optimized. To create a
            production build, use npm run build. webpack compiled successfully
          </p>
        </VisibilityToggle>
        <hr />

        <h1>Problem 3: Fetch and Display Data </h1>
        <VisibilityToggle>
          <PostContainer />
        </VisibilityToggle>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
