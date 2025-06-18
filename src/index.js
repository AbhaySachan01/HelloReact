import  {createNewElement,Fragment}  from "./createElement.js";
import {render} from "./render.js"

const element = (
    <div>
        <h2>Hello World</h2>
        <h5>Hello Guys</h5>
        <a>hi</a>
    </div>
)
// const element3 = (
//     <div>
//         <h2>Hello World</h2>
//         <h5>Hello Guys</h5>
//         <a>hi</a>
//     </div>
// )
const element2 = (
    <>
    <div>
        <h2>Hello World</h2>
        <h5>Hello Guys</h5>
        <a>hi</a>
    </div>
    </>
    
)
const container = document.getElementById("root");
render(element,container);
// render(element2,container);