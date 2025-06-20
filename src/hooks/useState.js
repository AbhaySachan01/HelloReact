import {
  getWipRoot,
  getWipFiber,
  getHookIndex,
  setHookIndex,
  getCurrentRoot,
  setWipRoot,
  setNextUnitOfWork,
  clearDeletions
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

  // ✅ Important: clear oldHook's queue so updates are not re-applied next render
  if (oldHook) oldHook.queue = [];

  wipFiber.hooks.push(hook);
  setHookIndex(hookIndex + 1);

  const setState = (action) => {
    hook.queue.push(action);

    const currentRoot = getCurrentRoot();
    if (!currentRoot) {
      console.warn("❌ currentRoot is null, cannot re-render");
      return;
    }

    const newRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    setWipRoot(newRoot);
    setNextUnitOfWork(newRoot);
    clearDeletions();
  };

  return [hook.state, setState];
}
