import { createNewElement, Fragment } from "./createElement.js";
import { render } from "./render.js";
import { Counter } from "./components/counter.js";

function App() {
  return (
    <>
      <h2>🧪 useState Hook Test</h2>
      <Counter />
    </>
  );
}

const container = document.getElementById("root");
render(<App/>,container);
