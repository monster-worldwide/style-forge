/**
 * @param children node list of child node
 * @returns a list of unique color fills inside all children
 *
 * A method which will get all unique color fills by recursively searching in child attributes.
 */

export const getDistinctFills = (
  children: NodeListOf<ChildNode> | null,
): string[] => {
  const fills: string[] = [];
  if (!children || Object.keys(children).length === 0) {
    return fills;
  }
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.childNodes && child.childNodes.length > 0) {
      fills.push(...getDistinctFills(child.childNodes));
    }
    const childAttrs = (child as Element).attributes;
    if (childAttrs && childAttrs.getNamedItem('fill')) {
      fills.push(String(childAttrs.getNamedItem('fill')?.value));
    }
  }
  return fills.filter((value, index, self) => self.indexOf(value) === index);
};
