import { createFrame, createRectangle } from '../../utils';
import { isNodeWithChildren, isTraversable } from './children-nodes';

describe('Test Children nodes types', () => {
  it('will validate node has children', () => {
    const result = isNodeWithChildren(
      createFrame('test', [createFrame('test')]),
    );

    expect(result).toEqual(true);
  });
  it('will validate node is traversable', () => {
    const result = isTraversable(createRectangle('test', 'white', 'black'));

    expect(result).toEqual(false);
  });
});
