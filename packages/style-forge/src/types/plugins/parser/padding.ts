import { Node } from '../../figma';

export type NodeWithPadding = Partial<
  Pick<
    Node<'FRAME'>,
    'paddingLeft' | 'paddingRight' | 'paddingBottom' | 'paddingTop'
  >
>;

export type Padding = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};
