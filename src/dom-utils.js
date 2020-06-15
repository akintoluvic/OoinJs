import { TEXT_ELEMENT } from "./element";

/**
 * @param {HTMLElement} dom - the html element where props get applied to
 * @param {object} props - consists of both attributes and event listeners.
 */
export function updateDomProperties(dom, props) {
  const isListener = name => name.startsWith("on");
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  const isAttribute = name => !isListener(name) && name !== "children";
  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name];
    });
}