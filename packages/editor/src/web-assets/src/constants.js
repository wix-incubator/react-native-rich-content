export const EDITOR_METHODS = {
    INSERT_PLUGIN_ENTITY: 'insertPluginEntity',
    UPDATE_PLUGIN_ENTITY: 'updatePluginEntity',
    DELETE_PLUGIN_ENTITY: 'deletePluginEntity',
    INSERT_MENTION: 'insertMention',
    TRIGGER_MENTION: 'triggerMention',
    INSET_HERO_IMAGE: 'insertHeroImage',
    REMOVE_HERO_IMAGE: 'removeHeroImage',
    INSERT_LINK: 'insertLink',
    SAVE_LINK_SELECTION: 'saveLinkSelection',
    UPDATE_DATA_WITH_ASYNC_UPDATE_ID: 'updateDataWithAsyncUpdateId',
    DELETE_DATA_ASYNC_UPDATE_ID: 'deleteDataWithAsyncUpdateId',
    FINALIZE_EDITING: 'finalizeEditing',
    TOGGLE_TEXT_PLUGIN: 'toggleTextPlugin'
};

export const EDITOR_EVENTS = {
    ON_MENTION: 'onMention',
    WEB_EDITOR_DID_MOUNT: 'webEditorDidMount',
    PLUGIN_ENTITY_FOCUS_CHANGED: 'draftEntityFocusChanged',
    RCE_STATE_CHANGED: 'rceStateChanged',
    TITLE_CHANGED: 'titleChanged',
    TITLE_IN_FOCUS: 'titleFocused',
    TITLE_ON_BLUR: 'titleBlurred',
    ON_ASYNC_UPDATE_COMPLETE: 'onAsyncUpdateComplete',
    ON_ASYNC_UPDATE_PLACEHOLDER_ADDED: 'onAsyncUpdatePlaceholderAdded'
};
