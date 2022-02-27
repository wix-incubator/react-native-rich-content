import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {Content} from '@react-native-rich-content/common';
import {ConsumerEditor} from './src/components/ConsumerEditor';
import {ConsumerViewer} from './src/components/ConsumerViewer';

const App = () => {
  const [content, setContent] = useState<Content>({blocks: [], entityMap: {}});
  return (
    <ScrollView style={styles.root}>
      <Text>Editor:</Text>
      <ConsumerEditor content={content} setContent={setContent} />
      <Text>Viewer:</Text>
      <ConsumerViewer content={content} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 500,
    width: 500,
    paddingTop: 100,
  },
});

export default App;
