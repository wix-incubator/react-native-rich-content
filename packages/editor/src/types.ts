import { WebEditorProps } from './web-assets';
import {ViewStyle} from 'react-native';
import { InlineStyle } from 'wix-rich-content-common';
import { AtomicPlugin, Content } from '@react-native-rich-content/common';

export interface WebEditorAdapterProps{
  content: WebEditorProps['content'];
  primaryColor?: WebEditorProps['primaryColor'];
  extraProps?: WebEditorProps['extraProps'];
  style?: ViewStyle;
  plugins: AtomicPlugin[];
  onRceStateChange?: (data: any) => void;
  onDraftEntityFocusChange?: (data: any) => void;
  onWebEditorDidMount?: () => void;
}

export interface EditorProps {
  content?: Content,
  style?: ViewStyle;
  onContentChange?: (content: Content) => void;
  plugins: AtomicPlugin[];
  onNonAtomicFocus?: () => void;
  onInlineStylesChange?: (inlineStyles: InlineStyle[]) => void;
  onAtomicFocus?: () => void;
};