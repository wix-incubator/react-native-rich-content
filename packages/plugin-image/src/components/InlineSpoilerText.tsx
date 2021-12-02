import React, {useMemo, FC, ReactNode} from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {isArray} from 'lodash';

type InlineSpoilerTextProps = {
  style: TextStyle;
  key?: string | number;
  children: ReactNode;
  onPress?: () => void;
  shouldHide: boolean;
}

const mergeArrayOfObjects = (arrayOfObjects) => {
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
    color: Colors.grey40,
    backgroundColor: Colors.grey40,
  },
  exposed: {
    color: Colors.grey10,
  },
});
