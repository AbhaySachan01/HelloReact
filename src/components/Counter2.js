import { createNewElement } from "../createElement.js";
import { useState } from "../hooks/useState.js";
import { useEffect } from "../hooks/useEffect.js";

export function Counter2() {
  const [count, setCount] = useState(0);
//     useEffect(() => {
//   console.log("Effect mounted");
// }, []);

  useEffect(() => {
    console.log("Effect: Component mounted or count changed →", count);

    const interval = setInterval(() => {
      console.log("⏲ Interval tick:", count);
    }, 1000);

    return () => {
      console.log("🧹 Cleanup: count was", count);
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
