import React, {ReactNode, ReactElement} from 'react';
import {Text} from 'react-native';
import { ViewerPlugin } from "@react-native-rich-content/common";
import {createStylesRenderer} from 'wix-redraft';

type Renderers = {
    blocks: Record<string, (children: ReactNode) => ReactElement>
    entities: Record<string, (children: ReactNode, data: any, {key}: {key:string}) => ReactElement>;
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

const InlineWrapper = ({ children, style, key }: any) => <Text key={key} style={style}>{children}</Text>

export const createRenderers = (plugins: ViewerPlugin<any>[]): Renderers => {
    const entities: Renderers['entities'] = {};
    const blocks: Renderers['blocks'] = {
        unstyled: (children) => <Text>{children}</Text>
    };
    plugins.forEach((plugin) => {
        const Component = plugin.component;
        entities[plugin.entityType] = (children: ReactNode, data: any, {key}: {key: number | string}) => {
            const shouldRenderInsideTextTag = typeof children === 'string';
            const renderChildren = () => shouldRenderInsideTextTag ? (<Text>{children}</Text>) : children;
            return (
                <Component
                    data={data}
                    key={key}
                >
                {renderChildren()}
                </Component>
            )
        }
    });

    return {
        blocks,
        entities,
        styles: createStylesRenderer(InlineWrapper, inlineStylesMap)
    };
};
