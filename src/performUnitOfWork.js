import { createDom } from "./dom.js";
import { reconcile } from "./reconcile.js";

export function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  let parentFiber = fiber.parent;
  while (parentFiber && !parentFiber.dom) {
    parentFiber = parentFiber.parent;
  }

  if (fiber.dom && parentFiber?.dom) {
    parentFiber.dom.appendChild(fiber.dom);
  }

  reconcile(fiber, fiber.props.children || []);

  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }

  return null;
}
