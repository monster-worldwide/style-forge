import { Node, NodeType, TextCase, TextDecoration } from 'figma-api';

export const createNode = (
  name: string,
  type: NodeType,
  visible: boolean = true,
) => {
  return {
    id: '',
    name,
    type,
    visible,
  } as Node;
};

export const createFrame = (name: string, children: Node[] = []) => {
  return { ...createNode(name, 'FRAME'), children } as Node<'FRAME'>;
};

export const createEllipse = (name: string) => {
  return createNode(name, 'ELLIPSE') as Node<'ELLIPSE'>;
};

export const createRectangle = (
  name: string,
  color: string,
  strokeColor: string,
  width: number = 20,
  height: number = 10,
) => {
  return {
    ...createNode(name, 'RECTANGLE'),
    ...createPaint(color),
    ...createStrokes(strokeColor),
    absoluteBoundingBox: { x: 0, y: 0, width, height },
  } as Node<'RECTANGLE'>;
};

export const createVector = (
  name: string,
  color: string,
  width: number = 20,
  height: number = 10,
) => {
  return {
    ...createNode(name, 'VECTOR'),
    ...createPaint(color),
    absoluteBoundingBox: { x: 0, y: 0, width, height },
  } as Node<'VECTOR'>;
};

export const createText = (
  name: string,
  color: string,
  fontFamily: string = 'Arial',
  fontWeight: number = 400,
  fontSize: number = 12,
  lineHeightPx: number = 20,
  textCase: TextCase | undefined | string = undefined,
  textDecoration: TextDecoration | undefined | string = undefined,
) => {
  const style = {
    style: {
      fontFamily,
      fontWeight,
      fontSize,
      lineHeightPx,
      textCase,
      textDecoration,
    },
  };
  return {
    ...createNode(name, 'TEXT'),
    ...createPaint(color),
    ...style,
  } as Node<'TEXT'>;
};

export const createComponentSet = (name: string, children: Node[]) => {
  return {
    ...createNode(name, 'COMPONENT_SET'),
    children,
  } as Node<'COMPONENT_SET'>;
};

export const createComponent = (name: string, children: Node[]) => {
  return {
    ...createNode(name, 'COMPONENT'),
    children,
  } as Node<'COMPONENT'>;
};

export const createIcon = (name: string, color: string) => {
  return {
    ...createFrame(name, [createVector(`icon${name}`, color)]),
  };
};

export const attachAutolayout = (node: Node, isParent: boolean) => {
  const props = isParent
    ? {
        layoutMode: 'HORIZONTAL',
        itemSpacing: 10,
        primaryAxisAlignItems: 'MAX',
        counterAxisAlignItems: 'MIN',
      }
    : {
        layoutAlign: 'STRETCH',
        layoutGrow: 1,
        order: 1,
      };
  return { ...node, ...props };
};

export const colorSelection = (color: string) => {
  switch (color) {
    case 'black':
      return { r: 0, g: 0, b: 0, a: 1 };
    case 'green':
      return { r: 0, g: 1, b: 0, a: 1 };
    case 'red':
      return { r: 1, g: 0, b: 0, a: 1 };
    case 'blue':
      return { r: 0, g: 0, b: 1, a: 1 };
    case 'white':
    default:
      return { r: 1, g: 1, b: 1, a: 1 };
  }
};

export const createPaint = (color: string, type: string = 'SOLID') => {
  return color !== 'no-fill'
    ? {
        fills: [
          color === 'none'
            ? {}
            : {
                blendMode: 'NORMAL',
                type,
                color: colorSelection(color),
              },
        ],
      }
    : {};
};

export const createStrokes = (color: string, type: string = 'SOLID') => {
  return color !== 'no-stroke'
    ? {
        strokes: [
          {
            blendMode: 'NORMAL',
            type,
            color: colorSelection(color),
          },
        ],
      }
    : {};
};

export enum NodeContent {
  TRUE,
  EMPTY,
  FALSE,
}
