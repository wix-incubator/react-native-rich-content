import React, {ReactNode, ReactElement} from 'react';
import {Text} from 'react-native';
import { ViewerPlugin } from "@react-native-rich-content/common";

type Renderers = {
    entities: Record<string, (children: ReactNode, data: any, {key}: {key:string}) => ReactElement>;
};

export const createRenderers = (plugins: ViewerPlugin<any>[]): Renderers => {
    const entities: Renderers['entities'] = {};
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
        entities,
    }
};
