import { autolayoutParserPlugin } from './autolayout';
import { backgroundParserPlugin } from './background';
import { borderParserPlugin } from './border';
import { boxShadowParserPlugin } from './box-shadow';
import { fontFallbackParserPlugin } from './font-fallback';
import { paddingParserPlugin } from './padding';
import { sizeParserPlugin } from './size';
import { textParserPlugin } from './text';
import { variantIconParserPlugin } from './variant-icon';

const ParserPlugins = {
  AutolayoutParserPlugin: 'autolayout',
  BackgroundParserPlugin: 'background',
  BorderParserPlugin: 'border',
  BoxShadowParserPlugin: 'box-shadow',
  FontFallbackParserPlugin: 'font-fallback',
  PaddingParserPlugin: 'padding',
  SizeParserPlugin: 'size',
  TextParserPlugin: 'text',
  VariantIconParserPlugin: 'variant-icon',
};

const parserPluginSelector = (pluginId: string) => {
  switch (pluginId) {
    case ParserPlugins.AutolayoutParserPlugin:
      return autolayoutParserPlugin;
    case ParserPlugins.BackgroundParserPlugin:
      return backgroundParserPlugin;
    case ParserPlugins.BorderParserPlugin:
      return borderParserPlugin;
    case ParserPlugins.BoxShadowParserPlugin:
      return boxShadowParserPlugin;
    case ParserPlugins.FontFallbackParserPlugin:
      return fontFallbackParserPlugin;
    case ParserPlugins.PaddingParserPlugin:
      return paddingParserPlugin;
    case ParserPlugins.SizeParserPlugin:
      return sizeParserPlugin;
    case ParserPlugins.TextParserPlugin:
      return textParserPlugin;
    case ParserPlugins.VariantIconParserPlugin:
      return variantIconParserPlugin;
    default:
      return null;
  }
};

export {
  ParserPlugins,
  parserPluginSelector,
  autolayoutParserPlugin,
  backgroundParserPlugin,
  borderParserPlugin,
  boxShadowParserPlugin,
  fontFallbackParserPlugin,
  paddingParserPlugin,
  sizeParserPlugin,
  textParserPlugin,
  variantIconParserPlugin,
};
