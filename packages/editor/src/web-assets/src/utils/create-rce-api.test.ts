import React from 'react';
import { RicosEditorType } from 'ricos-editor';
import { EditorCommands } from 'wix-rich-content-common';
import { EDITOR_METHODS } from '../constants';
import { RceApi } from '../types';
import { createRceApi } from './create-rce-api';

describe('rceApi', () => {
  let updateEntityFocusDataMock: jest.Mock<({ blockKey, type, data }: any) => void>;
  let handleChangeMock: jest.Mock<({ blockKey, type, data }: any) => void>;
  let editorCommandsMock: {
        insertBlock: jest.Mock<EditorCommands['insertBlock']>;
        deleteBlock: jest.Mock<EditorCommands['deleteBlock']>;
        toggleInlineStyle: jest.Mock<EditorCommands['toggleInlineStyle']>;
    };
  let editorRefMock: React.RefObject<RicosEditorType>;
  let rceApi: RceApi;
  let invokeRceApi: (method: string, params: Object) => void;

  const returnedBlockKeyFromInsert = 'returnedKey';

  beforeEach(() => {
    jest.resetAllMocks();
    updateEntityFocusDataMock = jest.fn();
    handleChangeMock = jest.fn();
    editorCommandsMock = {
      insertBlock: jest.fn().mockReturnValue(returnedBlockKeyFromInsert),
      deleteBlock: jest.fn(),
      toggleInlineStyle: jest.fn(),
    };
    editorRefMock = {
      current: {
        // @ts-ignore
        getEditorCommands: () => editorCommandsMock,
      },
    };
    rceApi = createRceApi(editorRefMock, handleChangeMock, updateEntityFocusDataMock);
    invokeRceApi = (method, params) => rceApi[method](JSON.stringify(params));
  });

  it('should insert a block', () => {
    const pluginType = 'type';
    const data = 'data';
    invokeRceApi(EDITOR_METHODS.INSERT_PLUGIN_ENTITY, { pluginType, data });
    expect(editorCommandsMock.insertBlock).toBeCalledWith(pluginType, data);
    expect(handleChangeMock).toBeCalled();
    expect(updateEntityFocusDataMock).toBeCalledWith({
      blockKey: returnedBlockKeyFromInsert,
      type: pluginType,
      data,
    });
  });

  it('should delete a block', () => {
    const blockKey = 'key';
    invokeRceApi(EDITOR_METHODS.DELETE_PLUGIN_ENTITY, blockKey);
    expect(editorCommandsMock.deleteBlock).toBeCalledWith(blockKey);
    expect(handleChangeMock).toBeCalled();
  });

  it('should toggle inlineStyle when receiving a valid one', () => {
    const inlineStyle = 'bold';
    invokeRceApi(EDITOR_METHODS.TOGGLE_INLINE_STYLE, inlineStyle);
    expect(editorCommandsMock.toggleInlineStyle).toBeCalledWith(inlineStyle);
    expect(handleChangeMock).toBeCalled();
  });

  it('should not toggle inlineStyle when receiving an invalid one', () => {
    const inlineStyle = 'nothing useful';
    invokeRceApi(EDITOR_METHODS.TOGGLE_INLINE_STYLE, inlineStyle);
    expect(editorCommandsMock.toggleInlineStyle).not.toHaveBeenCalled();
    expect(handleChangeMock).not.toBeCalled();
  });
});
