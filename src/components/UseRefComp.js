import { useState, useEffect, useRef } from "../hooks";
import { createNewElement } from "../createElement.js";
export function UseRefComp() {
  const inputRef = useRef(null);
  const [refReady, setRefReady] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setRefReady(true);  // trigger re-render to show ref is set
    }
  }, []);

  return (
    <div>
      <input ref={inputRef} placeholder="Type here..." />
      <div>Ref current: {refReady ? "Set" : "Not set"}</div>
    </div>
  );
}
