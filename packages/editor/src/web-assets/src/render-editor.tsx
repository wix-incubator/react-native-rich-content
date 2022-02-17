import React from 'react';
import { render, Container } from 'react-dom';
import { WebEditor } from './components/WebEditor';
import { WebEditorProps } from './types';

export function renderEditor(
  targetElement: Container,
  props: WebEditorProps = { pluginsCreators: [] },
) {
  render(
    <WebEditor
      {...props}
    />,
    targetElement,
  );
}
