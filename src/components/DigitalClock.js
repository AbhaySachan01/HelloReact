import { useState } from "../hooks/useState.js";
import { useEffect } from "../hooks/useEffect.js";
import { createNewElement,Fragment } from "../createElement.js";

export function DigitalClock() {
  const [tick, setTick] = useState(0);  

  useEffect(() => {
    const id = setInterval(() => {
      setTick((prev) => prev+1);  
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const AM_PM = hours >= 12 ? "PM" : "AM";
  const formatted = `${pad(hours % 12 || 12)}:${pad(minutes)}:${pad(seconds)} ${AM_PM}`;

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  return (
    <>
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center font-mono">
      <h1 className="text-4xl font-bold mb-6">Digital Clock</h1>
      <div className="bg-white text-black px-12 py-6 rounded-lg shadow-xl text-3xl tracking-widest">
        {formatted}
      </div>
    </div>
    </>
  );
}
