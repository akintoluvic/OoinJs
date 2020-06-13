function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "object"
            ? child
            : createTextElement(child)
        ),
      },
    }
  }
  ​
  // wrap everything that isn’t an object inside its own element and create a special type for them: TEXT_ELEMENT.
  function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    }
  }
  ​
  function render(element, container) {
    const dom =
      element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type)
  ​
    const isProperty = key => key !== "children"
    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name]
      })
  ​
    element.props.children.forEach(child =>
      render(child, dom)
    )
  ​
    container.appendChild(dom)
  }
  ​
  const Ragnar = {
    createElement,
    render,
  }
  ​
  /** @jsx Ragnar.createElement */
  const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )
  
  const container = document.getElementById("root")
  Ragnar.render(element, container)
  