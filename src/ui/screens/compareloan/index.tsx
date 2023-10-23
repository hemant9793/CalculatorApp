import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Layout,
  Text,
  Input,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {Chips} from '../components';

import {STRINGS} from './strings';
import {calculateEMI, calculatePrincipal} from '../helpers/formulas';
import {AppScreenProps} from '@src/types';
import EmiFooter from '../components/emiFooter';

const MONTH_OR_YEARS = ['Years', 'Months'];

const CompareLoansScreen: React.FC<AppScreenProps<'CompareLoansScreen'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [principal2, setPrincipal2] = useState('');
  const [interestRate2, setInterestRate2] = useState('');
  const [tenure2, setTenure2] = useState('');
  const [selectedMOrY, setselectedMOrY] = useState('Years');

  const checkErrorAndShowToast = () => {
    if (
      !principal ||
      !interestRate ||
      !tenure ||
      !principal2 ||
      !interestRate2 ||
      !tenure2
    ) {
      Alert.alert('', 'Fill all values ');
      return true;
    }
    return false;
  };

  const calculateValue = () => {
    if (checkErrorAndShowToast()) return;
    const principalAmount = parseFloat(principal);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const loanTenureMonths =
      selectedMOrY == 'Years' ? parseFloat(tenure) * 12 : parseFloat(tenure); // Loan tenure in months

    const emi1 = calculateEMI(
      principalAmount,
      monthlyInterestRate,
      loanTenureMonths,
    );

    const principalAmount2 = parseFloat(principal2);
    const monthlyInterestRate2 = parseFloat(interestRate2) / 100 / 12; // Monthly interest rate
    const loanTenureMonths2 =
      selectedMOrY == 'Years' ? parseFloat(tenure2) * 12 : parseFloat(tenure2); // Loan tenure in months

    const emi2 = calculateEMI(
      principalAmount2,
      monthlyInterestRate2,
      loanTenureMonths2,
    );
    console.log('loanTenureMonths', loanTenureMonths);
    navigation.navigate('LoanComparisonDetails', {
      principalAmount,
      monthlyInterestRate,
      loanTenureMonths,
      emi1,
      principalAmount2,
      monthlyInterestRate2,
      loanTenureMonths2,
      emi2,
    });
  };

  const reset = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setPrincipal2('');
    setInterestRate2('');
    setTenure2('');
  };

  const onMOrYChipPress = (chip: string) => {
    setselectedMOrY(chip);
  };

  return (
    <Layout style={kittenStyle.container}>
      <Layout style={[styles.inputContainer, styles.card]}>
        <Text category="h6" style={styles.cardTitle}>
          Loan 1
        </Text>
        <Input
          label={STRINGS.PRINCIPAL_AMOUNT_LABEL}
          placeholder={STRINGS.PRINCIPAL_AMOUNT_PLACEHOLDER}
          keyboardType="numeric"
          value={principal}
          style={styles.input}
          onChangeText={setPrincipal}
        />
        <Input
          label={STRINGS.INTEREST_RATE_LABEL}
          placeholder={STRINGS.INTEREST_RATE_PLACEHOLDER}
          keyboardType="numeric"
          value={interestRate}
          style={styles.input}
          onChangeText={setInterestRate}
        />

        <Layout style={styles.periodContainer}>
          <Input
            label={STRINGS.LOAN_TENURE_LABEL}
            placeholder={STRINGS.LOAN_TENURE_PLACEHOLDER}
            keyboardType="numeric"
            value={tenure}
            style={{...styles.input, flex: 1}}
            onChangeText={setTenure}
          />
          <Chips
            chipData={MONTH_OR_YEARS}
            selectedChip={selectedMOrY}
            containerStyle={{
              ...styles.mOrYChipContainer,
              // ...(tenureError ? {marginBottom: 20} : {marginBottom: 5}),
            }}
            onChipPress={onMOrYChipPress}
          />
        </Layout>
      </Layout>

      <Layout style={[styles.inputContainer, styles.card]}>
        <Text category="h6" style={styles.cardTitle}>
          Loan 2
        </Text>
        <Input
          label={STRINGS.PRINCIPAL_AMOUNT_LABEL}
          placeholder={STRINGS.PRINCIPAL_AMOUNT_PLACEHOLDER}
          keyboardType="numeric"
          value={principal2}
          style={styles.input}
          onChangeText={setPrincipal2}
        />
        <Input
          label={STRINGS.INTEREST_RATE_LABEL}
          placeholder={STRINGS.INTEREST_RATE_PLACEHOLDER}
          keyboardType="numeric"
          value={interestRate2}
          style={styles.input}
          onChangeText={setInterestRate2}
        />

        <Layout style={styles.periodContainer}>
          <Input
            label={STRINGS.LOAN_TENURE_LABEL}
            placeholder={STRINGS.LOAN_TENURE_PLACEHOLDER}
            keyboardType="numeric"
            value={tenure2}
            style={{...styles.input, flex: 1}}
            onChangeText={setTenure2}
          />
          <Chips
            chipData={MONTH_OR_YEARS}
            selectedChip={selectedMOrY}
            containerStyle={{
              ...styles.mOrYChipContainer,
            }}
            onChipPress={onMOrYChipPress}
          />
        </Layout>
      </Layout>

      <EmiFooter
        rightTitle="Compare"
        onResetPress={reset}
        onCalculatePress={calculateValue}
      />
    </Layout>
  );
};

const kittenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  btn: {
    backgroundColor: 'color-primary-500',
  },
});

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
    borderWidth: 1.5,
  },
  inputContainer: {
    marginVertical: 8,
  },
  periodContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mOrYChipContainer: {
    height: 36,
    marginLeft: 10,
    marginBottom: 5,
  },
  card: {
    // backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  cardTitle: {
    marginBottom: 5,
  },
  cardValue: {
    marginBottom: 8,
  },
});

export default CompareLoansScreen;
