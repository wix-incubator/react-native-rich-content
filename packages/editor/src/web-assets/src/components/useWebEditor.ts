import {useRef, useCallback, useEffect, useMemo} from 'react';
import mergeWith from 'lodash/mergeWith';
import {RicosEditorType} from 'ricos-editor';
import {EditorPlugin} from 'wix-rich-content-common'
import {customMergeArrays} from '../utils/merge-arrays';
import { useConstructor } from './useConstructor';
import {EDITOR_EVENTS, EDITOR_METHODS} from '../constants';
import { getToolbarSettings } from '../utils/get-toolbar-settings';
import { postWebviewMessage, setRceApi, setPrimaryColor } from '../utils/global-utils';
import { RceApi } from '../types';

const toolbarSettings = {getToolbarSettings};

export const useWebEditor = (pluginCreators: {createPlugin: () => EditorPlugin}[], primaryColor?: string) => {
    const editorRef = useRef<RicosEditorType>(null);
    useConstructor(() => {
        setPrimaryColor(primaryColor);
        const api: RceApi = {
            [EDITOR_METHODS.INSERT_PLUGIN_ENTITY]: (serializedData) => {
              try {
                if (editorRef.current) {
                const {pluginType, data} = JSON.parse(serializedData);
                const insertBlock = editorRef.current.getEditorCommands().insertBlock;
                const createdBlockKey = insertBlock(pluginType, data);
                handleChange();
                updateEntityFocusData({
                  blockKey: createdBlockKey,
                  type: pluginType,
                  data,
                });
                }
              } catch (e) {
                console.log('RCE ERROR: insertPluginEntity', e);
              }
            },
            [EDITOR_METHODS.DELETE_PLUGIN_ENTITY]: (serializedData) => {
              try {
                if (editorRef.current) {
                    const {blockKey} = JSON.parse(serializedData);
                    const deleteBlock = editorRef.current.getEditorCommands().deleteBlock;
                    deleteBlock(blockKey);
                    handleChange();
                }
              } catch (e) {
                console.log('RCE ERROR: deletePluginEntity', e);
              }
            },
            [EDITOR_METHODS.UPDATE_PLUGIN_ENTITY]: (serializedData) => {
              try {
                if (editorRef.current) {
                    const {blockKey, type, data} = JSON.parse(serializedData);
                    const {setBlock, getSelectedData} = editorRef.current.getEditorCommands();
                    const previousEntityData = getSelectedData();
                    const newEntityData = mergeWith({}, previousEntityData, data, customMergeArrays);
                    setBlock(blockKey, type, newEntityData);
                    updateEntityFocusData({blockKey, type, data});
                }
              } catch (e) {
                console.log('RCE ERROR: updatePluginEntity', e);
              }
            },
          };
          setRceApi(api);
        }
    );

    useEffect(() => postWebviewMessage({type: EDITOR_EVENTS.WEB_EDITOR_DID_MOUNT}),[]);

    const handleChange = useCallback((content?) => {
        if (editorRef.current) {
            postWebviewMessage({
                type: EDITOR_EVENTS.RCE_STATE_CHANGED,
                data: {
                  content,
                },
            });
        }
    }, []);

    const updateEntityFocusData = useCallback(({blockKey, type, data}) => {
        postWebviewMessage({
            type: EDITOR_EVENTS.PLUGIN_ENTITY_FOCUS_CHANGED,
            data: {
              blockKey,
              type,
              data,
            }
        });
    }, []);

    const plugins = useMemo(() => pluginCreators.map((creator) => creator.createPlugin()),[])

    return {
        toolbarSettings,
        editorRef,
        handleChange,
        onAtomicBlockFocus: updateEntityFocusData,
        plugins
    }
};
