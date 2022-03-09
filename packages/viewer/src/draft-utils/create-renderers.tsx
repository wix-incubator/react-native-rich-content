import React, { ReactNode, ReactElement } from 'react';
import { Text, View, TextProps } from 'react-native';
import { ViewerPlugin } from '@react-native-rich-content/common';
import { createStylesRenderer } from 'wix-redraft';

export type Renderers = {
    blocks: Record<string, (children: ReactNode) => ReactElement>
    entities: Record<string, (children: ReactNode, data: any, { key }
        : {key:string}) => ReactElement>;
    styles: 'any'
};

const inlineStylesMap = {
  BOLD: {
    fontWeight: 'bold',
  },
  ITALIC: {
    fontStyle: 'italic',
  },
  UNDERLINE: {
    textDecoration: 'underline',
  },
};

function InlineWrapper({ children, style, key }: any) {
  return <Text key={key} style={style}>{children}</Text>;
}

export const createRenderers = (plugins: ViewerPlugin<any>[], textStyle?: TextProps['style']): Renderers => {
  const entities: Renderers['entities'] = {};
  const blocks: Renderers['blocks'] = {
    // @ts-ignore
    // eslint-disable-next-line max-len
    unstyled: (children) => children.map((child) => <View><Text style={textStyle}>{child}</Text></View>),
  };
  plugins.forEach((plugin) => {
    const Component = plugin.component;
    entities[plugin.entityType] = (children: ReactNode, data: any, { key }
        : {key: number | string}) => {
      const shouldRenderInsideTextTag = typeof children === 'string';
      const renderChildren = () => (shouldRenderInsideTextTag
        ? (<Text>{children}</Text>) : children);
      return (
        <Component
          data={data}
          key={key}
        >
          {renderChildren()}
        </Component>
      );
    };
  });

  return {
    blocks,
    entities,
    styles: createStylesRenderer(InlineWrapper, inlineStylesMap),
  };
};
