import { createEditorAtomicPlugin } from "@react-native-rich-content/common";
import { getJsScriptStringAsset } from "./web-assets";

const scriptString = getJsScriptStringAsset();

const scriptWindowEntry = 'WIX_IMAGE_PLUGIN.createPlugin';

export const createEditorImagePlugin = createEditorAtomicPlugin(scriptString, scriptWindowEntry);
