export function createNewElement(type, props, ...children) {
  const flatChildren = children.flat().map((child) => {
    if (typeof child === "object") {
      if (!child.type) {
        return createNewTextElement(child.toString());
      }
      return child;
    } else {
      return createNewTextElement(child);
    }
  });

  return {
    type,
    props: {
      ...props,
      children: flatChildren,
    },
  };
}

function createNewTextElement(text) {
  return {
    type: "text",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export const Fragment = "FRAGMENT";
