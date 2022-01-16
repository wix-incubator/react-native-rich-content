import {RicosEditorType} from 'ricos-editor';
import { InlineStyle } from 'wix-rich-content-common';

const inlineStyles: InlineStyle[] = ['bold', 'underline', 'italic', 'spoiler', 'not_bold', 'not_italic', 'not_underline'];

export const isValidInlineStyle = (str: string) => inlineStyles.includes(str as InlineStyle);

export const getActiveInlineStyles = (editorRef: RicosEditorType) => {
    const isInlineStyleActive = (inlineStyle: InlineStyle) => editorRef.getEditorCommands().hasInlineStyle(inlineStyle as InlineStyle);
    return inlineStyles.filter(isInlineStyleActive);
};
