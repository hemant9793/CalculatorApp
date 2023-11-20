import React, {useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
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
import LoanComparisonCard from '../components/comparisonCard';

const LoanComparisonDetails: React.FC<
  AppScreenProps<'LoanComparisonDetails'>
> = ({route, navigation}) => {
  const kittenStyle = useStyleSheet(kittenStyles);

  const {
    emi1,
    emi2,
    loanTenureMonths,
    loanTenureMonths2,
    monthlyInterestRate,
    monthlyInterestRate2,
    principalAmount,
    principalAmount2,
  } = route.params;
  console.log(route.params);

  const totalInterest1 = roundNumber(emi1 * loanTenureMonths - principalAmount);
  const totalInterest2 = roundNumber(
    emi2 * loanTenureMonths2 - principalAmount2,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Comparison Details' ?? '',
    });
  }, [navigation]);

  return (
    <Layout style={kittenStyle.outerContainer}>
      <LoanComparisonCard
        cardTitle="Monthly Emi"
        title1="Loan 1 Emi"
        value1={'₹' + roundNumber(emi1)}
        title2="Loan 2 Emi"
        value2={'₹' + roundNumber(emi2)}
      />
      <LoanComparisonCard
        cardTitle="Interest Rate"
        title1="Loan 1 Interest"
        value1={roundNumber(monthlyInterestRate) + '%'}
        title2="Loan 2 Interest"
        value2={roundNumber(monthlyInterestRate2) + '%'}
      />
      <LoanComparisonCard
        cardTitle="Total Interest"
        title1="Loan 1 Total Interest"
        value1={'₹' + totalInterest1}
        title2="Loan 2 Total Interest"
        value2={'₹' + totalInterest2}
      />
      <LoanComparisonCard
        cardTitle="Total Amount"
        title1="Loan 1 Total Amount"
        value1={'₹' + (totalInterest1 + principalAmount)}
        title2="Loan 2 Total Amount"
        value2={'₹' + (totalInterest2 + principalAmount2)}
      />
    </Layout>
  );
};
const kittenStyles = StyleSheet.create({
  primaryText: {
    color: 'color-primary-500',
  },
  outerContainer: {
    flex: 1,
    padding: 10,
  },
});
const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
});

export default LoanComparisonDetails;
