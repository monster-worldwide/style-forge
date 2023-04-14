const dashKey = (key: string) => {
  return key.replace(/([A-Z])/g, (match) => '-' + match[0].toLowerCase());
};

export const spacingHorizontalTokens = (key: string, properties: object) => {
  return [`${dashKey(key)}: ${(properties as any).width};`];
};

export const spacingVerticalTokens = (key: string, properties: object) => {
  return [`${dashKey(key)}: ${(properties as any).width};`];
};

export const colorTokens = (key: string, properties: object) => {
  return [
    `${dashKey(key)}: ${
      (properties as any).backgroundColor || (properties as any).color
    };`,
  ];
};

export const typographyTokens = (key: string, properties: object) => {
  const tokens = [];
  for (const propertyKey of Object.keys(properties)) {
    tokens.push([
      `${dashKey(key)}-${dashKey(propertyKey)}: ${properties[propertyKey]};`,
    ]);
  }
  return tokens;
};
