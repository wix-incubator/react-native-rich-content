/* eslint-disable no-tabs */
import { RceApi, FontData } from '../types';

declare global {
    interface Window {
        ReactNativeWebView: {
            postMessage: (str: string) => void;
        };
        rceApi: RceApi;
    }
}

const generateFontFaceCss = (font: FontData) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  `@font-face {
		font-family: '${font.fontFamily}';
		src: url('${font.src.url}') format('${font.src.format}')
}`;

export const postWebviewMessage = (messageObject: {type: string, data?: Object}) => {
  window.ReactNativeWebView.postMessage(JSON.stringify(messageObject));
};

export const setRceApi = (api: RceApi) => {
  window.rceApi = api;
};

export const setPrimaryColor = (primaryColor?: string) => {
  if (primaryColor) {
    document.documentElement.style.setProperty('--theme-color', primaryColor);
  }
};

export const loadFonts = (fonts: FontData[]) => {
  const fontFacesCss = fonts.map(generateFontFaceCss).join();
  const newStyleElement = document.createElement('style');
  newStyleElement.setAttribute('type', 'text/css');
  newStyleElement.innerHTML = fontFacesCss;
  document.head.appendChild(newStyleElement);
};
