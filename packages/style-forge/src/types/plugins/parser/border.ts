import { Node } from '../../figma';

export type BorderElement = Pick<
  Node<'RECTANGLE'>,
  'strokes' | 'strokeWeight'
> &
  Partial<Pick<Node<'RECTANGLE'>, 'cornerRadius' | 'rectangleCornerRadii'>>;
