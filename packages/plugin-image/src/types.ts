/* eslint-disable camelcase */
export type ImageConfig = {
  size?: string;
  alignment?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  link?: {
    anchor: unknown;
    url: string;
  };
  width?: number;
  key?: string;
}

export type ImageSrcObject = {
  id?: string;
  original_file_name: string;
  file_name: string;
  width: number;
  height: number;
}

export interface ImageData {
  src: ImageSrcObject | string;
  config?: ImageConfig;
  loading?: boolean;
  metadata?: {
    caption?: string;
    alt?: string | undefined;
  };
  disableDownload?: boolean;
  disableExpand?: boolean;
}

export type CreateImageEntityProps = {
  image: ImageData['src'] | string;
  alignment?: string;
}

export type ImageEntity = {
  data: ImageData,
  pluginType: 'wix-draft-plugin-image', 
}

