import {
  getWipFiber,
  getHookIndex,
  setHookIndex,
} from "../global.js";

export function useEffect(effectFn, deps) {
  const wipFiber = getWipFiber();
  const hookIndex = getHookIndex();
  console.log("useEffect hook ran");


  const oldHook = wipFiber.alternate?.hooks?.[hookIndex];

  let hasChanged = true;

  // 🚨 Dependency check
  if (oldHook && oldHook.deps) {
    hasChanged = !deps || deps.some((dep, i) => !Object.is(dep, oldHook.deps[i]));
  }

  const hook = {
    effect: hasChanged ? effectFn : null,
    cleanup: hasChanged && oldHook?.cleanup ? oldHook.cleanup : null,
    deps,
  };

  wipFiber.hooks.push(hook);
  setHookIndex(hookIndex + 1);
}
