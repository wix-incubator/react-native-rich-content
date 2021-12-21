import React from 'react';
import {View, ViewProps} from 'react-native';
import redraft from 'redraft';
import { createRenderers } from './draft-utils/createRenderers';
import {ViewerPlugin} from '../../types';

export interface ViewerProps {
    plugins: ViewerPlugin<any>[]; // TODO declare it better
    content: {
        blocks: Object;
        entityMap: Object;
    },
    style?: ViewProps['style'];
};

export const Viewer = ({plugins, content, style}: ViewerProps) => {
    const renderers = createRenderers(plugins);
    return (
        <View
            style={style}
        >
            {redraft(content, renderers)}
        </View>
    )
}