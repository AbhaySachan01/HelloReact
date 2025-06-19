import { Fragment } from "./createElement.js";

export function createDom(fiber) {
  // console.log("Creating DOM for:", fiber.type, fiber.props);

  if (fiber.type === "text") {
    return document.createTextNode(fiber.props.nodeValue);
  }

  if (fiber.type === Fragment  || typeof fiber.type === "function") {
    fiber.dom=null;
    return null; 
  }

  return document.createElement(fiber.type);
}


export function updateDom(dom, prevProps, nextProps) {
  // Skip if the dom is not an Element (e.g., text node)
  if (!(dom instanceof Element)) return;

  // 1. Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(name => name.startsWith("on"))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      if (!(name in nextProps) || prevProps[name] !== nextProps[name]) {
        dom.removeEventListener(eventType, prevProps[name]);
      }
    });

  // 2. Remove old properties
  Object.keys(prevProps)
    .filter(name => name !== "children" && !name.startsWith("on"))
    .forEach(name => {
      if (!(name in nextProps)) {
        if (name === "style") {
          dom.style = {};
        } else {
          dom.removeAttribute(name);
        }
      }
    });

  // 3. Add or update new properties
  Object.keys(nextProps)
    .filter(name => name !== "children" && !name.startsWith("on"))
    .forEach(name => {
      if (name === "style") {
        Object.assign(dom.style, nextProps.style);
      } else {
        dom.setAttribute(name, nextProps[name]);
      }
    });

  // 4. Add new event listeners
  Object.keys(nextProps)
    .filter(name => name.startsWith("on"))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      if (prevProps[name] !== nextProps[name]) {
        dom.addEventListener(eventType, nextProps[name]);
      }
    });
}
