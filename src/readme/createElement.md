# 🔧 <span style="color:#00bfff">createElement.js</span>

A lightweight utility for creating virtual DOM elements (fiber nodes) for a React-like library.  
Handles elements, text nodes, and fragments.

---

## ✨ <span style="color:#ffa500">Features</span>

- ⚛️ Creates virtual DOM elements compatible with fiber architecture
- 🧠 Supports JSX elements, text nodes, and fragments (`<></>`)
- 🔁 Processes nested children recursively
- 📦 Lightweight with no external dependencies

---

## 📚 <span style="color:#00bfff">API Reference</span>

### 🔹 `createNewElement(type, props, ...children)`

Creates a new virtual DOM element (fiber node).

#### 📝 Parameters

| 🧩 Parameter | 🔤 Type               | 📄 Description                                  |
|-------------|-----------------------|-------------------------------------------------|
| `type`      | String \| Function    | Element type (e.g., `"div"`, component function) |
| `props`     | Object                | Element properties (including children)         |
| `children`  | Any                   | Child elements (nested nodes or text)           |

#### 🔙 Returns

Returns a virtual DOM object with this structure:

```js
{
  type: String | Function,  // Element type or "text" for text nodes
  props: {
    ...props,               // All passed properties
    children: Array         // Processed child elements
  }
}

```

### 🧩 <span style="color:#cc00cc">Fragment</span>

A special type used to represent `<></>` (i.e., React Fragments).  
✅ Helps group children without adding extra DOM nodes.

---

### 🧪 <span style="color:#32cd32">Internal Helpers</span>

#### `createNewTextElement(text)`

🟡 Converts a string/number child into a fiber-compatible **"text" node**.

#### 🔙 Returns:

```js
{
  type: "text",
  props: {
    nodeValue: "some text",
    children: []
  }
}
```
---

### 📦 <span style="color:#ff6347">Dependencies</span>

🚫 **None.** This is a standalone module with no external dependencies.

---

### 💡 <span style="color:#1e90ff">Example Usage</span>

```jsx
const element = (
  <>
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px" }}>
      <h2>📢 Hello World</h2>
    </div>
  </>
);
