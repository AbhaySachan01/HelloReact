import { commitRoot } from "./commit.js";
import { performUnitOfWork } from "./performUnitOfWork.js";
import {
  getWipRoot,
  getCurrentRoot,
  setWipRoot,
  setCurrentRoot,
  setDeletions,
} from "./global.js";

let nextUnitOfWork = null;
let localDeletions = [];

export function render(element, container) {
  setWipRoot({
    dom: container,
    props: { children: [element] },
    alternate: getCurrentRoot(),
  });
  localDeletions = [];
  nextUnitOfWork = getWipRoot();
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && getWipRoot()) {
    setDeletions(localDeletions);
    commitRoot(getWipRoot());
    setCurrentRoot(getWipRoot());
    setWipRoot(null);
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
