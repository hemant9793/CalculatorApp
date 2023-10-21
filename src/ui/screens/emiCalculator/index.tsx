import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text, Input, useStyleSheet} from '@ui-kitten/components';
import {Chips} from '../components';
import EmiFooter from './components/emiFooter'; // Import the EmiFooter component

import {STRINGS} from './strings';
import {calculateEMI, calculatePrincipal} from '../helpers/formulas';
import {AppScreenProps} from '@src/types';

const HEADER_CHIPS = ['EMI', 'Loan Amount', 'Interest', 'Period'];
const MONTH_OR_YEARS = ['Years', 'Months'];

const EmiCalculator: React.FC<AppScreenProps<'EmiCalculator'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);

  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [enteredEmi, setEnteredEmi] = useState('');
  const [calculatedVal, setCalculatedVal] = useState('');
  const [selectedChip, setSelectedChip] = useState('EMI');
  const [selectedMOrY, setselectedMOrY] = useState('Years');
  const [principalError, setPrincipalError] = useState('');
  const [interestRateError, setInterestRateError] = useState('');
  const [tenureError, setTenureError] = useState('');
  const [emiError, setEmiError] = useState('');

  const checkAndSetErrors = () => {
    // Convert input to numeric values

    if (isNaN(parseFloat(principal))) {
      setPrincipalError('Please enter a valid principal amount');
    }
    if (isNaN(parseFloat(interestRate) / 100 / 12)) {
      setInterestRateError('Please enter a valid interest rate');
    }
    if (isNaN(parseFloat(tenure) * 12)) {
      setTenureError('Please enter a valid loan tenure');
    }
    if (isNaN(parseFloat(enteredEmi))) {
      setEmiError('Please enter a valid Emi');
    }
  };

  const clearError = () => {
    setPrincipalError('');
    setInterestRateError('');
    setTenureError('');
  };

  const checkValAndCalcPrincipal = (
    interestRate: string,
    selectedMOrY: string,
    tenure: string,
    enteredEmi: string,
    setCalculatedVal: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const loanTenureMonths =
      selectedMOrY == 'Years' ? parseFloat(tenure) * 12 : parseFloat(tenure);
    let calcPrincipal;
    if (
      !isNaN(parseFloat(enteredEmi)) &&
      !isNaN(monthlyInterestRate) &&
      !isNaN(loanTenureMonths)
    ) {
      calcPrincipal = calculatePrincipal(
        parseFloat(enteredEmi),
        monthlyInterestRate,
        loanTenureMonths,
      );

      setCalculatedVal(calcPrincipal.toFixed(2));
    } else {
      setCalculatedVal('');
    }
    navigation.navigate('DetailScreen', {
      selectedChip,
      emi: parseFloat(enteredEmi) ?? 0,
      loanamount: calcPrincipal ?? 0,
      interest: parseFloat(interestRate),
      period: loanTenureMonths,
    });
  };

  const checkValAndCalcEmi = (
    principalAmount: number,
    monthlyInterestRate: number,
    loanTenureMonths: number,
    setCalculatedVal: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    let emiValue;
    if (
      !isNaN(principalAmount) &&
      !isNaN(monthlyInterestRate) &&
      !isNaN(loanTenureMonths)
    ) {
      // Calculate EMI
      emiValue = calculateEMI(
        principalAmount,
        monthlyInterestRate,
        loanTenureMonths,
      );

      setCalculatedVal(emiValue.toFixed(2));
    } else {
      setCalculatedVal('');
    }
    navigation.navigate('DetailScreen', {
      selectedChip,
      emi: emiValue?.toFixed(2) ?? 0,
      loanamount: parseFloat(principal) ?? 0,
      interest: parseFloat(interestRate),
      period: loanTenureMonths,
    });
  };

  const calculateValue = () => {
    const principalAmount = parseFloat(principal);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const loanTenureMonths =
      selectedMOrY == 'Years' ? parseFloat(tenure) * 12 : parseFloat(tenure); // Loan tenure in months
    checkAndSetErrors();
    if (selectedChip == 'Loan Amount') {
      checkValAndCalcPrincipal(
        interestRate,
        selectedMOrY,
        tenure,
        enteredEmi,
        setCalculatedVal,
      );
    } else if (selectedChip == 'EMI') {
      checkValAndCalcEmi(
        principalAmount,
        monthlyInterestRate,
        loanTenureMonths,
        setCalculatedVal,
      );
    }
  };

  const reset = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setEnteredEmi('');
    setCalculatedVal('');
    // setSelectedChip('EMI');
    clearError();
    setEmiError('');
  };

  const onChipPress = (chip: string) => {
    setSelectedChip(chip);
    reset();
  };

  const onMOrYChipPress = (chip: string) => {
    setselectedMOrY(chip);
  };

  return (
    <Layout style={kittenStyle.container}>
      <Chips
        chipData={HEADER_CHIPS}
        selectedChip={selectedChip}
        onChipPress={onChipPress}
      />
      <Layout style={styles.inputContainer}>
        {selectedChip !== STRINGS.PRINCIPAL_AMOUNT_LABEL && (
          <Input
            label={STRINGS.PRINCIPAL_AMOUNT_LABEL}
            placeholder={STRINGS.PRINCIPAL_AMOUNT_PLACEHOLDER}
            keyboardType="numeric"
            value={principal}
            style={styles.input}
            onChangeText={setPrincipal}
            caption={principalError}
          />
        )}
        {selectedChip !== STRINGS.INTEREST_RATE_LABEL && (
          <Input
            label={STRINGS.INTEREST_RATE_LABEL}
            placeholder={STRINGS.INTEREST_RATE_PLACEHOLDER}
            keyboardType="numeric"
            value={interestRate}
            style={styles.input}
            onChangeText={setInterestRate}
            caption={interestRateError}
          />
        )}

        {selectedChip !== STRINGS.EMI_LABEL && (
          <Input
            label={STRINGS.EMI_LABEL}
            placeholder={STRINGS.EMI_PLACEHOLDER}
            keyboardType="numeric"
            value={enteredEmi}
            style={styles.input}
            onChangeText={setEnteredEmi}
            caption={emiError}
          />
        )}
        {selectedChip !== STRINGS.LOAN_TENURE_LABEL && (
          <Layout style={styles.periodContainer}>
            <Input
              label={STRINGS.LOAN_TENURE_LABEL}
              placeholder={STRINGS.LOAN_TENURE_PLACEHOLDER}
              keyboardType="numeric"
              value={tenure}
              style={{...styles.input, flex: 1}}
              onChangeText={setTenure}
              caption={tenureError}
            />
            <Chips
              chipData={MONTH_OR_YEARS}
              selectedChip={selectedMOrY}
              containerStyle={{
                ...styles.mOrYChipContainer,
                ...(tenureError ? {marginBottom: 20} : {marginBottom: 5}),
              }}
              onChipPress={onMOrYChipPress}
            />
          </Layout>
        )}
      </Layout>

      <EmiFooter onResetPress={reset} onCalculatePress={calculateValue} />

      {calculatedVal ? (
        <Layout style={styles.card}>
          <Text category="h6" style={styles.cardTitle}>
            {STRINGS.EMI_LABEL}
          </Text>
          <Text category="s1" style={styles.cardValue}>
            {calculatedVal}
          </Text>
        </Layout>
      ) : null}
    </Layout>
  );
};

const kittenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  cardTitle: {
    marginBottom: 8,
    marginRight: 10,
  },
  cardValue: {
    marginBottom: 8,
  },
});

export default EmiCalculator;
