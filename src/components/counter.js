// ./components/Counter.js
import { useState } from "../hooks/useState.js"; // adjust path if needed
import { createNewElement,Fragment } from "../createElement.js";

export function Counter() {
  const [count, setCount] = useState(0);
  console.log("hello from counter");
  return (
    <div>
      <p>Count: {count}</p>

      <button onClick={() => setCount(c=> c + 3)}>Increment</button>
    </div>
  );
}
