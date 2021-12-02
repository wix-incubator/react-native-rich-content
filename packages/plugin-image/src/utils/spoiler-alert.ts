import {Platform, PixelRatio} from 'react-native';

const DEFAULT_BLUR_RADIUS = 20;

const computeAndroidBlurRadiusForResolution = (resolution: number) => ((5 / 654120) * resolution) + 19.05;
const computeIOSBlurRadiusForResolution = (resolution: number) => ((30 / 383916) * resolution) + 18.28;
const computeBlurRadiusForResolution = Platform.OS === 'ios' ? computeIOSBlurRadiusForResolution : computeAndroidBlurRadiusForResolution;
export const computeBlurForSize = (size: Size) => {
  if (size) {
    const widthPixels = PixelRatio.getPixelSizeForLayoutSize(size.width);
    const heightPixels = PixelRatio.getPixelSizeForLayoutSize(size.height);
    const resolution = widthPixels * heightPixels;
    return computeBlurRadiusForResolution(resolution);
  } else {
    return DEFAULT_BLUR_RADIUS;
  }
};