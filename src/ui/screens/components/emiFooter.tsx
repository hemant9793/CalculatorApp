import React from 'react';
import {
  Layout,
  Button,
  useStyleSheet,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {STRINGS} from './strings'; // Assuming you have the strings file.
import {StyleSheet} from 'react-native';
import {EmitFooter} from '@src/types';

const EmiFooter = ({
  containerStyle,
  rightTitle,
  leftButtonVisible = true,
  leftTitle,
  rightButtonVisible = true,
  onResetPress,
  onCalculatePress,
}: EmitFooter) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  return (
    <Layout style={[styles.emiFooter, containerStyle]}>
      {leftButtonVisible && (
        <Button
          status="basic"
          onPress={onResetPress}
          style={kittenStyle.resetButton}>
          {() => (
            <Text style={{color: theme['color-primary-500']}}>
              {leftTitle ? leftTitle : STRINGS.RESET}
            </Text>
          )}
        </Button>
      )}
      {rightButtonVisible && (
        <Button
          status="primary"
          onPress={onCalculatePress}
          style={[
            kittenStyle.button,
            leftButtonVisible ? {} : {marginHorizontal: 11},
          ]}>
          {rightTitle ? rightTitle : STRINGS.CALCULATE_BUTTON}
        </Button>
      )}
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
