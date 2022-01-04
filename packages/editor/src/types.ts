import { WebEditorProps } from './web-assets';
import {ViewStyle} from 'react-native';

export interface WebEditorAdapterProps{
  content: WebEditorProps['content'];
  primaryColor?: WebEditorProps['primaryColor'];
  extraProps?: WebEditorProps['extraProps'];
  style?: ViewStyle;
  onRceStateChange?: (data: any) => void;
  onDraftEntityFocusChange?: (data: any) => void;
  onWebEditorDidMount?: () => void;
}