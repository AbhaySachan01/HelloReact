import { createNewElement, Fragment } from "./createElement.js";
import { render } from "./render.js";
import { Counter } from "./components/counter.js";
import { Counter2 } from "./components/counter2.js";

function App() {
  return (
    <>
      <h2>🧪 useState Hook Test</h2>
      <Counter />
      <Counter2/>
    </>
  );
}

const container = document.getElementById("root");
render(<App/>,container);
