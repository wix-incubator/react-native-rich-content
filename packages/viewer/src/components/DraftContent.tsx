import redraft from 'wix-redraft';
import { Content } from '@react-native-rich-content/common';
import { Renderers } from '../draft-utils/create-renderers';

export interface DraftContentProps {
    content: Content;
    renderers: Renderers
}

export function DraftContent({
  content, renderers,
}: DraftContentProps) {
  return redraft(content, renderers);
}
