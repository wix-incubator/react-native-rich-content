import { WebEditorProps } from './web-assets';
import {ViewStyle} from 'react-native';
import { AtomicPlugin } from '@react-native-rich-content/common';

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