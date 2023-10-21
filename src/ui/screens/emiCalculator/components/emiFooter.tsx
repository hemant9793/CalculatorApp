import React from 'react';
import {Layout, Button, useStyleSheet} from '@ui-kitten/components';
import {STRINGS} from '../strings'; // Assuming you have the strings file.
import {StyleSheet} from 'react-native';
import {EmitFooter} from '@src/types';

const EmiFooter = ({onResetPress, onCalculatePress}: EmitFooter) => {
  const kittenStyle = useStyleSheet(kittenStyles);

  return (
    <Layout style={styles.emiFooter}>
      <Button
        status="basic"
        onPress={onResetPress}
        style={kittenStyle.resetButton}>
        {STRINGS.RESET}
      </Button>
      <Button
        status="primary"
        onPress={onCalculatePress}
        style={kittenStyle.button}>
        {STRINGS.CALCULATE_BUTTON}
      </Button>
    </Layout>
  );
};

const kittenStyles = StyleSheet.create({
  resetButton: {
    flex: 1,
    margin: 4,
    borderColor: 'color-primary-500',
    backgroundColor: 'color-basic-100',
    borderWidth: 2,
  },
  button: {
    flex: 1,
    margin: 4,
  },
});

const styles = StyleSheet.create({
  emiFooter: {
    flexDirection: 'row',
  },
});

export default EmiFooter;
