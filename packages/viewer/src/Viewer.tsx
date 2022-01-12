import React from 'react';
import {View, ViewProps, TextStyle} from 'react-native';
import redraft from 'wix-redraft';
import {ViewerPlugin} from '@react-native-rich-content/common';
import { createRenderers } from './draft-utils/create-renderers';

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
};
