import { Fragment } from "./createElement.js";

export function createDom(fiber) {
  if (fiber.type === "text") {
    return document.createTextNode(fiber.props.nodeValue);
  }

  if (fiber.type === Fragment) {
    fiber.dom = null;
    return null;
  }

  return document.createElement(fiber.type);
}
