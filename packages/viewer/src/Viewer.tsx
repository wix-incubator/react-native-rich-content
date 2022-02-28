import React from 'react';
import { View, ViewProps, TextProps } from 'react-native';
import redraft from 'wix-redraft';
import { ViewerPlugin } from '@react-native-rich-content/common';
import { createRenderers } from './draft-utils/create-renderers';

export interface ViewerProps {
    plugins: ViewerPlugin<any>[]; // TODO declare it better
    content: {
        blocks: Object;
        entityMap: Object;
    },
    style?: ViewProps['style'];
    textStyle?: TextProps['style']
}

export function Viewer({
  plugins, content, style, textStyle,
}: ViewerProps) {
  const renderers = createRenderers(plugins, textStyle);
  return (
    <View
      style={style}
    >
      {redraft(content, renderers)}
    </View>
  );
}
