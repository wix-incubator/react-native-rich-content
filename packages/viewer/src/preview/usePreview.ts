import {
  useMemo, useState, useEffect,
} from 'react';
import { Content, ViewerPlugin } from '@react-native-rich-content/common';
import { getPreviewData } from './preview-utils';
import { PreviewConfig } from './types';
import { PREVIEW_STATUS } from './constants';

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

  const expandOrCollapseButton = useMemo(() => {
    if (previewStatus === PREVIEW_STATUS.NONE) {
      return null;
    }
    return {
      text: previewStatus === PREVIEW_STATUS.EXPANDED ? 'collapse' : 'expand',
      onPress: () => {
        if (previewStatus === PREVIEW_STATUS.EXPANDED) {
          setPreviewStatus(PREVIEW_STATUS.HIDDEN);
        } else {
          setPreviewStatus(PREVIEW_STATUS.EXPANDED);
        }
      },
    };
  }, [previewStatus]);
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
