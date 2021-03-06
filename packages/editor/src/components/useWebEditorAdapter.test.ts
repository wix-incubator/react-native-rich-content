/* eslint-disable global-require */
import { renderHook, act } from '@testing-library/react-hooks/native';
import { Content } from '@react-native-rich-content/common';
import { useWebEditorAdapter } from './useWebEditorAdapter';

describe('useWebEditorAdapter', () => {
  const EDITOR_EVENTS = {
    WEB_EDITOR_DID_MOUNT: 'webEditorDidMount',
    PLUGIN_ENTITY_FOCUS_CHANGED: 'draftEntityFocusChanged',
    RCE_STATE_CHANGED: 'rceStateChanged',
  };
  let useWebEditorAdapterMock: typeof useWebEditorAdapter;
  let callbacksMock: {
        onDraftEntityFocusChange: jest.Mock;
        onWebEditorDidMount: jest.Mock;
        onRceStateChange: jest.Mock;
    };
  const testContent: Content = {
    blocks: [],
    entityMap: {},
  };
  const testData = 'data';
  const invokeHandleMessage = (
    eventType: string,
    handleMessage: (event: {nativeEvent: {data: string}}) => void,
  ) => {
    const event = {
      nativeEvent: {
        data: JSON.stringify({
          type: eventType,
          data: testData,
        }),
      },
    };
    handleMessage(event);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.mock('../web-assets/dist/rce-web.html', () => 'test-file-stub');
    jest.mock('../utils/web-editor-adapter-utils.ts', () => ({
      getSource: () => '',
      getOriginWhiteList: () => [''],
      getScriptToEvaluate: () => '',
    }));
    useWebEditorAdapterMock = require('./useWebEditorAdapter').useWebEditorAdapter;
    callbacksMock = {
      onDraftEntityFocusChange: jest.fn(),
      onWebEditorDidMount: jest.fn(),
      onRceStateChange: jest.fn(),
    };
  });

  it('should call onWebEditorDidMount when handling the mount message', () => {
    const { result } = renderHook(() => useWebEditorAdapterMock({
      plugins: [],
      content: testContent,
      onWebEditorDidMount: callbacksMock.onWebEditorDidMount,
    }));
    // eslint-disable-next-line max-len
    act(() => invokeHandleMessage(EDITOR_EVENTS.WEB_EDITOR_DID_MOUNT, result.current.handleMessage));
    expect(callbacksMock.onWebEditorDidMount).toBeCalled();
    expect(callbacksMock.onDraftEntityFocusChange).not.toBeCalled();
    expect(callbacksMock.onRceStateChange).not.toBeCalled();
  });

  it('should call onDraftEntityFocusChange when handling the plugin focus change message', () => {
    const { result } = renderHook(() => useWebEditorAdapterMock({
      plugins: [],
      content: testContent,
      onDraftEntityFocusChange: callbacksMock.onDraftEntityFocusChange,
    }));
    // eslint-disable-next-line max-len
    act(() => invokeHandleMessage(EDITOR_EVENTS.PLUGIN_ENTITY_FOCUS_CHANGED, result.current.handleMessage));
    expect(callbacksMock.onDraftEntityFocusChange).toBeCalledWith(testData);
    expect(callbacksMock.onWebEditorDidMount).not.toBeCalled();
    expect(callbacksMock.onRceStateChange).not.toBeCalled();
  });

  it('should call onRceStateChange when handling the state changed message', () => {
    const { result } = renderHook(() => useWebEditorAdapterMock({
      plugins: [],
      content: testContent,
      onRceStateChange: callbacksMock.onRceStateChange,
    }));
    act(() => invokeHandleMessage(EDITOR_EVENTS.RCE_STATE_CHANGED, result.current.handleMessage));
    expect(callbacksMock.onRceStateChange).toBeCalledWith(testData);
    expect(callbacksMock.onWebEditorDidMount).not.toBeCalled();
    expect(callbacksMock.onDraftEntityFocusChange).not.toBeCalled();
  });
});
