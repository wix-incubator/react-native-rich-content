import isString from 'lodash/isString';

export const prepareStringForInjection = (injectedString?: string) => {
    return isString(injectedString) ? injectedString.replace(/\\/g, '\\\\').replace(/\'/g, '\\\'') : injectedString;
};