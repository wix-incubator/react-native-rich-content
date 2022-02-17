/* eslint-disable global-require */
import { renderHook, act } from '@testing-library/react-hooks/native';
import { AtomicPlugin } from '@react-native-rich-content/common';
import { InlineStyle } from 'wix-rich-content-common';
import { useEditor } from './useEditor';

describe('useWebEditorAdapter', () => {
  let useEditorMock: typeof useEditor;
  let callbacksMock: {
        onContentChange: jest.Mock;
        onNonAtomicFocus: jest.Mock;
        onAtomicFocus: jest.Mock;
        onInlineStylesChange: jest.Mock
    };
  const testContent = 'content';
  const testInlineStyles: InlineStyle[] = ['bold'];
  const testData = { blockKey: 'blockKey', type: 'testType', data: 'data' };
  beforeEach(() => {
    jest.resetAllMocks();
    jest.mock('../web-assets/dist/rce-web.html', () => 'test-file-stub');
    jest.mock('../utils/web-editor-adapter-utils.ts', () => ({
      getSource: () => '',
      getOriginWhiteList: () => [''],
      getScriptToEvaluate: () => '',
    }));
    useEditorMock = require('./useEditor').useEditor;
    callbacksMock = {
      onContentChange: jest.fn(),
      onNonAtomicFocus: jest.fn(),
      onAtomicFocus: jest.fn(),
      onInlineStylesChange: jest.fn(),
    };
  });

  it('should call onContentChange and onInlineStylesChange when invoking onRceStateChange', () => {
    const { result } = renderHook(() => useEditorMock({
      plugins: [],
      ...callbacksMock,
    }));
    act(() => result.current.onRceStateChange({
      // @ts-ignore
      content: testContent,
      activeInlineStyles: testInlineStyles,
    }));
    expect(callbacksMock.onContentChange).toBeCalledWith(testContent);
    expect(callbacksMock.onInlineStylesChange).toBeCalledWith(testInlineStyles);
  });

  it('should call not call onNonAtomicFocus or onAtomicFocus when onDraftEntityFocusChange is called without a type', () => {
    const { result } = renderHook(() => useEditorMock({
      plugins: [],
      ...callbacksMock,
    }));
    act(() => result.current.onDraftEntityFocusChange({}));
    expect(callbacksMock.onAtomicFocus).not.toBeCalled();
    expect(callbacksMock.onNonAtomicFocus).not.toBeCalled();
  });

  it('should call onNonAtomicFocus only once when onDraftEntityFocusChange is called with text twice', () => {
    const { result } = renderHook(() => useEditorMock({
      plugins: [],
      ...callbacksMock,
    }));
    act(() => result.current.onDraftEntityFocusChange({ type: 'text' }));
    act(() => result.current.onDraftEntityFocusChange({ type: 'text' }));
    expect(callbacksMock.onNonAtomicFocus).toBeCalledTimes(1);
    expect(callbacksMock.onAtomicFocus).not.toBeCalled();
  });

  it('should call onAtomicFocus and plugin onFocus when onDraftEntityFocusChange is called with a plugin', () => {
    const testPlugin: AtomicPlugin = {
      id: testData.type, onEntityFocus: jest.fn(), scriptString: '', scriptWindowEntry: '',
    };
    const { result } = renderHook(() => useEditorMock({
      plugins: [testPlugin],
      ...callbacksMock,
    }));
    act(() => result.current.onDraftEntityFocusChange(testData));
    expect(callbacksMock.onAtomicFocus).toBeCalled();
    expect(callbacksMock.onNonAtomicFocus).not.toBeCalled();
    expect(testPlugin.onEntityFocus).toBeCalledWith(testData);
  });
});
