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
};
