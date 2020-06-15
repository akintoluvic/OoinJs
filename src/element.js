export const TEXT_ELEMENT = "TEXT";

/**
 * @param {string} type - the node type
 * @param {?object} configObject - the props
 * @param  {?...any} args - the children array
 * @returns {object} - to be called by tevreact.render
 */
export function createElement(type, configObject, ...args) {
  const props = Object.assign({}, configObject);
  const hasChildren = args.length > 0;
  const nodeChildren = hasChildren ? [...args] : [];
  props.children = nodeChildren
    .filter(Boolean)
    .map(c => (c instanceof Object ? c : createTextElement(c)));

  return { type, props };
}

/**
 * @param {string} nodeValue - the text of the node
 * @returns {object} - a call to createElement
 */
function createTextElement(nodeValue) {
  return createElement(TEXT_ELEMENT, { nodeValue, children: [] });
}