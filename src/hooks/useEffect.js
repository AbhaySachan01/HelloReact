import { getWipFiber, getHookIndex, setHookIndex } from "../global.js";

export function useEffect(effectFn, deps) {
  const wipFiber = getWipFiber();
  const hookIndex = getHookIndex();
  const oldHook = wipFiber.alternate?.hooks?.[hookIndex];

  let hasChanged = true;

  if (oldHook) {
    if (!deps) {
      hasChanged = true;
    } else {
      hasChanged = deps.some((dep, i) => !Object.is(dep, oldHook.deps?.[i]));
    }
  }

  const hook = {
    effect: hasChanged ? effectFn : null,
    cleanup: oldHook?.cleanup || null,
    deps,
  };

  wipFiber.hooks.push(hook);
  setHookIndex(hookIndex + 1);
}
