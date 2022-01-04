import {TOOLBARS} from 'wix-rich-content-editor-common';
import {ToolbarType, GetToolbarSettings, ToolbarSettingsFunctions} from 'wix-rich-content-common'
const noop = () => false;
const hiddenToolbar = (name: ToolbarType): ToolbarSettingsFunctions => ({
  name,
  shouldCreate: () => ({
    desktop: false,
    mobile: {ios: false, android: false},
  }),
  getVisibilityFn: () => ({
    desktop: noop,
    mobile: {ios: noop, android: noop},
  }),
});

export const getToolbarSettings: GetToolbarSettings = () => [
  hiddenToolbar(TOOLBARS.MOBILE),
  hiddenToolbar(TOOLBARS.INLINE),
  hiddenToolbar(TOOLBARS.SIDE),
  hiddenToolbar(TOOLBARS.FOOTER),
  hiddenToolbar(TOOLBARS.PLUGIN),
];