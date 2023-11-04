import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Layout, Text, useStyleSheet, useTheme} from '@ui-kitten/components';
import {AppScreenProps, HomeScreenSectionData} from '@src/types';
import {SCREEN_NAMES, SCREEN_UI_DATA} from '@src/ui/screendata/screendata';
import SvgInCircle from '@src/ui/screens/components/circularSvg';
import {SCREEN_EMI_UI_DATA} from '@src/ui/screens/emiCalculator/emiscreendata';

const HomeScreen: React.FC<AppScreenProps<'HomeScreen'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();
  const sections: HomeScreenSectionData[] = [
    {
      title: 'Emi Calculators',
      data: [
        {
          key: 'EMI',
          screen: 'EmiCalculator',
          icon: SCREEN_NAMES.EmiCalculator,
        },
        {
          key: 'Flat Rate EMI',
          screen: 'FlatRateEmiCalculator',
          icon: SCREEN_NAMES.EmiCalculator,
        },
        {
          key: 'Advance EMI',
          screen: 'AdvanceEmiCalculator',
          icon: SCREEN_NAMES.AdvanceEmiCalculatorScreen,
        },
        {
          key: 'Home Loan',
          screen: 'HomeLoanCalculator',
          icon: SCREEN_NAMES.HomeLoanCalculator,
        },
        {
          key: 'Compare Loans',
          screen: 'CompareLoansScreen',
          icon: SCREEN_NAMES.CompareLoansScreen,
        },
        // Add more items for List
      ],
    },
    {
      title: 'Banking Calculators',
      data: [
        {
          key: 'FD Calculator',
          screen: 'FdCalculator',
          icon: SCREEN_NAMES.FdCalculator,
        },
        {
          key: 'RD Calculator',
          screen: 'RdCalculator',
          icon: SCREEN_NAMES.RdCalculator,
        },
        {
          key: 'PPF Calculator',
          screen: 'PpfCalculator',
          icon: SCREEN_NAMES.PpfdCalculator,
        },
        // Add more items for List
      ],
    },
    {
      title: 'Other Calculators',
      data: [
        {
          key: 'Amount to words',
          screen: 'AmountToWordsScreen',
          icon: SCREEN_NAMES.AmountToWordsScreen,
        },
        {
          key: 'Money Totaller',
          screen: 'MoneyTotallerScreen',
          icon: SCREEN_NAMES.MoneyTotallerScreen,
        },
        {
          key: 'PPF Calculator',
          screen: 'PpfCalculator',
          icon: SCREEN_NAMES.PpfdCalculator,
        },
        // Add more items for List
      ],
    },
    // Add more sections
  ];

  const onItemPress = (section: string, item: any) => {
    if (section === 'Emi Calculators') {
      const screenName = ['EmiCalculator', 'FlatRateEmiCalculator'].includes(
        item.screen,
      )
        ? 'EmiCalculator'
        : item.screen;
      //@ts-ignore
      navigation.navigate(screenName, SCREEN_EMI_UI_DATA[item?.screen]);
    } else if (section === 'Banking Calculators') {
      //@ts-ignore
      navigation.navigate('FdCalculator', SCREEN_UI_DATA[item?.screen]);
    } else {
      navigation.navigate(item.screen);
    }
  };

  const renderSection = (section: HomeScreenSectionData, index: number) => {
    const items = section.data;
    const maxItemsPerRow = 3;
    const rows = Math.ceil(items.length / maxItemsPerRow);
    const renderedRows = [];

    for (let i = 0; i < rows; i++) {
      const start = i * maxItemsPerRow;
      const end = Math.min(start + maxItemsPerRow, items.length);
      const rowItems = items.slice(start, end);

      const rowContent = (
        <Layout
          style={[
            styles.gridContainer,
            {backgroundColor: theme['color-basic-500']},
          ]}
          key={`row_${i}`}>
          {rowItems.map((item: any, itemIndex: number) => (
            <TouchableOpacity
              key={itemIndex}
              style={styles.gridItem}
              onPress={() => onItemPress(section?.title, item)}>
              <SvgInCircle
                width={50}
                height={50}
                color={'#ffffff'}
                name={item.icon}
              />

              <Text style={styles.itemTextStyle}>{item.key}</Text>
            </TouchableOpacity>
          ))}
        </Layout>
      );

      renderedRows.push(rowContent);
    }

    return (
      <Layout key={index} style={kittenStyle.card}>
        <Text
          appearance="alternative"
          style={[
            styles.sectionHeader,
            {backgroundColor: theme['color-primary-500']},
          ]}>
          {section.title}
        </Text>
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    textAlign: 'center',
    padding: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  gridItem: {
    flex: 1,
    borderRadius: 8,

    alignItems: 'center',
    paddingVertical: 14,
    margin: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemTextStyle: {
    paddingTop: 8,
    textAlign: 'center',
  },
  iconStyle: {height: 40, width: 40},
});

export default HomeScreen;
