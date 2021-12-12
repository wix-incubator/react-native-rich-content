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
  image: ImageData['src'];
  alignment?: string;
}

export type InsertImage = (props: CreateImageEntityProps) => void
