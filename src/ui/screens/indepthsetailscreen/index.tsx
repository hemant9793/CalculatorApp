import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Layout, useStyleSheet, useTheme} from '@ui-kitten/components';
import {AppScreenProps} from '@src/types';
import HorizontalInfo from '../components/horizontalInfo';
import {calculatePercentage, roundNumber} from '../helpers/formulas';
import AmortizationSchedule from '../components/monthlyDetails';
import PieChart from '@src/ui/screens/components/piechart';

const InDepthDetailScreen: React.FC<AppScreenProps<'InDepthDetailScreen'>> = ({
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
    investmentAmount = 0,
    investmentDate = '',
    isBankingDetails,
    maturityDate = '',
    maturityValue = 0,
    totalInterest = 0,
  } = route.params;
  console.log(route.params);

  // Dummy data for HorizontalInfo components
  const emiData = [
    {title: 'Emi', value: emi.toString()},
    {title: 'Interest', value: interest.toString()},
    {title: 'Loan Amount', value: loanAmount.toString()},
    {title: 'Period', value: period.toString()},
    {title: 'Total Interest', value: (emi * period - loanAmount).toFixed(2)},
  ];

  const bankingData = [
    {title: 'Maturity Value', value: maturityValue.toString()},
    {title: 'Investment Amount', value: investmentAmount.toString()},
    {title: 'Total Interest', value: totalInterest.toString()},
    {title: 'Investment Date', value: investmentDate.toString()},
    {title: 'Maturity Date', value: maturityDate?.toString()},
  ];

  const screenData = isBankingDetails ? bankingData : emiData;

  const calculateAmortizationSchedule = (
    principal: number,
    annualInterestRate: number,
    loanTerm: number,
    emi: number,
  ) => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const schedule = [];

    let balance = principal;
    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPaid = balance * monthlyInterestRate;
      const principalPaid = emi - interestPaid;
      balance -= principalPaid;

      schedule.push({
        month,
        balance: roundNumber(balance),
        principal: roundNumber(principalPaid),
        interest: roundNumber(interestPaid),
      });
    }

    return schedule;
  };

  const data = [
    {
      name: 'Total interest',
      percentage: calculatePercentage(totalInterest, maturityValue, 'A'),
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Maturity Amount',
      percentage: calculatePercentage(totalInterest, maturityValue, 'B'),
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
      {isBankingDetails && (
        <Layout
          style={[
            styles.chartContainer,
            {backgroundColor: theme['color-basic-200']},
          ]}>
          <PieChart
            data={data}
            width={Dimensions.get('screen').width * 0.9}
            height={100}
            chartConfig={chartConfig}
            accessor="percentage"
          />
        </Layout>
      )}
      {screenData.map((data, index) => (
        <HorizontalInfo
          key={index}
          title={data.title}
          value={data.value}
          isHorizontal={!isBankingDetails}
          showDivider={index < screenData.length - 1}
        />
      ))}
      {!isBankingDetails && (
        <AmortizationSchedule
          schedule={calculateAmortizationSchedule(
            loanAmount,
            interest,
            period,
            emi ?? 0,
          )}
        />
      )}
    </Layout>
  );
};
const kittenStyles = StyleSheet.create({
  primaryText: {
    color: 'color-primary-500',
  },
});
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chartContainer: {
    paddingVertical: 10,
    marginHorizontal: 10,
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
  },
  button: {
    marginVertical: 16,
  },
});

export default InDepthDetailScreen;
