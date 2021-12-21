/* eslint-disable uilib/no-hard-coded-color */
import React, {useMemo, FC, ReactNode} from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {isArray} from 'lodash';

const HIDDEN_COLOR = '#A6ACB1';
const EXPOSED_COLOR = '#20303C';

type InlineSpoilerTextProps = {
  style?: TextStyle;
  key?: string | number;
  children: ReactNode;
  onPress?: () => void;
  shouldHide: boolean;
}

const mergeArrayOfObjects = (arrayOfObjects: Array<Object>) => {
  const finalObject = {};
  arrayOfObjects.forEach((obj) => Object.assign(finalObject, obj));
  return finalObject;
};

export const InlineSpoilerText: FC<InlineSpoilerTextProps> = ({style, key, children, onPress, shouldHide}) => {
  const styleAsObject = useMemo(() => isArray(style) ? mergeArrayOfObjects(style) : style, [style]);
  return (
    <Text
      key={key}
      style={[styleAsObject, shouldHide ? styles.hidden : styles.exposed]}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  hidden: {
    color: HIDDEN_COLOR,
    backgroundColor: HIDDEN_COLOR,
  },
  exposed: {
    color: EXPOSED_COLOR,
  },
});
