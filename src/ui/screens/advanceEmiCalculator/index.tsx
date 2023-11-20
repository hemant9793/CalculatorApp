import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  Input,
  useStyleSheet,
  useTheme,
  Radio,
  Button,
  Icon,
} from '@ui-kitten/components';
import {Chips} from '../components';

// import {STRINGS} from './strings';
import {
  calculateAmortizationSchedule,
  calculateEMI,
  calculateEmiWitInterestRateChanges,
  calculatePrincipal,
  calculateVariableInterestRateData,
  roundNumber,
} from '../helpers/formulas';
import {
  AppScreenProps,
  BannerAdSizeEnum,
  GlobalInterestRateChanges,
} from '@src/types';
import EmiFooter from '@src/ui/screens/components/emiFooter';
import {SCREEN_NAMES} from '@src/ui/screens/emiCalculator/emiscreendata';
import {numberWithCommas} from '@src/ui/utils/helperUtils';
import {STRINGS} from './strings';
import {useFocusEffect} from '@react-navigation/native';
import {GLOBAL_CONSTANTS} from '@src/constants';
import {Advert} from '@src/ui/screens/components/ads';
import {formatRateRange} from '@src/ui/screens/variableHomeLoanEmiCalculator/helpers';
import {showToast} from '@src/ui/screens/components/toast';
import StringUtils from '@src/ui/utils/stringUtils';

const HEADER_CHIPS = ['EMI in Arrears', 'EMI in Advance'];
const MONTH_OR_YEARS = ['Years', 'Months'];
const INTEREST_RATE = ['Reducing', 'Flat'];
const PROCESSING_CHIPS = ['%', '₹'];
const WIDTH = Dimensions.get('screen').width;

const AdvanceEmiCalculator: React.FC<
  AppScreenProps<'AdvanceEmiCalculator'>
> = ({route, navigation}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [processingFee, setProcessingFee] = useState('');
  const [gstOnInterest, setgstOnInterest] = useState('');

  const [selectEmiType, setSelectEmiType] = useState('EMI in Arrears');
  const [selectedMOrY, setselectedMOrY] = useState('Years');
  const [selectReducingOrFlat, setSelectReducingOrFlat] = useState('Reducing');
  const [selectedRsOrPercentage, setSelectedRsOrPercentage] = useState('%');
  const [processingFeeEnabled, setProcessingFeeEnabled] = useState(false);
  const [gstOnInterestEnabled, setgstOnInterestEnabled] = useState(false);
  const [principalError, setPrincipalError] = useState('');
  const [interestRateError, setInterestRateError] = useState('');
  const [tenureError, setTenureError] = useState('');
  const [processingFeeError, setProcessingFeeError] = useState('');
  const [emiError, setEmiError] = useState('');

  const [interestRateChanges, setInterestRateChanges] = useState<
    GlobalInterestRateChanges[]
  >([]);

  const checkAndSetErrors = () => {
    let hasErrors = false;

    if (isNaN(parseFloat(principal))) {
      hasErrors = true;
      setPrincipalError(STRINGS.PRINCIPAL_ERROR);
    }
    if (isNaN(parseFloat(interestRate) / 100 / 12)) {
      hasErrors = true;

      setInterestRateError(STRINGS.INTEREST_RATE_ERROR);
    }
    if (isNaN(parseFloat(tenure) * 12)) {
      hasErrors = true;
      setTenureError(STRINGS.LOAN_TENURE_ERROR);
    }
    console.log('checkAndSetErrors -> processingFee', processingFee);
    if (!processingFee && processingFeeEnabled) {
      hasErrors = true;
      setProcessingFeeError(STRINGS.PROCESSING_FEE_ERROR);
    }
    return hasErrors;
  };

  const clearError = () => {
    setPrincipalError('');
    setInterestRateError('');
    setTenureError('');
  };

  const checkValAndCalcEmi = (
    principalAmount: number,
    monthlyInterestRate: number,
    loanTenureMonths: number,
  ) => {
    let emiValue;

    // Calculate EMI
    emiValue = calculateEMI(
      principalAmount,
      monthlyInterestRate,
      loanTenureMonths,
      // name == 'Flat Rate EMI' ? 'Flat' : 'Reducing',
      selectReducingOrFlat,
    );

    navigation.navigate('AdvanceDetailScreen', {
      emi: roundNumber(emiValue) ?? 0,
      loanamount: parseFloat(principal) ?? 0,
      interest: parseFloat(interestRate),
      period: loanTenureMonths,
      isPeriodInMonths: selectedMOrY === 'Months',
      totalInterest: roundNumber(
        roundNumber(emiValue) * loanTenureMonths - parseFloat(principal),
      ),
      amortizationSchedule: calculateAmortizationSchedule(
        parseFloat(principal),
        monthlyInterestRate,
        loanTenureMonths,
        emiValue,
      ),
    });
  };

  const getProcessingfee = (input: string, inputPrincipal: number) => {
    if (selectedRsOrPercentage == '%') {
      const percent = parseFloat(input);
      return (inputPrincipal * percent) / 100;
    } else {
      return parseFloat(input);
    }
  };

  const calculateValue = () => {
    const principalAmount = parseFloat(principal);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const loanTenureMonths =
      selectedMOrY == 'Years' ? parseFloat(tenure) * 12 : parseFloat(tenure); // Loan tenure in months
    console.log('loanTenureMonths', loanTenureMonths);
    if (checkAndSetErrors()) {
      return;
    }
    if (parseFloat(interestRate) >= 100) {
      showToast({
        text1: 'Please entere interest rate below 100%',
        type: 'error',
      });
      return;
    }
    if (!GLOBAL_CONSTANTS.interestRateChanges.length) {
      checkValAndCalcEmi(
        principalAmount,
        monthlyInterestRate,
        loanTenureMonths,
      );
    } else if (GLOBAL_CONSTANTS.interestRateChanges.length) {
      const calculatedData = calculateVariableInterestRateData(
        principalAmount,
        monthlyInterestRate,
        loanTenureMonths,
        selectReducingOrFlat,
      );
      navigation.navigate('AdvanceDetailScreen', {
        emi: calculatedData?.emi ?? 0,
        loanamount: parseFloat(principal) ?? 0,
        interest: parseFloat(interestRate),
        period: loanTenureMonths,
        isPeriodInMonths: selectedMOrY === 'Months',
        interestChange: roundNumber(
          calculatedData.totalNewInterest - calculatedData.totalOldInterest,
        ),
        newTenure: calculatedData.newTenure,
        processingfee: processingFee
          ? getProcessingfee(processingFee, parseFloat(principal))
          : 0,
        oldTenure: loanTenureMonths,
        amortizationSchedule: calculatedData?.monthlyData,
        totalNewInterest: calculatedData?.totalNewInterest,
        totalOldInterest: calculatedData?.totalOldInterest,
        interestChangeString: formatRateRange(
          GLOBAL_CONSTANTS.interestRateChanges,
          parseFloat(interestRate),
        ),
      });
    }
  };

  const reset = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setProcessingFee('');
    clearError();
    setEmiError('');
    setProcessingFeeError('');
    clearInterestChanges();
  };

  const clearInterestChanges = () => {
    if (GLOBAL_CONSTANTS.interestRateChanges.length) {
      setInterestRateChanges([]);
    }
  };

  const onChipPress = (chip: string) => {
    setSelectEmiType(chip);
    reset();
  };

  const onMOrYChipPress = (chip: string) => {
    setselectedMOrY(chip);
  };
  const onInterestRateChipPress = (chip: string) => {
    setSelectReducingOrFlat(chip);
  };
  const onProcessingFeeChipPress = (chip: string) => {
    setSelectedRsOrPercentage(chip);
  };
  const onEmiArrearAdvanceChipPress = (chip: string) => {
    setSelectEmiType(chip);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Advance EMI Calculator' ?? '',
    });
  }, [navigation]);

  useFocusEffect(() => {
    if (GLOBAL_CONSTANTS.interestRateChanges.length) {
      setInterestRateChanges(GLOBAL_CONSTANTS.interestRateChanges);
    }
  });

  return (
    <Layout style={kittenStyle.container}>
      {/* <Chips
        chipData={HEADER_CHIPS}
        selectedChip={selectEmiType}
        onChipPress={onEmiArrearAdvanceChipPress}
      /> */}
      <Layout style={[styles.inputContainer, styles.card]}>
        <Input
          label={STRINGS.PRINCIPAL_AMOUNT_LABEL}
          placeholder={STRINGS.PRINCIPAL_AMOUNT_PLACEHOLDER}
          keyboardType="numeric"
          value={principal}
          style={styles.input}
          onChangeText={(text: string) => {
            console.log('text', text);

            setPrincipal(StringUtils.cleanString(text));
            setPrincipalError('');
          }}
          caption={principalError}
        />

        <Layout style={[styles.periodContainer, kittenStyle.whiteBackGround]}>
          <Input
            label={STRINGS.INTEREST_RATE_LABEL}
            placeholder={STRINGS.INTEREST_RATE_PLACEHOLDER}
            keyboardType="numeric"
            value={interestRate}
            style={{...styles.input, flex: 1}}
            onChangeText={(text: string) => {
              const hasOnlyZeroOrOneDot = StringUtils.hasOnlyZeroOrOneDot(text);
              if (!hasOnlyZeroOrOneDot && text[text.length - 1] == '.') {
                return;
              }
              setInterestRate(StringUtils.cleanStringExceptDot(text));
              setInterestRateError('');
            }}
            caption={interestRateError}
            accessoryRight={() => {
              return <Text>%</Text>;
            }}
          />
          <Chips
            chipData={INTEREST_RATE}
            selectedChip={selectReducingOrFlat}
            containerStyle={{
              ...styles.mOrYChipContainer,
              ...kittenStyle.whiteBackGround,
              ...(interestRateError ? {marginBottom: 20} : {marginBottom: 5}),
            }}
            onChipPress={onInterestRateChipPress}
          />
        </Layout>

        <Layout style={[styles.periodContainer, kittenStyle.whiteBackGround]}>
          <Input
            label={STRINGS.LOAN_TENURE_LABEL}
            placeholder={STRINGS.LOAN_TENURE_PLACEHOLDER}
            keyboardType="numeric"
            value={tenure}
            style={{...styles.input, flex: 1}}
            onChangeText={(text: string) => {
              setTenure(StringUtils.cleanString(text));
              setTenureError('');
            }}
            caption={tenureError}
          />
          <Chips
            chipData={MONTH_OR_YEARS}
            selectedChip={selectedMOrY}
            containerStyle={{
              ...styles.mOrYChipContainer,
              ...kittenStyle.whiteBackGround,
              ...(tenureError ? {marginBottom: 20} : {marginBottom: 5}),
            }}
            onChipPress={onMOrYChipPress}
          />
        </Layout>
        <Layout
          style={[styles.processingContainer, kittenStyle.whiteBackGround]}>
          <Input
            label={STRINGS.PROCESSING_FEE}
            placeholder={STRINGS.PROCESSING_FEE_PLACEHOLDER}
            keyboardType="numeric"
            value={processingFee}
            style={{...styles.input, flex: 1}}
            onChangeText={(text: string) => {
              setProcessingFee(text);
              setProcessingFeeError('');
            }}
            disabled={!processingFeeEnabled}
            caption={processingFeeError}
          />
          <Chips
            chipData={PROCESSING_CHIPS}
            selectedChip={selectedRsOrPercentage}
            containerStyle={{
              ...styles.mOrYChipContainer,
              ...kittenStyle.whiteBackGround,
              ...(processingFeeError ? {marginBottom: 20} : {marginBottom: 5}),
            }}
            onChipPress={onProcessingFeeChipPress}
          />
          <Radio
            checked={processingFeeEnabled}
            style={{
              ...{marginHorizontal: 8},
              ...(processingFeeError ? {marginBottom: 26} : {marginBottom: 12}),
            }}
            onChange={nextChecked => setProcessingFeeEnabled(nextChecked)}>
            {''}
          </Radio>
        </Layout>
        {/* <Layout
          style={[styles.gstInterestContainer, kittenStyle.whiteBackGround]}>
          <Input
            label={STRINGS.GST_ON_INTEREST}
            placeholder={STRINGS.GST_ON_INTEREST_PLACEHOLDER}
            keyboardType="numeric"
            value={gstOnInterest}
            style={{...styles.input, flex: 1}}
            onChangeText={(text: string) => {
              console.log('text', text);
              setgstOnInterest(text);
              setPrincipalError('');
            }}
            caption={principalError}
            disabled={!gstOnInterestEnabled}
            accessoryRight={() => {
              return <Text>%</Text>;
            }}
          />
          <Radio
            checked={gstOnInterestEnabled}
            style={{
              ...{marginHorizontal: 8},
              ...(tenureError ? {marginBottom: 20} : {marginBottom: 12}),
            }}
            onChange={nextChecked => setgstOnInterestEnabled(nextChecked)}>
            {''}
          </Radio>
        </Layout> */}
        {interestRateChanges.length > 0 && interestRateChanges[0].month && (
          <Layout style={styles.interestChangeContainer}>
            <Layout style={kittenStyle.headerRow}>
              <Text style={styles.headerText} appearance="alternative">
                Revised Interest
              </Text>
              <Text style={styles.headerText} appearance="alternative">
                From Month
              </Text>
            </Layout>
            {interestRateChanges.map((change, index) => (
              <Layout
                key={index}
                style={[
                  styles.changeRow,
                  index == interestRateChanges.length - 1 &&
                    styles.lastItemContainer,
                ]}>
                <Layout style={styles.rateContainer}>
                  <Text style={styles.rateText}>{`${change?.rate}%`}</Text>
                </Layout>
                <Layout style={styles.monthContainer}>
                  <Text style={styles.monthText}>{change?.month}</Text>
                </Layout>
              </Layout>
            ))}
          </Layout>
        )}

        <TouchableOpacity
          style={kittenStyle.calendarContainer}
          onPress={() => {
            navigation.navigate('InterestRateChanges');
          }}>
          <Layout style={styles.investDate}>
            <Text style={kittenStyle.investmentTitleTextStyle}>
              {'Enter Interest rate changes'}
            </Text>
          </Layout>
          <Layout style={styles.iconContainer}>
            <Icon name="chevron-right-outline" style={styles.icon} />
          </Layout>
        </TouchableOpacity>
      </Layout>

      <EmiFooter onResetPress={reset} onCalculatePress={calculateValue} />
      <Advert BannerSize={BannerAdSizeEnum.LARGE_BANNER} />
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
  whiteBackGround: {
    backgroundColor: 'color-basic-500',
  },
  captionStyle: {color: 'red', fontSize: 12},
  investmentTitleTextStyle: {
    paddingVertical: 8.5,
    paddingHorizontal: 13,
    textAlign: 'left',
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'color-basic-300',
    minWidth: WIDTH * 0.9,
    marginTop: 14,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'color-basic-400',
    // flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'color-primary-500',
    padding: 8,
    paddingHorizontal: 40,
    borderRadius: 5,
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
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  gstInterestContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  interestRateChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 5,
  },
  interestChangeContainer: {
    marginTop: 5,
    borderRadius: 5,
    padding: 0,
    minWidth: WIDTH * 0.9,
  },
  lastItemContainer: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  enterInterestTextStyle: {
    flex: 1,
    paddingLeft: 22,
  },
  mOrYChipContainer: {
    height: 36,
    marginLeft: 10,
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
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
  icon: {height: 25, width: 25},
  iconContainer: {
    flex: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 58,
  },
  investDate: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  rateContainer: {
    flex: 1,
    alignItems: 'center',
  },
  monthContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rateText: {
    fontSize: 16,
  },
  monthText: {
    fontSize: 16,
  },
});

export default AdvanceEmiCalculator;
