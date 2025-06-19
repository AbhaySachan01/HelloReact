import { performUnitOfWork } from "./performUnitOfWork.js";
import {commitRoot} from "./commit.js";
import {
  getWipRoot,
  getCurrentRoot,
  setWipRoot,
  setCurrentRoot,
  setDeletions,
  getNextUnitOfWork,
  setNextUnitOfWork, 
} from "./global.js";

let localDeletions = [];

export function render(element, container) {
  const prevRoot = getCurrentRoot();


  const root = {
    dom: container,
    props: { children: [element] },
    alternate: prevRoot,
  };

  setWipRoot(root);
  setCurrentRoot(root); 
  setNextUnitOfWork(root);
  localDeletions = [];
}

function workLoop(deadline) {
  let shouldYield = false;
  let nextUnit = getNextUnitOfWork();

  while (nextUnit && !shouldYield) {
    nextUnit = performUnitOfWork(nextUnit);
    setNextUnitOfWork(nextUnit);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!getNextUnitOfWork() && getWipRoot()) {
    setDeletions(localDeletions);
    commitRoot(getWipRoot()); 
    setWipRoot(null);
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
