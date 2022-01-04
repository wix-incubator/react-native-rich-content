export interface RceApi {
    [editorMethod: string]: (serializedData: string) => void;
};
