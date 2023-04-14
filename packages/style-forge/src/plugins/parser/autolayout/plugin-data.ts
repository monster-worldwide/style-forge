import { Node } from '../../../types';
import { IGNORE_PREFIX } from '../../../utils';

export const setAutolayoutPluginData = (element: Node) => {
  if (!('layoutMode' in element) || typeof element.layoutMode !== 'string') {
    return {};
  }
  const { layoutMode, itemSpacing, children } = element;
  return {
    autolayout: {
      layoutMode:
        layoutMode === 'HORIZONTAL'
          ? 'HORIZONTAL'
          : layoutMode === 'VERTICAL'
          ? 'VERTICAL'
          : undefined,
      itemSpacing: itemSpacing,
      childrenCount:
        children?.filter(
          (child) =>
            !child.name.startsWith(IGNORE_PREFIX) && child.visible !== false,
        ).length || 0,
      order: 0,
    },
  };
};
