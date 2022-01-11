import React from 'react';
import {render, Container} from 'react-dom';
import {WebEditor, WebEditorProps} from './components/WebEditor'

export function renderEditor (targetElement: Container, props: WebEditorProps = {pluginsCreators: []}) {
    render (
        <WebEditor
            {...props}
        />,
        targetElement,
    );
}