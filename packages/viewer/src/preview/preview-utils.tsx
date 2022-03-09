/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Content, ViewerPlugin } from '@react-native-rich-content/common';
import { truncateContent as ricosTruncateContent } from 'ricos-content/libs/truncateContent';
import { PreviewConfig, PreviewData, ThumbnailRenderer } from './types';

const DEFAULT_MAX_BLOCKS = 3;

const getThumbnailRenderers = (
  content: Content,
  plugins: ViewerPlugin<unknown>[],
) => {
  const entitiesList = Object.values(content.entityMap);
  const thumbnailRenderers: ThumbnailRenderer[] = [];
  entitiesList.forEach((entity: unknown) => {
    // @ts-ignore
    const relevantPlugin = plugins.find((plugin) => plugin.entityType === entity.type);
    // eslint-disable-next-line max-len
    const entityCanBeDisplayedAsThumbnail = !!relevantPlugin?.previewThumbnail?.shouldDisplay(entity);
    if (entityCanBeDisplayedAsThumbnail) {
      const Thumbnail = relevantPlugin?.previewThumbnail?.component!;
      const renderer: ThumbnailRenderer = ({ style }) => (
        // @ts-ignore
        <Thumbnail style={style} entity={entity} />
      );
      thumbnailRenderers.push(renderer);
    }
  });
  return thumbnailRenderers;
};

export const isNonMediaBlock = (
  content: Content,
  block: {entityRanges: {offset: number; length: number; key: string}[], type: string},
  plugins: ViewerPlugin<unknown>[],
) => {
  const isPluginRelevant = (plugin: ViewerPlugin<unknown>) => !!plugin.previewThumbnail;
  const supportedMediaTypes = plugins.filter(isPluginRelevant).map((plugin) => plugin.entityType);
  const contentEntityMap = content.entityMap;
  const entityKeys = block.entityRanges.map((entity) => entity.key);
  const isMediaEntityExists = entityKeys.some(
    // @ts-ignore
    (entityKey) => supportedMediaTypes.includes(contentEntityMap[entityKey].type),
  );
  return !(block.type === 'atomic' && isMediaEntityExists);
};

export const getNonMediaBlocks = (content: Content, plugins: ViewerPlugin<unknown>[]) => {
  // @ts-ignore
  const nonMediaBlocks = content.blocks.filter((block) => isNonMediaBlock(content, block, plugins));
  return nonMediaBlocks;
};

export const wordCounter = (content: Content) => {
  // @ts-ignore
  const wordsCount = content.blocks.filter((block) => block.type !== 'atomic')
  // @ts-ignore
    .reduce((accWordsCount, currentTextBlock) => {
      // @ts-ignore
      const currentBlockWordsCount = currentTextBlock.text.split(/\s+/).filter((s) => s !== '').length;
      return accWordsCount + currentBlockWordsCount;
    }, 0);
  return wordsCount;
};

export const isTruncateNeeded = (content: Content, maxTextLength: number, maxBlocks: number) => {
  // @ts-ignore
  if (content.blocks.length > maxBlocks) {
    return true;
  }
  const wordCount = wordCounter(content);
  if (wordCount > maxTextLength) {
    return true;
  }
  return false;
};

export const showMediaTruncate = (plugins: ViewerPlugin<unknown>[]) => (
  maxTextLength: number,
  maxBlocks: number,
  content: Content,
) => {
  const nonMediaBlocks = getNonMediaBlocks(content, plugins);
  const nonMediaContent = {
    ...content,
    blocks: nonMediaBlocks,
  };

  if (!isTruncateNeeded(nonMediaContent, maxTextLength, maxBlocks)) {
    return {
      // @ts-ignore
      isTruncated: (nonMediaContent.blocks.length < content.blocks.length),
      content: nonMediaContent,
    };
  }

  return ricosTruncateContent(nonMediaContent, {
    wordsCount: maxTextLength,
    blocksCount: maxBlocks,
  });
};

export const noMediaTruncate = (
  maxTextLength: number,
  maxBlocks: number,
  content: Content,
) => ricosTruncateContent(content, {
  wordsCount: maxTextLength,
  blocksCount: maxBlocks,
});

export const isSignificantContent = (content: Content) => {
  // @ts-ignore
  for (const block of content.blocks) {
    if (block.type === 'atomic' || block.text.trim().length > 0) {
      return true;
    }
  }
  return false;
};

export const getPreviewData = (
  previewConfig: PreviewConfig,
  content: Content,
  plugins: ViewerPlugin<unknown>[],
): PreviewData | null => {
  const {
    showMediaPreview,
    previewWhenContentLengthExceeds: maxPreviewContentLength,
    previewMaxContentBlocks: maxContentBlocks,
  } = previewConfig;
  if (!maxPreviewContentLength) {
    return null;
  }
  const maxBlocks = maxContentBlocks || DEFAULT_MAX_BLOCKS;
  const thumbnailRenderers = getThumbnailRenderers(content, plugins);
  const truncateMethod = showMediaPreview ? showMediaTruncate(plugins) : noMediaTruncate;
  const {
    content: truncatedContent,
    isTruncated,
  } = truncateMethod(maxPreviewContentLength, maxBlocks, content);
    // @ts-ignore
  if (!isTruncated || (!isSignificantContent(truncatedContent) && thumbnailRenderers.length <= 1)) {
    return null;
  }

  return {
    thumbnailRenderers,
    truncatedContent,
  };
};
