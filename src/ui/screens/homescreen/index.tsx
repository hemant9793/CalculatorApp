import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Icon, Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {AppScreenProps, HomeScreenSectionData} from '@src/types';
import {SCREEN_UI_DATA} from '@src/ui/screendata/screendata';

const HomeScreen: React.FC<AppScreenProps<'HomeScreen'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const sections: HomeScreenSectionData[] = [
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
        {key: 'FD Calculator', screen: 'FdCalculator', icon: ''},
        {key: 'RD Calculator', screen: 'RdCalculator', icon: ''},
        {key: 'PPF Calculator', screen: 'PpfCalculator', icon: ''},
        // Add more items for List
      ],
    },
    // Add more sections
  ];

  const onItemPress = (section: string, item: any) => {
    if (section === 'Emi Calculators') {
      navigation.navigate(item.screen);
    } else {
      //@ts-ignore
      navigation.navigate('FdCalculator', SCREEN_UI_DATA[item?.screen]);
    }
  };

  const renderSection = (section: HomeScreenSectionData, index: number) => {
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
              onPress={() => onItemPress(section?.title, item)}>
              <Icon style={styles.iconStyle} fill="#8F9BB3" name="star" />
              <Text style={styles.itemTextStyle}>{item.key}</Text>
            </TouchableOpacity>
          ))}
        </Layout>
      );

      renderedRows.push(rowContent);
    }

    return (
      <Layout key={index} style={kittenStyle.card}>
        <Text style={styles.sectionHeader}>{section.title}</Text>
        {renderedRows}
      </Layout>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {sections.map((section: HomeScreenSectionData, index: number) =>
        renderSection(section, index),
      )}
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
  iconStyle: {height: 40, width: 40},
});

export default HomeScreen;
