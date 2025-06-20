import { PLACEMENT, UPDATE, DELETION } from "./global.js";
import { addDeletion } from "./global.js";
import { createDom } from "./dom.js";

export function reconcile(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate?.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: UPDATE,
        hooks: oldFiber.hooks || [],
      };
    } else {
      if (element) {
        const isTextUpdate = oldFiber?.type === "text" && element.type === "text";

        newFiber = {
          type: element.type,
          props: element.props,
          dom: isTextUpdate ? oldFiber.dom : null,
          parent: wipFiber,
          alternate: isTextUpdate ? oldFiber : null,
          effectTag: isTextUpdate ? UPDATE : PLACEMENT,
        };

        // ✅ DOM create karo agar new fiber place ho raha hai aur dom abhi tak nahin hai
        if (newFiber.effectTag === PLACEMENT && !newFiber.dom) {
          newFiber.dom = createDom(newFiber);
        }
      }

      if (oldFiber && !sameType) {
        oldFiber.effectTag = DELETION;
        addDeletion(oldFiber);
      }
    }

    if (oldFiber) oldFiber = oldFiber.sibling;

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (prevSibling) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}
