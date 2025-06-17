export function createNewElement(type , props , ...children){
    console.log("Create New Element for ", type);
    return {
        type,
        props:{
            ...props,
            children: children.map(child => typeof child=="object"
                ? child 
                : createNewTextElement(child)
            ),
        },
    };
}

function createNewTextElement(text){
    console.log("Create New Text Element for ", text);
    return {
        type:"text",
        props:{
            nodeValue:text,
            children:[],
        },
    };
}
export const Fragment = "FRAGMENT";

// 🧱 createNewTextElement(text)
// This helper function wraps raw text like "Hello" into an object structure:

// {
//   type: "text",
//   props: {
//     nodeValue: "Hello",
//     children: []
//   }
// }

// createNewElement("div", { id: "main" }, "Hello", createNewElement("span", null, "World"))
// {
//   type: "div",
//   props: {
//     id: "main",
//     children: [
//       {
//         type: "text",
//         props: { nodeValue: "Hello", children: [] }
//       },
//       {
//         type: "span",
//         props: {
//           children: [
//             {
//               type: "text",
//               props: { nodeValue: "World", children: [] }
//             }
//           ]
//         }
//       }
//     ]
//   }
// }
