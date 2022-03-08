import { Content, ViewerPlugin } from '@react-native-rich-content/common';
import { getPreviewData } from './preview-utils';
import { PreviewConfig } from './types';

export const usePreview = (
  content: Content,
  plugins: ViewerPlugin<unknown>[],
  previewConfig?: PreviewConfig,
) => {
  const previewData = previewConfig ? getPreviewData(previewConfig, content, plugins) : null;
  return previewData;
};
