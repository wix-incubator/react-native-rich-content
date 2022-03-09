import {
  useMemo, useState, useEffect,
} from 'react';
import { Content, ViewerPlugin } from '@react-native-rich-content/common';
import { getPreviewData } from './preview-utils';
import { PreviewConfig } from './types';
import { PREVIEW_STATUS, DEFAULT_COLLAPSE_TEXT, DEFAULT_EXPAND_TEXT } from './constants';

type ExpandOrCollapseButton = {
  text: string;
  onPress: () => void;
}

export const usePreview = (
  content: Content,
  plugins: ViewerPlugin<unknown>[],
  previewConfig?: PreviewConfig,
) => {
  const previewData = useMemo(
    () => (previewConfig ? getPreviewData(previewConfig, content, plugins) : null),
    [previewConfig, content, plugins],
  );
  const [previewStatus, setPreviewStatus] = useState<PREVIEW_STATUS>(
    previewData ? PREVIEW_STATUS.HIDDEN : PREVIEW_STATUS.NONE,
  );
  useEffect(() => {
    const shouldHide = previewData && previewStatus === PREVIEW_STATUS.NONE;
    const shouldIgnorePreview = !previewData;
    if (shouldHide) {
      setPreviewStatus(PREVIEW_STATUS.HIDDEN);
    } else if (shouldIgnorePreview) {
      setPreviewStatus(PREVIEW_STATUS.NONE);
    }
  }, [previewData, previewStatus]);

  const expandOrCollapseButton: ExpandOrCollapseButton | null = useMemo(() => {
    if (previewStatus === PREVIEW_STATUS.EXPANDED && previewConfig?.showCollapseSeeLessButton) {
      return {
        text: previewConfig?.collapseButtonText || DEFAULT_COLLAPSE_TEXT,
        onPress: () => {
          setPreviewStatus(PREVIEW_STATUS.HIDDEN);
          previewConfig?.onPreviewPress?.();
        },
      };
    } if (
      previewStatus === PREVIEW_STATUS.HIDDEN
      && previewConfig?.showPreviewSeeMoreButton
    ) {
      return {
        text: previewConfig?.expandButtonText || DEFAULT_EXPAND_TEXT,
        onPress: () => {
          setPreviewStatus(PREVIEW_STATUS.EXPANDED);
          previewConfig?.onPreviewPress?.();
        },
      };
    }
    return null;
  }, [previewStatus, previewConfig]);

  const thumbnailRenderers = useMemo(() => previewData?.thumbnailRenderers || [], [previewData]);
  const shouldShowPreview = previewStatus === PREVIEW_STATUS.HIDDEN;
  const possiblyTruncatedContent = shouldShowPreview ? previewData?.truncatedContent! : content;
  return {
    shouldShowPreview,
    thumbnailRenderers,
    possiblyTruncatedContent,
    expandOrCollapseButton,
  };
};
