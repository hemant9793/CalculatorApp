import React from 'react';
import {Text, Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {HorizontalInfoProps} from '@src/types';

const HorizontalInfo = ({title, value, showDivider}: HorizontalInfoProps) => {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.textContainer}>
        <Text category="p1">{title}</Text>
        <Text category="s1" style={styles.valueText}>
          {value}
        </Text>
      </Layout>
      {showDivider && <Layout style={styles.divider} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 10},
  textContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  valueText: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  divider: {
    // flex: 1,
    height: 2,
    backgroundColor: '#aab7c0',
  },
});

export default HorizontalInfo;
