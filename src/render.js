import { setNextUnitOfWork } from "./scheduler.js";

export function render(element, container) {
  const wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: null,
  };
  setNextUnitOfWork(wipRoot);
}
