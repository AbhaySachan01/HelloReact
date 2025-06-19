import  {createNewElement,Fragment}  from "./createElement.js";
import {render} from "./render.js"

const element = (
  <div style={{ padding: "20px", fontFamily: "Arial" }}>
    <h2 style={{ color: "teal" }}>🌟 Welcome to My Mini React!</h2>
    <h5 style={{ color: "gray" }}>This is rendered using custom fiber logic.</h5>
    <a href="https://example.com" target="_blank" style={{ color: "blue" }}>
      Visit Example 🌐
    </a>
  </div>
);

const element2 = (
  <>
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px" }}>
      <h2 style={{ margin: 0 }}>📢 Hello World</h2>
      <h5 style={{ fontWeight: "normal", marginTop: "10px" }}>This is a custom fragment render.</h5>
      <a href="hello" style={{ textDecoration: "none", color: "#ff6347" }}>
        Click Me ❤️
      </a>
    </div>
  </>
);

const container = document.getElementById("root");

function MyComponent(props) {
  return (
    <h1>Hello, {props.name}!</h1>
  );
}

const app = <MyComponent name="Abhay" />;


const newroot = (
    <>
    {app}
    {element}
    {element2}
    
    </>
)


// render(element, container);
// render(element2, container);
render(newroot, container);

