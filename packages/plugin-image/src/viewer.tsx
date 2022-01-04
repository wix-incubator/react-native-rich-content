import React from 'react';
import { ViewerPluginCreator } from "@react-native-rich-content/common";
import { ImageViewer, ImageViewerProps } from "./components/ImageViewer";
import { ImageData } from "./types";

const DEFAULT_ENTITY_TYPE = 'wix-draft-plugin-image';

type ImageViewerPluginConfig = {
    imageStyle?: ImageViewerProps['imageStyle'];
    containerStyle?: ImageViewerProps['containerStyle'];
    captionStyle?: ImageViewerProps['captionStyle'];
    loaderComponent?: ImageViewerProps['LoaderComponent'];
    onPress?: ImageViewerProps['onPress'];
    sourceTransformer?: ImageViewerProps['sourceTransformer'];
    accessibilityLabel?: ImageViewerProps['accessibilityLabel'];
    testID?: ImageViewerProps['testID'];
    entityType?: string;
}

export const createImageViewerPlugin: ViewerPluginCreator<ImageViewerPluginConfig, ImageData> = ({
    imageStyle,
    containerStyle,
    captionStyle,
    loaderComponent,
    onPress,
    sourceTransformer,
    accessibilityLabel,
    testID,
    entityType
}) => ({
    entityType: entityType || DEFAULT_ENTITY_TYPE,
    component: ({data}) => (
        <ImageViewer
            data={data}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            sourceTransformer={sourceTransformer}
            onPress={onPress}
            LoaderComponent={loaderComponent}
            captionStyle={captionStyle}
            imageStyle={imageStyle}
            containerStyle={containerStyle}
        />
    )
});