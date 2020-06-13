/** @jsx Didact.createElement */
const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )

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
      children,
    },
  }
}

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

const Ragnar = {
    createElement
}

const element = Ragnar.createElement(
"div",
{ id: "foo" },
Ragnar.createElement("a", null, "bar"),
Ragnar.createElement("b")
)

const container = document.getElementById("root")
Ragnar.render(element, container)