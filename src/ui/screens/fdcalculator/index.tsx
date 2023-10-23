import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Layout,
  Text,
  Input,
  useStyleSheet,
  useTheme,
  Select,
  SelectItem,
  IndexPath,
  Icon,
  Calendar,
} from '@ui-kitten/components';
import {Chips} from '../components';

import {STRINGS} from './strings';
import {
  calculateEMI,
  calculateFDMaturityAmount,
  calculatePrincipal,
} from '../helpers/formulas';
import {AppScreenProps} from '@src/types';
import EmiFooter from '../components/emiFooter';

const HEADER_CHIPS = ['CUMULATIVE', 'QUARTERLY', 'MONTHLY'];
const MONTH_OR_YEARS = ['Years', 'Months'];
const COMPOUNDING_OPTIONS = [
  'Simple Interest',
  'Compounded Monthly',
  'Compounded Yearly',
  'Compounded Quarterly',
  'Compounded Half Yearly',
];

const FdCalculator: React.FC<AppScreenProps<'FdCalculator'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();
  const {screenTitle = 'FdCalculator'} = route?.params;

  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [enteredEmi, setEnteredEmi] = useState('');
  const [calculatedVal, setCalculatedVal] = useState('');
  const [selectedChip, setSelectedChip] = useState('CUMULATIVE');
  const [selectedMOrY, setselectedMOrY] = useState('Years');
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  const [principalError, setPrincipalError] = useState('');
  const [interestRateError, setInterestRateError] = useState('');
  const [tenureError, setTenureError] = useState('');
  const [date, setDate] = React.useState(new Date());

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
  };

  const clearError = () => {
    setPrincipalError('');
    setInterestRateError('');
    setTenureError('');
  };

  const calculateValue = () => {
    const principalAmount = parseFloat(principal);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const loanTenureMonths =
      selectedMOrY == 'Years' ? parseFloat(tenure) * 12 : parseFloat(tenure); // Loan tenure in months
    console.log('loanTenureMonths', loanTenureMonths);
    checkAndSetErrors();
    const maturedFd = calculateFDMaturityAmount(
      principalAmount,
      parseFloat(interestRate),
      loanTenureMonths,
      selectedChip,
    );
    console.log('maturedFd', maturedFd);
    navigation.navigate('InDepthDetailScreen', {
      investmentAmount: principalAmount,
      investmentDate: '12,12,12',
      maturityDate: '12,12,12',
      maturityValue: maturedFd,
      isBankingDetails: true,
      totalInterest: 1000,
    });
  };

  const calculateRd = () => {
    const principalAmount = parseFloat(principal);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const loanTenureMonths =
      selectedMOrY == 'Years' ? parseFloat(tenure) * 12 : parseFloat(tenure); // Loan tenure in months
    console.log('loanTenureMonths', loanTenureMonths);
    checkAndSetErrors();
    const maturedFd = calculateFDMaturityAmount(
      principalAmount,
      parseFloat(interestRate),
      loanTenureMonths,
      selectedChip,
    );
    console.log('maturedFd', maturedFd);
    navigation.navigate('InDepthDetailScreen', {
      investmentAmount: principalAmount,
      investmentDate: '12,12,12',
      maturityDate: '12,12,12',
      maturityValue: maturedFd,
      isBankingDetails: true,
      totalInterest: 1000,
    });
  };

  const reset = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setEnteredEmi('');
    setCalculatedVal('');
    clearError();
  };

  const onChipPress = (chip: string) => {
    setSelectedChip(chip);
    reset();
  };

  const onMOrYChipPress = (chip: string) => {
    setselectedMOrY(chip);
  };

  const getInput1Label = () => {
    if (screenTitle == 'RdCalculator') {
      return STRINGS.MONTHLY_DEPOSIT;
    } else {
      return STRINGS.DEPOSIT_AMOUNT;
    }
  };

  const placeholder1Label = () => {
    if (screenTitle == 'RdCalculator') {
      return STRINGS.MONTHLY_DEPOSIT_PLACEHOLDER;
    } else {
      return STRINGS.DEPOSIT_AMOUNT_PLACEHOLDER;
    }
  };

  const getInput3Label = () => {
    if (screenTitle == 'RdCalculator') {
      return STRINGS.SAVING_TERMS;
    } else {
      return STRINGS.TENURE;
    }
  };

  const placeholder3Label = () => {
    if (screenTitle == 'RdCalculator') {
      return STRINGS.MONTHS;
    } else {
      return STRINGS.LOAN_TENURE_PLACEHOLDER;
    }
  };

  return (
    <Layout style={kittenStyle.container}>
      {screenTitle == 'FdCalculator' && (
        <Chips
          chipData={HEADER_CHIPS}
          selectedChip={selectedChip}
          onChipPress={onChipPress}
        />
      )}
      <Layout style={[styles.inputContainer, styles.card]}>
        <Input
          label={getInput1Label()}
          placeholder={placeholder1Label()}
          keyboardType="numeric"
          value={principal.toString()}
          style={styles.input}
          onChangeText={setPrincipal}
          caption={principalError}
        />
        <Input
          label={STRINGS.RATE_OF_INTEREST}
          placeholder={STRINGS.RATE_OF_INTEREST}
          keyboardType="numeric"
          value={interestRate.toString()}
          style={styles.input}
          onChangeText={setInterestRate}
          caption={interestRateError}
        />
        <Layout style={styles.periodContainer}>
          <Input
            label={getInput3Label()}
            // label={evaProps => (
            //   <Text {...evaProps} style={{color: 'red'}}>
            //     Label
            //   </Text>
            // )}
            placeholder={placeholder3Label()}
            keyboardType="numeric"
            value={tenure.toString()}
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
        <Layout style={styles.selectContainer}>
          <Select
            selectedIndex={selectedIndex}
            label={STRINGS.FREQUENCY}
            status="primary"
            size="medium"
            value={COMPOUNDING_OPTIONS[selectedIndex - 1]}
            onSelect={index => setSelectedIndex(index)}>
            {COMPOUNDING_OPTIONS.map((option: string, index: number) => (
              <SelectItem title={option} key={index} />
            ))}
          </Select>
        </Layout>
      </Layout>

      <EmiFooter
        containerStyle={styles.footerContainer}
        leftButtonVisible={false}
        onResetPress={reset}
        onCalculatePress={calculateValue}
      />
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
  selectContainer: {
    // minHeight: 128,
    marginTop: 10,
    minWidth: 350,
  },
  calendarContainer: {
    position: 'absolute',
  },
  footerContainer: {marginHorizontal: 8},
});

export default FdCalculator;
