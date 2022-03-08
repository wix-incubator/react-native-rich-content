import { Content } from '@react-native-rich-content/common';
import { FC } from 'react';
import { StyleProp, ImageStyle } from 'react-native';

export type ThumbnailRenderer = FC<{style: StyleProp<ImageStyle> | undefined}>;

export type MediaPreviewComponent = FC<{thumbnails: ThumbnailRenderer[]}>;

export type PreviewConfig = {
    showPreviewSeeMoreButton: boolean;
    showCollapseSeeLessButton: boolean;
    previewSeeMoreButtonLocation: string;
    previewWhenContentLengthExceeds: number;
    previewMaxNumberOfBlocks: number;
    onPreviewPress: () => void;
    expandButtonText: string;
    expandButtonProps: Object;
    collapseButtonText: string;
    previewMaxContentBlocks: number;
    showMediaPreview: boolean;
    MediaPreviewComponent?: MediaPreviewComponent;
};

export type PreviewData = {
    thumbnailRenderers: ThumbnailRenderer[];
    truncatedContent: Content;
    MediaPreviewComponent?: MediaPreviewComponent;
};
