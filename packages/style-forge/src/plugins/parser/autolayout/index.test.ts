import { createNode } from '../../../utils';
import { Node } from '../../../types';
import { autolayoutParserPlugin } from '.';

const mockAutolayoutParent = (
  layoutMode?: string,
  itemSpacing?: number,
  primaryAxisAlignItems?: string,
  counterAxisAlignItems?: string,
  children?: Node[],
) => {
  return {
    ...createNode('test', 'FRAME'),
    layoutMode,
    itemSpacing,
    primaryAxisAlignItems,
    counterAxisAlignItems,
    children,
  } as Node<'FRAME'>;
};

const mockAutolayoutChild = (layoutAlign?: string, layoutGrow?: number) => {
  return {
    ...createNode('test', 'FRAME'),
    layoutAlign,
    layoutGrow,
  } as Node<'RECTANGLE'>;
};

describe('Test Autolayout Parser Plugin', () => {
  it('will parse parent layoutMode data', () => {
    const resultHorizontal = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('HORIZONTAL'),
    );
    expect(resultHorizontal).toEqual({
      parserResult: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
      },
      pluginData: {
        autolayout: {
          layoutMode: 'HORIZONTAL',
          itemSpacing: undefined,
          childrenCount: 0,
          order: 0,
        },
      },
    });
    const resultVertical = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('VERTICAL'),
    );
    expect(resultVertical).toEqual({
      parserResult: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
      },
      pluginData: {
        autolayout: {
          layoutMode: 'VERTICAL',
          itemSpacing: undefined,
          childrenCount: 0,
          order: 0,
        },
      },
    });

    const resultWrong = autolayoutParserPlugin().runParser(
      mockAutolayoutParent(''),
    );
    expect(resultWrong).toEqual({
      parserResult: {
        alignItems: 'flex-start',
      },
      pluginData: {
        autolayout: {
          layoutMode: undefined,
          itemSpacing: undefined,
          childrenCount: 0,
          order: 0,
        },
      },
    });
  });
  it('will parse parent primaryAxis value', () => {
    const resultNoValue = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('HORIZONTAL', undefined, ''),
    );
    expect(resultNoValue.parserResult).toEqual({
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
    });
    const resultSpaceBetween = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('HORIZONTAL', undefined, 'SPACE_BETWEEN'),
    );
    expect(resultSpaceBetween.parserResult).toEqual({
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      display: 'flex',
      flexDirection: 'row',
    });

    const resultMax = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('HORIZONTAL', undefined, 'MAX'),
    );
    expect(resultMax.parserResult).toEqual({
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      display: 'flex',
      flexDirection: 'row',
    });
  });
  it('will parse parent counterAxis value', () => {
    const resultMax = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('HORIZONTAL', undefined, '', 'MAX'),
    );
    expect(resultMax.parserResult).toEqual({
      alignItems: 'flex-end',
      display: 'flex',
      flexDirection: 'row',
    });
    const resultCenter = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('HORIZONTAL', undefined, '', 'CENTER'),
    );
    expect(resultCenter.parserResult).toEqual({
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
    });

    const resultInvalid = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('HORIZONTAL', undefined, '', 'INVALID_OPTION'),
    );
    expect(resultInvalid.parserResult).toEqual({
      display: 'flex',
      flexDirection: 'row',
    });
  });

  it('will parse child layoutAlign value', () => {
    const pluginData = {
      autolayout: {
        layoutMode: 'HORIZONTAL',
        itemSpacing: undefined,
        childrenCount: 0,
        order: 0,
      },
    };

    const childMissingBoth = autolayoutParserPlugin().runParser(
      mockAutolayoutChild(),
      undefined,
      pluginData,
    );
    expect(childMissingBoth.parserResult).toEqual({});

    const childMissingAlign = autolayoutParserPlugin().runParser(
      mockAutolayoutChild(undefined, 1),
      undefined,
      pluginData,
    );
    expect(childMissingAlign.parserResult).toEqual({
      flexGrow: 1,
    });

    const childStretch = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      pluginData,
    );
    expect(childStretch.parserResult).toEqual({
      alignSelf: 'stretch',
    });
  });
  it('will parse child stretch value', () => {
    const pluginData = {
      autolayout: {
        layoutMode: 'HORIZONTAL',
        itemSpacing: undefined,
        childrenCount: 0,
        order: 0,
      },
    };

    const childMissing = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      pluginData,
    );
    expect(childMissing.parserResult).toEqual({ alignSelf: 'stretch' });

    const childZero = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH', 0),
      undefined,
      pluginData,
    );
    expect(childZero.parserResult).toEqual({
      alignSelf: 'stretch',
    });

    const childStretch = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      pluginData,
    );
    expect(childStretch.parserResult).toEqual({
      alignSelf: 'stretch',
    });
  });
  it('will parse margin stretch value', () => {
    const getParserData = (layoutMode: string, order: number) => {
      return {
        autolayout: {
          layoutMode,
          itemSpacing: 10,
          childrenCount: 3,
          order,
        },
      };
    };

    const childZero = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      getParserData('HORIZONTAL', 0),
    );
    expect(childZero.parserResult).toEqual({
      alignSelf: 'stretch',
      margin: '0px 5px 0px 0px',
    });

    const childOne = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      getParserData('HORIZONTAL', 1),
    );
    expect(childOne.parserResult).toEqual({
      alignSelf: 'stretch',
      margin: '0px 5px',
      order: 1,
    });

    const childTwo = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      getParserData('HORIZONTAL', 2),
    );
    expect(childTwo.parserResult).toEqual({
      alignSelf: 'stretch',
      margin: '0px 0px 0px 5px',
      order: 2,
    });

    const childZeroV = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      getParserData('VERTICAL', 0),
    );
    expect(childZeroV.parserResult).toEqual({
      alignSelf: 'stretch',
      margin: '0px 0px 10px 0px',
    });

    const childOneV = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      getParserData('VERTICAL', 1),
    );
    expect(childOneV.parserResult).toEqual({
      alignSelf: 'stretch',
      margin: '10px 0px',
      order: 1,
    });

    const childTwoV = autolayoutParserPlugin().runParser(
      mockAutolayoutChild('STRETCH'),
      undefined,
      getParserData('VERTICAL', 2),
    );
    expect(childTwoV.parserResult).toEqual({
      alignSelf: 'stretch',
      margin: '10px 0px 0px 0px',
      order: 2,
    });
  });

  it('will return plugin data', () => {
    const data = autolayoutParserPlugin().runParser(
      mockAutolayoutParent('HORIZONTAL', 10, undefined, undefined, [
        createNode('test', 'FRAME'),
        createNode('.ds-ignore-test', 'FRAME'),
        createNode('test', 'FRAME'),
      ]),
    );
    expect(data.pluginData).toEqual({
      autolayout: {
        childrenCount: 2,
        itemSpacing: 10,
        layoutMode: 'HORIZONTAL',
        order: 0,
      },
    });
    const wontRun = autolayoutParserPlugin().runParser(
      createNode('test', 'DOCUMENT'),
    );
    expect(wontRun.pluginData).toEqual({});
  });
});
