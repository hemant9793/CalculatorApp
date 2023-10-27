import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Card,
  Divider,
  useStyleSheet,
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

  const {
    emi,
    interest,
    loanamount: loanAmount,
    period,
    selectedChip,
  } = route.params;
  console.log(route.params);

  // Dummy data for HorizontalInfo components
  const screenData = [
    {title: 'Emi', value: emi ?? 0}, // Convert emi to a string
    {title: 'Interest', value: interest}, // Convert interest to a string
    {title: 'Loan Amount', value: loanAmount}, // Convert loanAmount to a string
    {title: 'Period', value: period},
    {title: 'Total Interest', value: (emi * period - loanAmount).toFixed(2)},
    {title: 'Total Payment', value: emi * period - loanAmount + loanAmount},
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
      legendFontColor: '#7F7F7F',
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
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: 'pink',
    backgroundGradientTo: 'yellow',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <Layout style={styles.outerContainer}>
      {/* Card with Title and Value */}
      <Card style={[styles.card, kittenStyle.whiteBackground]}>
        <Text style={kittenStyle.primaryText} category="h6">
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
        />
      ))}

      <Layout style={styles.chartContainer}>
        <PieChart
          data={data}
          width={Dimensions.get('screen').width * 0.9}
          height={100}
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
        See Details
      </Button>
    </Layout>
  );
};
const kittenStyles = StyleSheet.create({
  primaryText: {
    color: 'color-primary-500',
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
  },
  card: {
    padding: 12,
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
