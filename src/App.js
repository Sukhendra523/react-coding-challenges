import "./App.css";
import CharacterCount from "./Problem 1: Character Counter";
import VisibilityToggle from "./Problem 2: Toggle Visibility";
import PostContainer from "./Problem 3: Fetch and Display Data";
import DebouncedSearch from "./Problem 4: Debounced Search";
import DebouncedAndReset from "./Problem 4.1: Debounce and Reset input value";
import FormValidation from "./Problem 5: Form Validation";
import CountdownTimer from "./Problem 6: Countdown Timer";

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
        <VisibilityToggle initialVisibility={false} showLabel={"Fetch Posts"}>
          <PostContainer />
        </VisibilityToggle>

        <hr />
        <h1> Problem 4: Debounced Search </h1>
        <DebouncedSearch />

        <hr />
        <h1>Problem 4.1: Debounce and Reset input value</h1>
        <DebouncedAndReset />

        <hr />
        <h1>Problem 5: Form Validation</h1>
        <FormValidation />

        <hr />
        <h1>Problem 6: Countdown Timer</h1>
        <CountdownTimer />
      </main>

      <footer></footer>
    </>
  );
}

export default App;
