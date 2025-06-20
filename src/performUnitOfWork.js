import { createDom } from "./dom.js";
import { reconcile } from "./reconcile.js";
import { setWipFiber, setHookIndex } from "./global.js";

export function performUnitOfWork(fiber) {
  const isFunctionComponent = typeof fiber.type === "function";

  if (isFunctionComponent) {
    setWipFiber(fiber);
    setHookIndex(0);

    fiber.hooks = [];
    // fiber.dom = null;

    const children = [fiber.type(fiber.props)];
    reconcile(fiber, children);
  } 
  
  else {
    if (!fiber.dom) {
      fiber.dom = createDom(fiber);
    }

    // Find parent with a real DOM node
    let parentFiber = fiber.parent;
    while (parentFiber && !parentFiber.dom) {
      parentFiber = parentFiber.parent;
    }

    // Reconcile children
    reconcile(fiber, fiber.props?.children || []);
  }

  // Return next unit of work (DFS)
  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }

  return null;
}
