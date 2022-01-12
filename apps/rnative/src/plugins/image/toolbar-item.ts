import {EditorRef} from '@react-native-rich-content/common';
import {imageServices} from '@react-native-rich-content/plugin-image';
import {ToolbarItem} from '@react-native-rich-content/toolbar';

const FIRST_IMAGE =
  'https://media.istockphoto.com/photos/london-city-downtown-financial-district-skyscrapers-square-mile-uk-picture-id186758453';
const SECOND_IMAGE =
  'https://media.istockphoto.com/photos/the-city-of-london-skyline-at-night-united-kingdom-picture-id1312550959';

const cameraIcon = require('../../../assets/camera-icon.jpeg');

export const getImageToolbarItem = (editorRef: EditorRef): ToolbarItem => {
  let imageToAdd = FIRST_IMAGE;
  const addNewImage = () => {
    imageServices.insertImageToEditor(imageToAdd, editorRef);
    imageToAdd = imageToAdd === FIRST_IMAGE ? SECOND_IMAGE : FIRST_IMAGE;
  };
  return {
    icon: cameraIcon,
    onPress: addNewImage,
  };
};
