import isArray from 'lodash/isArray';

// eslint-disable-next-line consistent-return
export const customMergeArrays = (objValue: Object, srcValue: Object) => {
  if (isArray(objValue) && isArray(srcValue)) {
    return srcValue;
  }
};
