import {imageServices} from '@react-native-rich-content/plugin-image';
import {AtomicPlugin, EditorRef} from '@react-native-rich-content/common';
import {ENTITY_TYPE, CTA_TEXT} from './constants';

const FIRST_IMAGE =
  'https://media.istockphoto.com/photos/london-city-downtown-financial-district-skyscrapers-square-mile-uk-picture-id186758453';
const SECOND_IMAGE =
  'https://media.istockphoto.com/photos/the-city-of-london-skyline-at-night-united-kingdom-picture-id1312550959';

const cameraIcon = require('../../../assets/camera-icon.jpeg');

export const createImageEditorPlugin = (editorRef: EditorRef): AtomicPlugin => {
  let imageToAdd = FIRST_IMAGE;
  const addNewImage = () => {
    imageServices.insertImageToEditor(imageToAdd, editorRef);
    imageToAdd = imageToAdd === FIRST_IMAGE ? SECOND_IMAGE : FIRST_IMAGE;
  };
  return {
    id: ENTITY_TYPE,
    toolbarIcon: cameraIcon,
    ctaText: CTA_TEXT,
    onPress: addNewImage,
  };
};
