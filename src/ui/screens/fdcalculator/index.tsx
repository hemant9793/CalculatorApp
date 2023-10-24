import React, {useState} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
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
} from '@ui-kitten/components';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

import {STRINGS} from './strings';

import {Chips} from '../components';
import {
  calculateFDMaturityAmount,
  calculateRDMaturity,
  roundNumber,
} from '../helpers/formulas';
import {AppScreenProps} from '@src/types';
import EmiFooter from '../components/emiFooter';
import {SCREEN_NAMES} from '@src/ui/screendata/screendata';

const MONTH_OR_YEARS = ['Years', 'Months'];
const COMPOUNDING_OPTIONS = [
  'Compounded Yearly',
  'Compounded Half Yearly',
  'Compounded Quarterly',
  'Compounded Monthly',
  'Simple Interest',
];

const WIDTH = Dimensions.get('screen').width;
const ALL_MONTHS = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

const FdCalculator: React.FC<AppScreenProps<'FdCalculator'>> = ({
  route,
  navigation,
}) => {
  console.log('route==>', route);
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();
  const themedBackground = {backgroundColor: theme['color-basic-500']};
  const {
    screenTitle,
    input1Label,
    input1Placeholder,
    input2Label,
    input2Placeholder,
    input3Label,
    input3Placeholder,
    input4Label,
    input4Placeholder,
    input5Label,
    input5Placeholder,
  } = route?.params;

  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [selectedMOrY, setselectedMOrY] = useState('Years');
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  const [principalError, setPrincipalError] = useState('');
  const [interestRateError, setInterestRateError] = useState('');
  const [tenureError, setTenureError] = useState('');

  const [date, setDate] = useState(new Date(Date.now()));

  const onChange = (event: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  function formatDateToCustomFormat(selectedDate: any) {
    const dateString = new Date(selectedDate).toLocaleDateString('en-IN');

    const dateParts = dateString.split('/');
    const year = `20${dateParts[2]}`;
    //@ts-ignore
    const month = ALL_MONTHS[dateParts[0]];
    const day = dateParts[1];
    return `${day} ${month} ${year}`;
  }

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
    const loanTenureMonths =
      selectedMOrY == 'Years' ? parseFloat(tenure) * 12 : parseFloat(tenure); // Loan tenure in months
    console.log('loanTenureMonths', loanTenureMonths);
    checkAndSetErrors();
    console.log('calculateValue -> screenTitle', screenTitle);
    if (screenTitle === SCREEN_NAMES.RdCalculator) {
      const {maturedRd, totalInterest} = calculateRDMaturity(
        principalAmount,
        loanTenureMonths,
        parseFloat(interestRate),
      );
      console.log('calculateValue -> maturedRd', maturedRd);
      navigateToScreen(
        roundNumber(principalAmount),
        roundNumber(maturedRd),
        totalInterest,
      );
      return;
    } else if (screenTitle === SCREEN_NAMES.FdCalculator) {
      const maturedFd = calculateFDMaturityAmount(
        principalAmount,
        parseFloat(interestRate),
        loanTenureMonths,
        //@ts-ignore
        COMPOUNDING_OPTIONS[selectedIndex - 1],
      );
      console.log('maturedFd', maturedFd);
      navigateToScreen(
        principalAmount,
        maturedFd,
        roundNumber(maturedFd - principalAmount),
      );
    }
  };

  const reset = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    clearError();
  };

  const onMOrYChipPress = (chip: string) => {
    setselectedMOrY(chip);
  };

  const navigateToScreen = (
    principalAmount: number,
    maturedFd: number,
    totalInterest: number,
  ) => {
    navigation.navigate('InDepthDetailScreen', {
      investmentAmount: roundNumber(principalAmount),
      investmentDate: formatDateToCustomFormat(date),
      maturityDate: '12,12,12',
      maturityValue: roundNumber(maturedFd),
      isBankingDetails: true,
      totalInterest: totalInterest,
    });
  };

  return (
    <Layout style={kittenStyle.container}>
      <Layout style={[styles.inputContainer, styles.card]}>
        <Input
          label={input1Label}
          placeholder={input1Placeholder}
          keyboardType="numeric"
          value={principal.toString()}
          style={styles.input}
          onChangeText={setPrincipal}
          caption={principalError}
        />
        <Input
          label={input2Label}
          placeholder={input2Placeholder}
          keyboardType="numeric"
          value={interestRate.toString()}
          style={styles.input}
          onChangeText={setInterestRate}
          caption={interestRateError}
        />
        {screenTitle !== 'PpfCalculator' && (
          <Layout style={[styles.periodContainer, themedBackground]}>
            <Input
              label={input3Label}
              placeholder={input3Placeholder}
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
                ...{backgroundColor: theme['color-basic-500']},
                ...(tenureError ? {marginBottom: 20} : {marginBottom: 5}),
              }}
              onChipPress={onMOrYChipPress}
            />
          </Layout>
        )}

        {input4Label && (
          <Layout
            style={[
              styles.selectContainer,
              themedBackground,
              {minWidth: WIDTH * 0.835},
            ]}>
            <Select
              selectedIndex={selectedIndex}
              label={input4Label}
              status="primary"
              size="medium"
              //@ts-ignore
              value={COMPOUNDING_OPTIONS[selectedIndex - 1]}
              onSelect={index => setSelectedIndex(index)}>
              {COMPOUNDING_OPTIONS.map((option: string, index: number) => (
                <SelectItem
                  style={themedBackground}
                  title={option}
                  key={index}
                />
              ))}
            </Select>
          </Layout>
        )}
        <Layout style={kittenStyle.calendarContainer}>
          <Layout>
            <Text style={kittenStyle.investmentTitleTextStyle}>
              {input5Label}
            </Text>
          </Layout>
          <TouchableOpacity
            onPress={showDatepicker}
            style={[
              styles.investmentDateContainer,
              {
                borderColor: theme['color-primary-500'],
              },
            ]}>
            <Text category="p1" style={styles.investmentDateTextStyle}>
              {formatDateToCustomFormat(date)}
            </Text>
            <Icon name="arrow-down-outline" style={{height: 20, width: 22}} />
          </TouchableOpacity>
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
  investmentTitleTextStyle: {
    fontWeight: 'bold',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 13,
    textAlign: 'left',
    backgroundColor: 'color-basic-500',
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'color-basic-300',
    minWidth: WIDTH * 0.83,
    marginTop: 14,

    borderRadius: 5,
  },
});

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
    borderWidth: 1.5,
  },
  inputContainer: {
    marginBottom: 8,
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
    marginTop: 10,
  },

  investmentDateTextStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 8,
  },

  investmentDateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
  footerContainer: {marginHorizontal: 8},
});

export default FdCalculator;
