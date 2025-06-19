import { Fragment } from "./createElement.js";


export function updateDom(dom, prevProps, nextProps) {
  if (dom.nodeType === Node.TEXT_NODE) {
    if (prevProps.nodeValue !== nextProps.nodeValue) {
      dom.nodeValue = nextProps.nodeValue;
    }
    return;
  }

  Object.keys(prevProps)
    .filter(name => name.startsWith("on"))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      if (!(name in nextProps) || prevProps[name] !== nextProps[name]) {
        dom.removeEventListener(eventType, prevProps[name]);
      }
    });

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

  Object.keys(nextProps)
    .filter(name => name !== "children" && !name.startsWith("on"))
    .forEach(name => {
      if (name === "style") {
        Object.assign(dom.style, nextProps.style);
      } else {
        dom.setAttribute(name, nextProps[name]);
      }
    });

  Object.keys(nextProps)
    .filter(name => name.startsWith("on"))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      if (prevProps[name] !== nextProps[name]) {
        dom.addEventListener(eventType, nextProps[name]);
      }
    });
}


export function createDom(fiber) {
  if (fiber.type === "text") {
    return document.createTextNode(fiber.props.nodeValue);
  }

  if (fiber.type === Fragment || typeof fiber.type === "function") {
    fiber.dom = null;
    return null;
  }

  const dom = document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);
  return dom;
}
