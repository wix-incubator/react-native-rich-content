/* eslint-disable global-require */
import { renderHook, act } from '@testing-library/react-hooks';
import { EditorPlugin } from 'wix-rich-content-common';
import { useWebEditor } from './useWebEditor';
import { EDITOR_EVENTS } from '../constants';
import { PluginCreator } from '../types';

describe('useWebEditor', () => {
  let globalUtilsMock: {
        postWebviewMessage: jest.Mock,
        setRceApi: jest.Mock,
        setPrimaryColor: jest.Mock
    };
  let useWebEditorMock: typeof useWebEditor;
  let inlineStylesUtilsMock: {
        getActiveInlineStyles: jest.Mock
    };
  const activeInlineStylesMock = ['bold', 'underline'];
  const TEST_PRIMARY_COLOR = '#eb4034';
  const testPluginCreators: PluginCreator[] = [
    {
      createPlugin: () => ({
        config: {
          someParam: 'param',
        },
        type: 'testType',
      }),
    },
  ];
  beforeEach(() => {
    jest.resetAllMocks();
    jest.mock('../utils/global-utils', () => ({
      postWebviewMessage: jest.fn(),
      setRceApi: jest.fn(),
      setPrimaryColor: jest.fn(),
    }));
    jest.mock('../utils/inline-styles', () => ({
      getActiveInlineStyles: jest.fn(),
    }));

    inlineStylesUtilsMock = require('../utils/inline-styles');
    globalUtilsMock = require('../utils/global-utils');
    useWebEditorMock = require('./useWebEditor').useWebEditor;
  });

  it('should post message on mount', () => {
    renderHook(() => useWebEditorMock([]));
    expect(globalUtilsMock.postWebviewMessage)
      .toBeCalledWith({ type: EDITOR_EVENTS.WEB_EDITOR_DID_MOUNT });
  });

  it('should create plugins', () => {
    const { result } = renderHook(() => useWebEditorMock(testPluginCreators));
    const expectedPlugins: EditorPlugin[] = [{
      config: {
        someParam: 'param',
      },
      type: 'testType',
    }];
    expect(result.current.plugins).toEqual(expectedPlugins);
  });

  it('should set primary color', () => {
    renderHook(() => useWebEditorMock([], TEST_PRIMARY_COLOR));
    expect(globalUtilsMock.setPrimaryColor).toBeCalledWith(TEST_PRIMARY_COLOR);
  });

  it('should set rceApi', () => {
    renderHook(() => useWebEditorMock([]));
    expect(globalUtilsMock.setRceApi).toBeCalled();
  });

  it('handleChange should post webview message', () => {
    const { result } = renderHook(() => useWebEditorMock([]));
    inlineStylesUtilsMock.getActiveInlineStyles.mockReturnValue(activeInlineStylesMock);
    act(() => result.current.handleChange());
    expect(globalUtilsMock.postWebviewMessage).toHaveBeenLastCalledWith({
      type: EDITOR_EVENTS.RCE_STATE_CHANGED,
      data: {
        activeInlineStyles: activeInlineStylesMock,
        content: undefined,
      },
    });
  });

  it('onAtomicBlockFocus should post webview message', () => {
    const testData = {
      blockKey: 'blockKey',
      type: 'type',
      data: 'data',
    };
    const { result } = renderHook(() => useWebEditorMock([]));
    inlineStylesUtilsMock.getActiveInlineStyles.mockReturnValue(activeInlineStylesMock);
    act(() => result.current.onAtomicBlockFocus(testData));
    expect(globalUtilsMock.postWebviewMessage).toHaveBeenLastCalledWith({
      type: EDITOR_EVENTS.PLUGIN_ENTITY_FOCUS_CHANGED,
      data: testData,
    });
  });
});
