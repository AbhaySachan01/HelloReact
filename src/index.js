import { createNewElement, Fragment } from "./createElement.js";
import { render } from "./render.js";
import { Counter } from "./components/counter.js";
import { Counter2 } from "./components/counter2.js";
import { UseRefComp } from "./components/UseRefComp.js";
import { useState } from "./hooks/useState.js"; 

function LiveInput() {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "10px", fontFamily: "Arial" }}>
      <input
        type="text"
        value={text}
        oninput={e => setText(e.target.value)}
        placeholder="Type something..."
        style={{ padding: "8px", fontSize: "16px", width: "100%", boxSizing: "border-box" }}
      />
      <p style={{ marginTop: "10px", color: "#333" }}>{text}</p>
    </div>
  );
}

// const container = document.getElementById("root");
// render(<App/>,container);

function App() {
  return (
    <>
      <h2>🧪 useState Hook Test</h2>
      <Counter/>
      <Counter2/>
      <UseRefComp/>
       <LiveInput />

    </>
  );
}




const container = document.getElementById("root");



render(<App/>, container);
