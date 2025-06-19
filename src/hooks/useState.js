import {
  getWipFiber,
  getHookIndex,
  setHookIndex,
  getCurrentRoot,
  setWipRoot,
  setNextUnitOfWork,
} from "../global.js";

export function useState(initial) {
  const wipFiber = getWipFiber();
  const hookIndex = getHookIndex();
  
  const oldHook = wipFiber.alternate?.hooks?.[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  if (oldHook?.queue?.length > 0) {
    for (let action of oldHook.queue) {
      hook.state = typeof action === "function" ? action(hook.state) : action;
    }
  }

  if (oldHook) oldHook.queue = [];


  wipFiber.hooks.push(hook);

  const currentHookIndex = hookIndex;
  setHookIndex(hookIndex + 1);

  const setState = (action) => {
    const currentRoot = getCurrentRoot();
    const currentRootAlt = currentRoot?.alternate;

    const altHook = currentRootAlt?.hooks?.[currentHookIndex];
    if (altHook) {
      altHook.queue.push(action);
    } else {
      hook.queue.push(action);
    }

    const newRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    setWipRoot(newRoot);
    setNextUnitOfWork(newRoot);
  };

  return [hook.state, setState];
}
