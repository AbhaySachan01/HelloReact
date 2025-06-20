import { createNewElement, Fragment } from "./createElement.js";
import { render } from "./render.js";
import { ToDoList } from "./components/ToDoList.js";
import { DigitalClock } from "./components/DigitalClock.js";


function App() {
  return (
    <>
    <ToDoList/>
    <DigitalClock/> 
    </>
  );
}




const container = document.getElementById("root");



render(<App/>, container);
