import { ThemeParserObject, Node, AutolayoutData } from '../../../types';

export const setAutolayout = (
  element: Node,
  autolayoutData: AutolayoutData,
): ThemeParserObject => {
  return {
    ...setAutolayoutParentData(element),
    ...setAutolayoutChildData(element, autolayoutData),
  };
};

type AutoLayoutParent = {
  layoutMode: string;
  primaryAxisAlignItems: string;
  counterAxisAlignItems: string;
};

type AutoLayoutParentArg = AutoLayoutParent | Node;

const isAutoLayoutParent = (
  candidate: AutoLayoutParentArg,
): candidate is AutoLayoutParent =>
  'layoutMode' in candidate && typeof candidate.layoutMode === 'string';

const setAutolayoutParentData = (element: Node) => {
  const result: ThemeParserObject = {};
  if (!isAutoLayoutParent(element)) {
    return result;
  }
  const {
    layoutMode,
    primaryAxisAlignItems,
    counterAxisAlignItems = 'MIN',
  } = element;
  const justifyContent =
    primaryAxisAlignItems === 'MAX'
      ? 'flex-end'
      : primaryAxisAlignItems === 'SPACE_BETWEEN'
      ? 'space-between'
      : undefined;
  const alignItems =
    counterAxisAlignItems === 'MIN'
      ? 'flex-start'
      : counterAxisAlignItems === 'MAX'
      ? 'flex-end'
      : counterAxisAlignItems === 'CENTER'
      ? 'center'
      : undefined;
  if (justifyContent) {
    result.justifyContent = justifyContent;
  }
  if (alignItems) {
    result.alignItems = alignItems;
  }

  if (layoutMode === 'HORIZONTAL') {
    result.display = 'flex';
    result.flexDirection = 'row';
  }
  if (layoutMode === 'VERTICAL') {
    result.display = 'flex';
    result.flexDirection = 'column';
  }
  return result;
};

type LayoutProps = {
  layoutAlign: string;
  layoutGrow: number;
};

type LayoutInput = Partial<LayoutProps> | Node;

const hasLayoutProps = (
  candidate: LayoutInput,
): candidate is Partial<LayoutProps> => {
  return (
    ('layoutAlign' in candidate && typeof candidate.layoutAlign === 'string') ||
    ('layoutGrow' in candidate && typeof candidate.layoutGrow === 'number')
  );
};

const isNumber = (value: string | number): boolean => {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
};

const getMarginValue = (
  itemSpacing: number,
  layoutMode: 'HORIZONTAL' | 'VERTICAL',
  position: 'FIRST' | 'MIDDLE' | 'LAST',
) => {
  const verticalMargin = itemSpacing;
  const horizontalMargin = itemSpacing / 2;
  if (layoutMode === 'HORIZONTAL') {
    switch (position) {
      case 'FIRST':
        return `0px ${horizontalMargin}px 0px 0px`;
      case 'MIDDLE':
        return `0px ${horizontalMargin}px`;
      case 'LAST':
        return `0px 0px 0px ${horizontalMargin}px`;
    }
  } else {
    switch (position) {
      case 'FIRST':
        return `0px 0px ${verticalMargin}px 0px`;
      case 'MIDDLE':
        return `${verticalMargin}px 0px`;
      case 'LAST':
        return `${verticalMargin}px 0px 0px 0px`;
    }
  }
};

const setAutolayoutChildData = (
  element: Node,
  autolayoutData: AutolayoutData,
) => {
  const result: ThemeParserObject = {};
  if (!hasLayoutProps(element)) {
    return result;
  }
  const { layoutAlign, layoutGrow } = element;
  const { order, itemSpacing, childrenCount, layoutMode } = autolayoutData;
  if (isNumber(order) && order !== 0) {
    result.order = order;
  }
  if (layoutAlign === 'STRETCH') {
    result.alignSelf = 'stretch';
  }
  if (layoutGrow !== 0 && layoutGrow !== undefined) {
    result.flexGrow = layoutGrow;
  }
  if (itemSpacing && layoutMode && childrenCount > 1) {
    if (order === 0) {
      result.margin = getMarginValue(itemSpacing, layoutMode, 'FIRST');
    } else if (order === childrenCount - 1) {
      result.margin = getMarginValue(itemSpacing, layoutMode, 'LAST');
    } else {
      result.margin = getMarginValue(itemSpacing, layoutMode, 'MIDDLE');
    }
  }
  return result;
};
