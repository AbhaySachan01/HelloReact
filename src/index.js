import  {createNewElement}  from "./createElement.js";
import {render} from "./render.js"

const element = (
    <div id="main">
        Hello <span style="color : red">World</span>
    </div>
)

const container = document.getElementById("root");
render(element,container);