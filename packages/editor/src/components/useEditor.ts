import {useRef, useState, useCallback} from 'react';
import {WebEditorAdapterRef} from './WebEditorAdapter';
import { EditorProps } from '../types';
import {prepareStringForInjection} from '../utils/stringify';
import {EDITOR_METHODS} from '../web-assets';
import {Content, EditorRef} from '@react-native-rich-content/common';


export const useEditor = (props: Omit<EditorProps, 'style' | 'content'>) => {
    const {onContentChange, plugins} = props;
    const [selectedEntityType, setSelectedEntityType] = useState<string | undefined>();

    const getPluginThatMatchesEntityType = (entityType: string) => plugins.find((plugin) => plugin.id === entityType);

    const webEditorAdapterRef = useRef<WebEditorAdapterRef>(null);

    const invokeEditorMethod = (method: string, data?: any) => {
        webEditorAdapterRef.current?.invoke(method, `'${prepareStringForInjection(JSON.stringify(data))}'`);
    };

    const getEditorRefApi = (): EditorRef => ({
        insert: (entity) => invokeEditorMethod(EDITOR_METHODS.INSERT_PLUGIN_ENTITY, entity),
        toggleInlineStyle: (inlineStyle) => invokeEditorMethod(EDITOR_METHODS.TOGGLE_INLINE_STYLE, inlineStyle),
        deletePluginEntity: (blockKey) => invokeEditorMethod(EDITOR_METHODS.DELETE_PLUGIN_ENTITY, blockKey),
    });

    const onRceStateChange = useCallback((rceState: {content: Content}) => onContentChange(rceState.content), [onContentChange]);
    
    const onDraftEntityFocusChange = useCallback((data: {blockKey?: string, type?: string, data?: any}) => {
        const isDataValid = !!data.type;
        if (isDataValid) {
            if (selectedEntityType) {
                const blurredPlugin = getPluginThatMatchesEntityType(selectedEntityType);
                const blurCallback = blurredPlugin?.onEntityBlur;
                if (blurCallback) {
                    blurCallback();
                }
            }
            const newSelectedEntityType = data.type;
            if (newSelectedEntityType) {
                const focusedPlugin = getPluginThatMatchesEntityType(newSelectedEntityType);
                const focusCallback = focusedPlugin?.onEntityFocus;
                if (focusCallback) {
                    focusCallback(data);
                }
            }
            setSelectedEntityType(newSelectedEntityType);
        }
    }, [plugins, selectedEntityType]);

    return {
        webEditorAdapterRef,
        getEditorRefApi,
        onRceStateChange,
        onDraftEntityFocusChange
    }
};
