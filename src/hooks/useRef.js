import {
  getWipFiber,
  getHookIndex,
  setHookIndex,
} from "../global.js";

export function useRef(initialValue) {
  const wipFiber = getWipFiber();
  const hookIndex = getHookIndex();

  const oldHook = wipFiber.alternate?.hooks?.[hookIndex];
  const hook = oldHook ? oldHook : { current: initialValue };

  wipFiber.hooks.push(hook);
  setHookIndex(hookIndex + 1);

  return hook;
}
