import { AtomicPlugin, AtomicPluginConfig } from './types';

export const createEditorAtomicPlugin = (
  scriptString: string,
  scriptWindowEntry: string,
): ((config: AtomicPluginConfig) => AtomicPlugin) => (config) => ({
  ...config,
  scriptString,
  scriptWindowEntry,
});
