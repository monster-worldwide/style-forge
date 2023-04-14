export const transparentBackgroundParserPlugin = () => {
  return {
    id: 'background',
    runParser: (element: any) =>
      runCondition(element)
        ? { parserResult: setBackground(), pluginData: {} }
        : { parserResult: {}, pluginData: {} },
  };
};

const setBackground = () => {
  return { backgroundColor: 'transparent' };
};

const runCondition = (element: any) => {
  const allowedElementTypes = [
    'ELLIPSE',
    'RECTANGLE',
    'VECTOR',
    'COMPONENT',
    'INSTANCE',
    'FRAME',
  ];
  return (
    'fills' in element &&
    Array.isArray(element.fills) &&
    allowedElementTypes.includes(element.type) &&
    !element?.name?.startsWith('md-icon')
  );
};
