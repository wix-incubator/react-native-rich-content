import {RceApi} from '../types';

declare global {
    interface Window {
        ReactNativeWebView: {
            postMessage: (str: string) => void;
        };
        rceApi: RceApi;
    }
}

export const postWebviewMessage = (messageObject: {type: string, data?: Object}) => {
    window.ReactNativeWebView.postMessage(JSON.stringify(messageObject))
};

export const setRceApi = (api: RceApi) => window.rceApi = api;

export const setPrimaryColor = (primaryColor?: string) => {
    if (primaryColor) {
        document.documentElement.style.setProperty('--theme-color',primaryColor,);
    }
}
