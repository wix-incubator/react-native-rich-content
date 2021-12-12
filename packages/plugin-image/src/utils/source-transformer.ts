import {ImageSourcePropType} from 'react-native';
import {ImageData} from '../types';

// TODO write more accurate source transformer after understanding public ricos image data structure
export const defaultSourceTransformer = (image: ImageData): ImageSourcePropType => ({uri: image.src.toString()});
