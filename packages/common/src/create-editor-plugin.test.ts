import { AtomicPlugin } from './types';
import {createEditorAtomicPlugin} from './create-editor-plugin';

const DUMMY_SCRIPT_STRING = 'dummyScriptString';
const DUMMY_SCRIPT_WINDOW_ENTRY = 'dummyScriptWindowEntry';
const DUMMY_ID = 'dummyId';
const DUMMY_ON_ENTITY_FOCUS = () => {};

describe('create editor atomic plugin', () => {
    it('should create editor atomic plugin', () => {
        const atomicPluginCreator = createEditorAtomicPlugin(DUMMY_SCRIPT_STRING, DUMMY_SCRIPT_WINDOW_ENTRY);
        const atomicPlugin = atomicPluginCreator({id: DUMMY_ID, onEntityFocus: DUMMY_ON_ENTITY_FOCUS});
        const expectedAtomicPlugin: AtomicPlugin = {
            id: DUMMY_ID,
            scriptWindowEntry: DUMMY_SCRIPT_WINDOW_ENTRY,
            scriptString: DUMMY_SCRIPT_STRING,
            onEntityFocus: DUMMY_ON_ENTITY_FOCUS
        };
        expect(atomicPlugin).toEqual(expectedAtomicPlugin);
    });
});
