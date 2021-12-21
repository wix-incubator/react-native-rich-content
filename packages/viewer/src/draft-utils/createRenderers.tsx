import React, {ReactNode, ReactElement} from 'react';
import { ViewerPlugin } from "@react-native-rich-content/common";

type Renderers = {
    entities: Record<string, (children: ReactNode, data: any, {key}: {key:string}) => ReactElement>;
};

export const createRenderers = (plugins: ViewerPlugin<any>[]): Renderers => {
    const entities: Renderers['entities'] = {};
    plugins.forEach((plugin) => {
        const Component = plugin.component;
        entities[plugin.entityType] = (children: ReactNode, data: any, {key}: {key: number | string}) =>
            <Component
                data={data}
                key={key}
            >
            {children}
            </Component>
    });

    return {
        entities,
    }
}