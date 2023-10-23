import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Icon, Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {AppScreenProps} from '@src/types';

const HomeScreen: React.FC<AppScreenProps<'HomeScreen'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const sections = [
    {
      title: 'Emi Calculators',
      data: [
        {key: 'Emi Calculator', screen: 'EmiCalculator', icon: ''},
        {key: 'Compare Loans', screen: 'CompareLoansScreen', icon: ''},
        // Add more items for List
      ],
    },
    {
      title: 'Banking Calculators',
      data: [
        {key: 'FD Calculator', screen: 'FDCalculator', icon: ''},
        {key: 'RD Calculator', screen: 'RDCalculator', icon: ''},
        {key: 'PPF Calculator', screen: 'PPFCalculator', icon: ''},
        // Add more items for List
      ],
    },
    // Add more sections
  ];

  const onItemPress = (item: any) => {
    navigation.navigate('FdCalculator', {
      screenTitle: 'FdCalculator',
    });
  };

  const renderSection = (section: any, index: number) => {
    const items = section.data;
    const maxItemsPerRow = 2;
    const rows = Math.ceil(items.length / maxItemsPerRow);
    const renderedRows = [];

    for (let i = 0; i < rows; i++) {
      const start = i * maxItemsPerRow;
      const end = Math.min(start + maxItemsPerRow, items.length);
      const rowItems = items.slice(start, end);

      const rowContent = (
        <Layout style={styles.gridContainer} key={`row_${i}`}>
          {rowItems.map((item: any, itemIndex: number) => (
            <TouchableOpacity
              key={itemIndex}
              style={styles.gridItem}
              onPress={() => onItemPress(item)}>
              <Icon
                style={{height: 40, width: 40}}
                fill="#8F9BB3"
                name="star"
              />
              <Text style={styles.itemTextStyle}>{item.key}</Text>
            </TouchableOpacity>
          ))}
        </Layout>
      );

      renderedRows.push(rowContent);
    }

    return (
      <TouchableOpacity
        key={index}
        style={kittenStyle.card}
        onPress={() => onItemPress(section.data[0])} // Navigate based on the first item
      >
        <Text style={styles.sectionHeader}>{section.title}</Text>
        {renderedRows}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => renderSection(section, index))}
    </ScrollView>
  );
};
const kittenStyles = StyleSheet.create({
  card: {
    backgroundColor: 'color-basic-500',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemTextStyle: {
    fontWeight: '500',
    paddingTop: 5,
  },
});

export default HomeScreen;
