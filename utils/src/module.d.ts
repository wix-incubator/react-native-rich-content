/* eslint-disable camelcase */
type Content = {
  blocks: Array<any>;
  entityMap: {
    [key: string]: Entity;
  };
};

type CreatePluginEntity = (data: any) => object;

type Entity = {
  data: {
    asyncUpdateIds?: Array<string>;
  };
};

type EditorPlugin = {
  onPress: Function;
  createEntityWithAsyncUploads?: CreateEntityWithAsyncUploads;
  pluginId: string;
  toolbarIcon: string | number;
  getToolbarConfig: Function;
  ctaText: string;
  id: string;
  draftEntityTypes: Array<string>;
  createPluginEntity: Function;
  config: Object;
};

type TextFormattingPlugin = {
  pluginId: string;
  toolbarIcon: string | number;
  ctaText: string;
  id: string;
  config: Object;
};

interface RceProcessedPlugin extends EditorPlugin {
  buttonId: string;
}

type GetEditorRef = () => null | ({
  dismissKeyboard: () => void;
})

type EditorPluginCreator = {
  createPlugin: ({
    businessId,
    getEditorRef,
    isAsyncInsertEnabled,
    config,
    primaryColor,
    biHandler,
    isPluginSpoilerAlertEnabled,
  }: {
    businessId: string;
    getEditorRef: GetEditorRef;
    isAsyncInsertEnabled: boolean;
    config?: any;
    primaryColor: string;
    biHandler: any | undefined;
    isPluginSpoilerAlertEnabled: any;
  }) => EditorPlugin | TextFormattingPlugin;
  createEntityWithAsyncUploads?: CreateEntityWithAsyncUploads;
};

interface CreateEntityWithAsyncUploads {
  (mediaData: MediaManagerMediaItem, config?: any, previousEntity?: any): PluginEntity;
}

type ToolbarConfig = any;
type PluginsConfig = any;
type TextPluginsConfig = any;

type EditorMode =
  | 'modeText'
  | 'modePlugins'
  | 'modePluginSettings'
  | 'heroTitlePlugin';
type TitleWritingDirection = 'ltr' | 'rtl';

declare type PluginData = any

declare type PluginEntity = {
  pluginType: string;
  data: PluginData;
}

declare type InsertAsync = (
  placeholderData: object,
  asyncUpdateIds: Array<string>,
  metadata?: object
) => void;

type PluginIdImage = 'image'
type PluginIdGif = 'gif'
type PluginIdVideo = 'video'
type PluginIdMedia = 'media'
type PluginIdMention = 'mention'
type PluginIdGallery = 'gallery'
type PluginIdDivider = 'divider'
type PluginIdPoll = 'poll'
type PluginIdFile = 'file'
type PluginIdSpoiler = 'spoiler'

type PluginId =
  | PluginIdVideo
  | PluginIdImage
  | PluginIdGif
  | PluginIdMedia
  | PluginIdGallery
  | PluginIdDivider
  | PluginIdMention
  | PluginIdPoll
  | PluginIdFile
  | PluginIdSpoiler;

declare interface PluginPropsBase {
  createEntityWithAsyncUploads?: CreateEntityWithAsyncUploads;
  toolbarIcon: number;
  getToolbarConfig: ({
    entity,
    updateEntity,
    deleteEntity,
    primaryColor,
    entityType,
    isPluginSpoilerAlertEnabled,
  }: {
    entity: PluginData;
    updateEntity: (data: any) => void;
    deleteEntity: () => void;
    primaryColor: string;
    entityType: string;
    isPluginSpoilerAlertEnabled: boolean;
  }) => any;
  ctaText: string;
  config?: any;
}

// Video plugin properties
type CreateVideoEntityProps = {src: string | object}
declare type InsertVideo = (props: CreateVideoEntityProps, metadata: object) => void
declare type UpdateVideo = (newData: CreateVideoEntityProps, asyncUpdateIds?: Array<string>) => void
interface PluginPropsVideo extends PluginPropsBase {
  onPress: (insert: InsertVideo, insertAsync: InsertAsync) => void;
  pluginId: PluginIdVideo;
}

// Image plugin properties
type ImagePluginSrc = string | {
  id?: string;
  original_file_name: string;
  file_name: string;
  width: number;
  height: number;
}

type CreateImageEntityProps = {
  image: ImagePluginSrc;
  alignment?: string;
}

declare type InsertImage = (props: CreateImageEntityProps) => void
declare type UpdateImage = (componentData: {config?: any; metadata?: any; src: ImagePluginSrc}) => void
declare type ImageConfig = {alignment? : string}

interface PluginPropsImage extends PluginPropsBase {
  onPress: (insert: InsertImage, insertAsync: InsertAsync) => void;
  pluginId: PluginIdImage;
}

// Gif plugin properties
type CreateGifEntityProps = {images: {downsized: any; downsized_still: any; downsized_small: any; original: any; original_still: any}}
declare type InsertGif = (props: CreateGifEntityProps) => void
interface PluginPropsGif extends PluginPropsBase {
  onPress: (insert: InsertGif, insertAsync: InsertAsync) => void;
  pluginId: PluginIdGif;
}

// Media plugin properties
type CreateMediaEntityProps = CreateGalleryEntityProps | Array<ImagePluginSrc>
declare type InsertMedia = (props: CreateMediaEntityProps) => void
interface PluginPropsMedia extends PluginPropsBase {
  onPress: (insert: InsertMedia, insertAsync: InsertAsync) => void;
  pluginId: PluginIdMedia;
}

// Gallery plugin properties
type GalleryImageProps = {width: number; height: number; file_name: string; uploadId?: string}
type CreateGalleryEntityProps = Array<GalleryImageProps>
declare type InsertGallery = (props: CreateGalleryEntityProps) => void
interface PluginPropsGallery extends PluginPropsBase {
  onPress: (insert: InsertGallery, insertAsync: InsertAsync) => void;
  pluginId: PluginIdGallery;
}

// Divider plugin properties
type CreateDividerEntityProps = 'single' | 'double' | 'dashed' | 'dotted'
declare type insertDivider = (props: CreateDividerEntityProps) => void
interface PluginPropsDivider extends PluginPropsBase {
  onPress: (insert: InsertDivider, insertAsync: InsertAsync) => void;
  pluginId: PluginIdDivider;
}

// File plugin properties
declare type InsertFile = (props: CreateFileEntityProps, asyncUploadIds?: Array<String>) => void
interface PluginPropsFile extends PluginPropsBase {
  onPress: (insert: InsertFile, insertAsync: InsertAsync) => void;
  pluginId: PluginIdFile;
}

type FilePluginSrc = {
  name: string;
  type: string;
  id: string;
  size: number | undefined;
}

type FilePluginConfig = {
  alignment: string;
  size: string;
}

type FilePluginConfigViewer = {
  downloadTarget: string;
}

type CreateFileEntityProps = {
  file: FilePluginSrc;
  config?: FilePluginConfig;
  configViewer?: FilePluginConfigViewer;
}

declare type PluginProps =
  PluginPropsVideo
  | PluginPropsImage
  | PluginPropsGif
  | PluginPropsMedia
  | PluginPropsGallery
  | PluginPropsDivider
  | PluginPropsFile

type PossiblyLinkedEntity = {
  config: {
    link?: null | {
      url: string;
    };
  };
}
