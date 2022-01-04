import isArray from 'lodash/isArray';

export const customMergeArrays = (objValue: Object, srcValue: Object) => {
  if (isArray(objValue) && isArray(srcValue)) {
    return srcValue;
  }
};
