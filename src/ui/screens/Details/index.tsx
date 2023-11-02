import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Card,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {AppScreenProps} from '@src/types';
import HorizontalInfo from '../components/horizontalInfo';
import PieChart from '../components/piechart';
import {calculatePercentage} from '../helpers/formulas';

const DetailScreen: React.FC<AppScreenProps<'DetailScreen'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  const {
    emi,
    interest,
    loanamount: loanAmount,
    period,
    selectedChip,
    isPeriodInMonths,
  } = route.params;
  console.log(route.params);

  // Dummy data for HorizontalInfo components
  const screenData = [
    {title: 'Emi', value: emi ?? 0}, // Convert emi to a string
    {title: 'Interest', value: `${interest}%`}, // Convert interest to a string
    {title: 'Loan Amount', value: loanAmount}, // Convert loanAmount to a string
    {
      title: 'Period',
      value: isPeriodInMonths
        ? `${period} Months`
        : `${(period ?? 0) / 12} Years`,
    },
    {title: 'Total Interest', value: (emi * period - loanAmount).toFixed(2)},
    {
      title: 'Total Payment',
      value: (emi * period - loanAmount + loanAmount).toFixed(2),
    },
  ];

  const getSelectedChipValue = (selectedChip: string) => {
    const selectedKey = selectedChip.toLowerCase().replace(/ /g, '');
    //@ts-ignore
    return route.params[selectedKey];
  };

  const data = [
    {
      name: 'Total interest',
      percentage: calculatePercentage(
        emi * period - loanAmount,
        loanAmount,
        'A',
      ),
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: theme['color-basic-800'],
      legendFontSize: 15,
    },
    {
      name: 'Loan Amount',
      percentage: calculatePercentage(
        emi * period - loanAmount,
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

  return (
    <Layout style={styles.outerContainer}>
      {/* Card with Title and Value */}
      <Card style={[styles.card, kittenStyle.whiteBackground]}>
        <Text style={kittenStyle.primaryText} category="h5">
          {selectedChip}
        </Text>
        <Text style={kittenStyle.primaryText} category="s1">
          {getSelectedChipValue(selectedChip)}
        </Text>
      </Card>

      {/* HorizontalInfo components */}
      {screenData.map((data, index) => (
        <HorizontalInfo
          key={index}
          title={data.title}
          value={data.value.toString()}
          showDivider={index < screenData.length - 1}
          titleTextStyle={{fontWeight: '700'}}
        />
      ))}

      <Layout style={styles.chartContainer}>
        <PieChart
          data={data}
          width={Dimensions.get('screen').width * 0.9}
          height={200}
          chartConfig={chartConfig}
          accessor="percentage"
        />
      </Layout>

      {/* Button */}
      <Button
        style={styles.button}
        onPress={() => {
          navigation.navigate('InDepthDetailScreen', route.params);
        }}>
        Monthly Emi-Breakup And Export
      </Button>
    </Layout>
  );
};
const kittenStyles = StyleSheet.create({
  primaryText: {
    color: 'color-primary-500',
    textAlign: 'center',
  },
  whiteBackground: {
    backgroundColor: 'color-basic-500',
  },
});
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chartContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
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
    marginBottom: 10,
  },
  button: {
    marginVertical: 16,
  },
});

export default DetailScreen;
