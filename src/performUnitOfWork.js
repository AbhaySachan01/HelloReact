import { createDom } from "./createDom.js";

export function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.dom) {
    let parentFiber = fiber.parent;
    while (parentFiber && parentFiber.dom == null) {
      parentFiber = parentFiber.parent;
    }
    if (parentFiber?.dom) {
      parentFiber.dom.appendChild(fiber.dom);
    }
  }

  const children = fiber.props.children || [];
  let prevSibling = null;

  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
  });

  if (fiber.child) return fiber.child;
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }

  return null;
}
