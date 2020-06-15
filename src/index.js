// const { default: Ooi } = require("./Ooi");

function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "object" ? child : createTextElement(child)
        )
      }
    };
  }
  
  function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    };
  }
  
  function render(element, container) {
    const dom =
      element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);
    const isProperty = key => key !== "children";
    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name];
      });
    element.props.children.forEach(child => render(child, dom));
    container.appendChild(dom);
  }
  
  // requestIdleCallback(workLoop)
  
  function performUnitOfWork(fiber) {
    if (!fiber.dom) {
      fiber.dom = createDom(fiber)
    }
  
      const elements = fiber.props.children
    let index = 0
    let prevSibling = null
  
    while (index < elements.length) {
      const element = elements[index]
      
      const newFiber = {
        type: element.type,
        props: element.props,
        parent: fiber,
        dom: null,
      }
  
      if (index === 0) {
        fiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber
      }
  
      prevSibling = newFiber
      index++
    }
  
    if (fiber.child) {
      return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling
      }
      nextFiber = nextFiber.parent
    }
  }
  
  const Ooi = {
    createElement,
    render
  };
  
  /** @jsx Ooi.createElement */
  const element = (
    <div style="background: salmon">
      <h1>Hello World</h1>
      <h1>Hello World You and I</h1>
      <h2 style="text-align:right">from Ooi</h2>
    </div>
  );
  const container = document.getElementById("root");
  Ooi.render(element, container);
  