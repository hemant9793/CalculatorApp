import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Button, Layout, useTheme} from '@ui-kitten/components';
import {AppScreenProps} from '@src/types';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

import HorizontalInfo from '../components/horizontalInfo';
import {calculatePercentage, roundNumber} from '../helpers/formulas';
import AmortizationSchedule from '../components/monthlyDetails';
import PieChart from '@src/ui/screens/components/piechart';
import Export from '@src/assets/svg/export.svg';

import {createHtmlContent} from '@src/ui/screens/indepthsetailscreen/helpers';
import {showToast} from '@src/ui/screens/components/toast';
import OptionModal from '@src/ui/screens/components/modal';
import {copyToClipboard} from '@src/ui/utils/helperUtils';
import {STRINGS} from '@src/ui/screens/indepthsetailscreen/strings';
import {captureRef} from 'react-native-view-shot';

const InDepthDetailScreen: React.FC<AppScreenProps<'InDepthDetailScreen'>> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const ref = useRef();

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
  ) => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    const schedule = [];

    let balance = principal;
    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPaid = balance * monthlyInterestRate;
      const principalPaid = emi - interestPaid;
      balance -= principalPaid;

      schedule.push({
        month,
        balance: roundNumber(balance <= 0.5 ? 0 : balance),
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

  const printOrGeneratePDF = async (printPDF?: boolean, htmlData?: string) => {
    const htmlContent1 = createHtmlContent(
      emiData,
      calculateAmortizationSchedule(loanAmount, interest, period),
    );
    const options = {
      html: htmlContent1,
      fileName: 'SampleReport', // Name your PDF file
      directory: 'Download',
    };
    if (printPDF) {
      const results = await RNHTMLtoPDF.convert(options);
      await RNPrint.print({filePath: results.filePath ?? ''});
    }

    try {
      const filePath = await RNHTMLtoPDF.convert(options);
      console.log('PDF generated:', filePath);
      showToast({text1: 'PDF generated successfully'});
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast({text1: 'Failed to generate PDF ', type: 'error'});
    }
  };

  const onOptionPress = (option: string) => {
    switch (option) {
      case 'Export as pdf':
        printOrGeneratePDF();
        break;
      case 'Export as image':
        printOrGeneratePDF();
        break;
      case STRINGS.PRINT:
        printOrGeneratePDF(true);
        break;
      case 'Copy and share':
        const formattedText = emiData
          .map(({title, value}) => `${title} - ${value},`)
          .join('\n');
        copyToClipboard(formattedText);
        break;
    }
  };

  const checkStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        console.log('checkStoragePermission -> granted', granted);
        return granted;
      } catch (error) {
        console.error('Error checking storage permission:', error);
        return false;
      }
    } else {
      // For versions lower than Android 6.0 (Marshmallow), permission is granted by default
      return true;
    }
  };

  const askForStoragePermission = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

        {
          title: 'Storage Permission',

          message:
            'This app needs access to your device storage to save screenshots.',

          buttonNeutral: 'Ask Me Later',

          buttonNegative: 'Cancel',

          buttonPositive: 'OK',
        },
      ).then(result => {
        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied.');
        }
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Monthly Emi Details',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          style={{marginTop: 5}}>
          <Export width={18} height={18} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const viewRef = useRef();

  const captureScreenshot = async () => {
    try {
      const screenshotURI = await captureRef(viewRef, {
        format: 'jpg',

        quality: 0.8,
      });
      console.log('Screenshot captured:', screenshotURI);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <Layout ref={viewRef} style={styles.outerContainer}>
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
      {screenData.map((screenDataItem, index) => (
        <HorizontalInfo
          key={index}
          title={screenDataItem.title}
          value={screenDataItem.value}
          isHorizontal={!isBankingDetails}
          showDivider={index < screenData.length - 1}
          titleTextStyle={{fontWeight: '700'}}
        />
      ))}
      {!isBankingDetails && (
        <AmortizationSchedule
          schedule={calculateAmortizationSchedule(loanAmount, interest, period)}
        />
      )}
      <OptionModal
        visible={visible}
        modalTitle="Export"
        strings={[
          STRINGS.EXPORT_PDF,
          STRINGS.EXPORT_IAMGE,
          STRINGS.PRINT,
          STRINGS.COPY_SHARE,
        ]}
        onClose={() => {
          setVisible(false);
        }}
        onSelect={onOptionPress}
      />
      <Button
        status="primary"
        onPress={async () => {
          const result = await checkStoragePermission();
          console.log('result', result);
          if (!result) {
            askForStoragePermission();
          }
          captureScreenshot();
        }}>
        {'rightTitle'}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 10,
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
