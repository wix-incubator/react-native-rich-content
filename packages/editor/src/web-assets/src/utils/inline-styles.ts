import { RicosEditorType } from 'ricos-editor';
import { InlineStyle } from 'wix-rich-content-common';

const inlineStyles: InlineStyle[] = ['bold', 'underline', 'italic', 'spoiler', 'not_bold', 'not_italic', 'not_underline'];

export const isValidInlineStyle = (str: string) => inlineStyles.includes(str as InlineStyle);

export const getActiveInlineStyles = (editorRef: RicosEditorType | null) => {
  if (editorRef) {
    const { hasInlineStyle } = editorRef.getEditorCommands();
    // eslint-disable-next-line max-len
    const isInlineStyleActive = (inlineStyle: InlineStyle) => hasInlineStyle(inlineStyle as InlineStyle);
    return inlineStyles.filter(isInlineStyleActive);
  }
  return [];
};
