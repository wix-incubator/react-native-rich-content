import {Linking} from 'react-native';
import linkifyIt from 'linkify-it';
import get from 'lodash/get';

const linkify = linkifyIt();

// If the url doesn't have protocol indicated - add 'http://'
export const getUrlWithProtocol = (url: string): string => {
  return get(linkify.match(url), '[0].url', '');
};

export async function openUrl(url: string) {
  const {parse, format} = require('url');
  // URL needs to be normalized because Android doesn't support uppercase protocol (HTTPS://, HTTP://, etc.)
  const normalizedUrl = format(parse(url)).toString();

  try {
    const isSupported = await Linking.canOpenURL(normalizedUrl);
    if (!isSupported) {
      console.warn(`Can not handle url: ${url}`);
      // Android 11 issue with canOpenURL always false on RN: 0.63.4. Please, wait for RN update and remove FT upon confirmation.
    }

    Linking.openURL(normalizedUrl);
  } catch (error) {
    console.error('An error occurred', error);
  }
}