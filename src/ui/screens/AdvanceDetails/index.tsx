import React, {useLayoutEffect} from 'react';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Card,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {AppScreenProps} from '@src/types';
import PieChart from '../components/piechart';
import {calculatePercentage} from '../helpers/formulas';
import {InterstitialAds} from '@src/ui/screens/components/interstitialAds';
import {monthsToYearsAndMonths} from '@src/ui/utils/helperUtils';
import {STRINGS} from '@src/ui/screens/Details/strings';
import GridComponent from '@src/ui/screens/components/gridInfo';

const AdvanceDetailScreen: React.FC<AppScreenProps<'AdvanceDetailScreen'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  const {
    emi = 0,
    interest = 0,
    loanamount: loanAmount = 0,
    period = 0,
    totalInterest = 0,
    isPeriodInMonths,
    totalNewInterest = 0,
    totalOldInterest = 0,
    processingfee = 0,
    interestChange = 0,
    newTenure = 0,
    oldTenure = 0,
    interestChangeString = '',
  } = route.params;

  const getInterestTitle = (changedInterest?: number) => {
    return changedInterest && changedInterest > 0
      ? STRINGS.INTEREST_INCREASED_BY
      : STRINGS.INTEREST_DECREASED_BY;
  };

  const screenData = [
    // {title: 'Emi', value: emi ?? 0}, // Convert emi to a string
    {title: 'Interest', value: `${interest}%`}, // Convert interest to a string
    {title: 'Loan Amount', value: '₹' + loanAmount}, // Convert loanAmount to a string
    {
      title: 'Period',
      value: isPeriodInMonths
        ? `${period} Months`
        : `${(period ?? 0) / 12} Years`,
    },
    ...(!interestChangeString
      ? [{title: 'Total Interest', value: `₹ ${totalInterest}`}]
      : []),
    ...(interestChangeString
      ? [
          {title: 'Total New Interest', value: `₹ ${totalNewInterest}`},
          {title: 'Total Old Interest', value: `₹ ${totalOldInterest}`},
          {title: 'Interest Rate Changes', value: interestChangeString},
          {
            title: STRINGS.NEW_TENURE,
            value: monthsToYearsAndMonths(newTenure ?? 0),
          },
          {
            title: STRINGS.OLD_TENURE,
            value: monthsToYearsAndMonths(oldTenure ?? 0),
          },
          {
            title: getInterestTitle(interestChange),
            value: `₹ ${interestChange}`,
          },
        ]
      : []),
    {
      title: 'Total Payment',
      value:
        '₹' +
        (
          (totalNewInterest ? totalNewInterest : totalInterest) + loanAmount
        ).toFixed(2),
    },
    ...(processingfee
      ? [{title: 'Processing fee', value: '₹' + processingfee}]
      : []),
  ];

  const pieChartData = [
    {
      name: 'Total interest',
      percentage: calculatePercentage(
        totalNewInterest ? totalNewInterest : totalInterest,
        loanAmount,
        'A',
      ),
      color: theme['color-primary-500'],
      legendFontColor: theme['color-basic-800'],
      legendFontSize: 15,
    },
    {
      name: 'Loan Amount',
      percentage: calculatePercentage(
        totalNewInterest ? totalNewInterest : totalInterest,
        loanAmount,
        'B',
      ),
      color: '#F00',
      legendFontColor: theme['color-basic-800'],
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: 'pink',
    backgroundGradientTo: 'yellow',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {borderRadius: 10},
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Details' ?? '',
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.outerContainer}>
      <InterstitialAds />
      <Card style={[styles.card, kittenStyle.primaryBackground]}>
        <Text style={kittenStyle.primaryText} category="h5">
          {'Emi'}
        </Text>
        <Text style={kittenStyle.primaryText} category="h6">
          {'₹ ' + emi}
        </Text>
      </Card>
      <GridComponent data={screenData} />
      <Layout style={styles.chartContainer}>
        <PieChart
          data={pieChartData}
          width={Dimensions.get('screen').width * 0.9}
          height={200}
          chartConfig={chartConfig}
          accessor="percentage"
        />
      </Layout>
      <Button
        style={styles.button}
        onPress={() => {
          navigation.navigate('AdvanceInDepthDetailScreen', route.params);
        }}>
        Monthly Emi-Breakup And Export
      </Button>
      {/* <InterstitialAds ref/>  */}
    </ScrollView>
  );
};
const kittenStyles = StyleSheet.create({
  primaryText: {
    color: 'color-basic-500',
    textAlign: 'center',
    marginBottom: 5,
  },
  whiteBackground: {
    backgroundColor: 'color-basic-500',
  },
  primaryBackground: {
    backgroundColor: 'color-primary-500',
  },
});
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chartContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraData: {},
  card: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 14, // Shadow radius
    elevation: 4, // Elevation
    marginBottom: 5,
  },
  button: {
    marginVertical: 16,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  textValue: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 16,
  },
});

export default AdvanceDetailScreen;
