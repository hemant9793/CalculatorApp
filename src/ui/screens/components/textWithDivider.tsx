import {Divider, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

const TextWithDivider = () => {
  return (
    <Layout style={styles.container}>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Your Text</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'flex-start',
    // paddingHorizontal: 10,
  },
  text: {
    backgroundColor: '#ffffff',
    // zIndex: 1,
    position: 'absolute',
    bottom: -8,
  },
  divider: {
    width: '100%',
    height: 12,
    backgroundColor: 'pink',
    marginTop: 20,
  },
});

export default TextWithDivider;
