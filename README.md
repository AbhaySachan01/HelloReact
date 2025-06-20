# ⚛️ HelloReact
A simplified clone of React’s core features built from scratch — includes support for JSX-like elements, fiber tree, reconciliation, commit phase, and hooks like useState and useEffect.

## 📚 Module Documentation

Each file has its own in-depth documentation with examples, logic breakdowns, and diagrams:

| 📦 Module                | 📄 Docs Link                          |
|--------------------------|----------------------------------------|
| 🧩 `createElement.js`     | [createElement.md](./src/readme/createElement.md) |
| 🔁 `render.js`            | [render.md](./src/readme/render.md)               |
| ⚙️ `performUnitOfWork.js` | [performUnitOfWork.md](./src/readme/performUnitofWork.md) |
| ⚖️ `reconcile.js`         | [reconcile.md](./src/readme/reconcile.md)         |
| ✅ `commit.js`            | [commit.md](./src/readme/commit.md)               |
| 🏗 `dom.js`               | [dom.md](./src/readme/dom.md)                     |

---

## ✨ Features

- ✅ JSX-like syntax with fiber structure
- 🔁 Work loop via `requestIdleCallback`
- ⚡ Reconciliation with `UPDATE`, `PLACEMENT`, `DELETION`
- 🔧 Real DOM updates via diffing
- 🪝 Support for `useState` and `useEffect`
- 🧩 Fragment (`<></>`) support
- 🧠 Built-in hook cleanup handling

---

## 🚀 Getting Started

```
git clone https://github.com/abhaysachan01/HelloReact.git
cd HelloReact

```

## 💡 Example Component
```
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Effect triggered");
    return () => console.log("Cleanup");
  }, [count]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c + 1)}>➕</button>
    </div>
  );
}
```



## 📖 Learning Goals
Understand how React works under the hood

Practice fiber tree traversal, DOM diffing, and state updates

Build a modular, minimal framework with real-world learning value

## 📎 Credits
Inspired by Rodrigo Pombo’s build-your-own-react

Extended with modular architecture, hooks, effect scheduling, and full doc coverage.
