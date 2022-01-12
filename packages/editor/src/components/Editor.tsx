import React, {useRef, useImperativeHandle, useCallback} from 'react';
import {View, ViewStyle} from 'react-native';
import {WebEditorAdapter, WebEditorAdapterRef} from './WebEditorAdapter';
import {prepareStringForInjection} from '../utils/stringify';
import {EDITOR_METHODS} from '../web-assets';
import {AtomicPlugin, Content, EditorRef} from '@react-native-rich-content/common';

export interface EditorProps {
    content?: Content,
    style?: ViewStyle;
    onContentChange: (content: Content) => void;
    plugins: AtomicPlugin[];
};

export const Editor = React.forwardRef((props: EditorProps, ref) => {

    const {content, style, onContentChange, plugins} = props;

    const webEditorAdapterRef = useRef<WebEditorAdapterRef>(null);

    const invokeEditorMethod = (method: string, data?: any) => {
        webEditorAdapterRef.current?.invoke(method, `'${prepareStringForInjection(JSON.stringify(data))}'`);
    };

    useImperativeHandle(ref, (): EditorRef => ({
        insert: (entity) => invokeEditorMethod(EDITOR_METHODS.INSERT_PLUGIN_ENTITY, entity),
        toggleInlineStyle: (inlineStyle) => invokeEditorMethod(EDITOR_METHODS.TOGGLE_INLINE_STYLE, inlineStyle)
    }));

    const onRceStateChange = useCallback((rceState: {content: Content}) => onContentChange(rceState.content), [onContentChange]);
    
    return (
        <View style={style}>
        <WebEditorAdapter
            content={content}
            style={style}
            ref={webEditorAdapterRef}
            onRceStateChange={onRceStateChange}
            plugins={plugins}
        />
        </View>
    );
});
