export function render(element, container){
    if (element.type === "text"){
        const textNode = document.createTextNode(element.props.nodeValue);
        container.appendChild(textNode);

    }
    else if (element.type === "FRAGMENT"){
        (element.props.children || []).forEach(child =>{
            render(child,container);
        });
    }
    else {
        const dom= document.createElement(element.type);

        const isProperty = key => key!== "children";
        Object.keys(element.props || {})
        .filter(isProperty)
        .forEach(name =>{
            dom[name]=element.props[name];
        });

        (element.props.children || []).forEach(child => {
            render(child, dom);
        });

        container.appendChild(dom);

    }
}