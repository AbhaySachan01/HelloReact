import { updateDom, createDom } from "./dom.js";
import { PLACEMENT, UPDATE, DELETION } from "./global.js";
import {
  getDeletions,
  clearDeletions,
  setCurrentRoot,
} from "./global.js";

function commitWork(fiber) {
  if (!fiber) return;

  let domParentFiber = fiber.parent;
  while (domParentFiber && !domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber?.dom;

  // ⚠️ Ensure fiber.dom is created if missing
  if (!fiber.dom && fiber.type !== "function" && fiber.type !== "FRAGMENT") {
    fiber.dom = createDom(fiber);
  }

  // 🔁 Apply DOM changes
  if (fiber.effectTag === PLACEMENT && fiber.dom && domParent) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === UPDATE && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate?.props || {}, fiber.props || {});
  } else if (fiber.effectTag === DELETION) {
    commitDeletion(fiber, domParent);
    return;
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    let child = fiber.child;
    while (child) {
      commitDeletion(child, domParent);
      child = child.sibling;
    }
  }
}

function runEffects(fiber) {
  if (!fiber) return;

  if (fiber.hooks) {
    for (let hook of fiber.hooks) {
      if (hook.effect) {
        console.log("🔁 Running effect");
        if (hook.cleanup) hook.cleanup();
        const cleanup = hook.effect();
        hook.cleanup = typeof cleanup === "function" ? cleanup : null;
      }
    }
  }

  runEffects(fiber.child);
  runEffects(fiber.sibling);
}

export function commitRoot(wipRoot) {
  getDeletions().forEach(commitWork);
  commitWork(wipRoot.child);
  setCurrentRoot(wipRoot);
  clearDeletions();
  runEffects(wipRoot.child);
}
