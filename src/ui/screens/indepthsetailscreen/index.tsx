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
import {roundNumber} from '../helpers/formulas';
import AmortizationSchedule from '../components/monthlyDetails';

const InDepthDetailScreen: React.FC<AppScreenProps<'InDepthDetailScreen'>> = ({
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
    {title: 'Emi', value: (emi ?? 0).toString()}, // Convert emi to a string
    {title: 'Interest', value: interest.toString()}, // Convert interest to a string
    {title: 'Loan Amount', value: loanAmount.toString()}, // Convert loanAmount to a string
    {title: 'Period', value: period.toString()},
    {title: 'Total Interest', value: (emi * period - loanAmount).toFixed(2)},
  ];

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

  return (
    <Layout style={styles.outerContainer}>
      {screenData.map((data, index) => (
        <HorizontalInfo
          key={index}
          title={data.title}
          value={data.value}
          showDivider={index < screenData.length - 1}
        />
      ))}
      <AmortizationSchedule
        schedule={calculateAmortizationSchedule(
          loanAmount,
          interest,
          period,
          emi ?? 0,
        )}
      />
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
