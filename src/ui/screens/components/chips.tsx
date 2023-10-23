import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {ChipsProps} from '@src/types';

const Chips = ({
  chipData,
  selectedChip,
  containerStyle,
  onChipPress,
}: ChipsProps) => {
  const kittenStyle = useStyleSheet(kittenStyles);

  return (
    <Layout style={[styles.chipContainer, containerStyle]}>
      {chipData.map((chip, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onChipPress(chip)}
          style={[
            styles.chip,
            selectedChip === chip ? kittenStyle.selectedChip : {},
          ]}>
          <Text
            style={[selectedChip === chip ? kittenStyle.selectedChipText : {}]}>
            {chip}
          </Text>
        </TouchableOpacity>
      ))}
    </Layout>
  );
};

const kittenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  btn: {
    backgroundColor: 'color-primary-500',
  },
  selectedChip: {
    backgroundColor: 'color-primary-500',
  },
  selectedChipText: {
    color: 'color-basic-100',
  },
});

const styles = StyleSheet.create({
  chipContainer: {flexDirection: 'row', justifyContent: 'center'},
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
});

export default Chips;
