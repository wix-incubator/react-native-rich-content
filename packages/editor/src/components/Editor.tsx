import React, {useRef, useImperativeHandle, useCallback} from 'react';
import {View, StyleSheet, ViewProps, LayoutChangeEvent} from 'react-native';
import {WebEditorAdapter, WebEditorAdapterRef} from './WebEditorAdapter';
import {Toolbar} from '../toolbar/Toolbar';
import {prepareStringForInjection} from '../utils/stringify';
import {EDITOR_METHODS} from '../web-assets';
import {AtomicPlugin, Content, EditorRef} from '@react-native-rich-content/common';

export interface EditorProps {
    content?: Content,
    style?: ViewProps['style'];
    onContentChange: (content: Content) => void;
    plugins: AtomicPlugin[];
    toolbarStyle?: ViewProps['style'];
    onToolbarLayout?: (event: LayoutChangeEvent) => void;
};

export const Editor = React.forwardRef((props: EditorProps, ref) => {

    const {content, style, onContentChange, onToolbarLayout, plugins, toolbarStyle} = props;

    const webEditorAdapterRef = useRef<WebEditorAdapterRef>(null);

    const invokeEditorMethod = (method: string, data?: any) => {
        webEditorAdapterRef.current?.invoke(method, `'${prepareStringForInjection(JSON.stringify(data))}'`);
    };

    useImperativeHandle(ref, (): EditorRef => ({
        insert: (entity) => invokeEditorMethod(EDITOR_METHODS.INSERT_PLUGIN_ENTITY, entity),
    }));

    const onRceStateChange = useCallback((rceState: {content: Content}) => onContentChange(rceState.content), [onContentChange]);
    
    return (
        <View style={style}>
        <WebEditorAdapter
            content={content}
            style={styles.richTextEditor}
            ref={webEditorAdapterRef}
            onRceStateChange={onRceStateChange}
        />
        <Toolbar
            style={toolbarStyle}
            onLayout={onToolbarLayout}
            plugins={plugins}
        />
        </View>
    );
});

const styles = StyleSheet.create({
    richTextEditor: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 200,
        width: '100%'
    },
});