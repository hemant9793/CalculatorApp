import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {Button, Layout, useTheme} from '@ui-kitten/components';
import {AppScreenProps} from '@src/types';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

import HorizontalInfo from '../components/horizontalInfo';
import AmortizationSchedule from '../components/monthlyDetails';
import Export from '@src/assets/svg/export.svg';

import {createHtmlContent} from '@src/ui/screens/indepthsetailscreen/helpers';
import {showToast} from '@src/ui/screens/components/toast';
import OptionModal from '@src/ui/screens/components/modal';
import {
  copyToClipboard,
  monthsToYearsAndMonths,
} from '@src/ui/utils/helperUtils';
import {STRINGS} from '@src/ui/screens/advanceIndepthsetailscreen/strings';
import {captureRef} from 'react-native-view-shot';
import BottomSheet from '@src/ui/screens/components/bottomSheet';

const AdvanceInDepthDetailScreen: React.FC<
  AppScreenProps<'AdvanceInDepthDetailScreen'>
> = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);

  const {
    emi = 0,
    interest = 0,
    loanamount: loanAmount = 0,
    period = 0,
    totalInterest = 0,
    amortizationSchedule = [],
    interestChange = 0,
    newTenure = 0,
    oldTenure = 0,
    totalNewInterest = 0,
    isPeriodInMonths,
    totalOldInterest = 0,
    interestChangeString = '',
  } = route.params;
  console.log(route.params);

  const getInterestTitle = (changedInterest?: number) => {
    return changedInterest && changedInterest > 0
      ? STRINGS.INTEREST_INCREASED_BY
      : STRINGS.INTEREST_DECREASED_BY;
  };

  // Dummy data for HorizontalInfo components
  const emiData = [
    {title: 'Emi', value: `₹ ${emi.toString()}`},
    ...(!interestChangeString
      ? [
          {title: 'Interest', value: `${interest.toString()} %`},
          {title: 'Loan Amount', value: loanAmount.toString()},
          {
            title: 'Period',
            value: isPeriodInMonths
              ? `${period} Months`
              : `${(period ?? 0) / 12} Years`,
          },
        ]
      : []),
    ...(interestChangeString
      ? [
          {title: 'Total New Interest', value: `₹ ${totalNewInterest}`},
          {title: 'Total Old Interest', value: `₹ ${totalOldInterest}`},
          {title: 'Interest Rate Changes', value: interestChangeString},
          {
            title: STRINGS.NEW_TENURE,
            value: monthsToYearsAndMonths(newTenure ?? 0),
          },
          {
            title: STRINGS.OLD_TENURE,
            value: monthsToYearsAndMonths(oldTenure ?? 0),
          },
          {
            title: getInterestTitle(interestChange),
            value: `₹ ${interestChange}`,
          },
        ]
      : []),
    {
      title: 'Total Payment',
      value:
        '₹' +
        (
          (totalNewInterest ? totalNewInterest : totalInterest) + loanAmount
        ).toFixed(2),
    },
  ];

  const printOrGeneratePDF = async (printPDF?: boolean, htmlData?: string) => {
    const htmlContent1 = createHtmlContent(emiData, amortizationSchedule);
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
            setbottomSheetVisible(true);
          }}
          style={{marginTop: 5}}>
          <Export width={18} height={18} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const viewRef = useRef();

  const [bottomSheetVisible, setbottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setbottomSheetVisible(!bottomSheetVisible);
  };

  const [loaded, setLoaded] = useState(false);
  const adUnitId = __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  React.useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('addloaded :>> ');
        setLoaded(true);
      },
    );
    const unsubscribeAdClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setVisible(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeAdClosed();
    };
  }, []);

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
    <ScrollView ref={viewRef} style={styles.outerContainer}>
      {emiData.map((screenDataItem, index) => (
        <HorizontalInfo
          key={index}
          title={screenDataItem.title}
          value={screenDataItem.value}
          isHorizontal={true}
          showDivider={index < emiData.length - 1}
          titleTextStyle={{fontWeight: '700'}}
        />
      ))}
      <AmortizationSchedule
        schedule={amortizationSchedule}
        oldTenureInMonths={oldTenure}
      />
      <OptionModal
        visible={visible}
        // modalTitle="Export"
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
      <BottomSheet
        onClose={() => {
          setbottomSheetVisible(false);
        }}
        watchAd={() => {
          if (loaded) {
            rewarded.show();
            setbottomSheetVisible(false);
          }
        }}
        purchaseAdFree={() => {
          setbottomSheetVisible(false);
        }}
        visible={bottomSheetVisible}
      />
      <Button
        status="primary"
        onPress={async () => {
          toggleBottomSheet();
          // const result = await checkStoragePermission();
          // console.log('result', result);
          // if (!result) {
          //   askForStoragePermission();
          // }
          // captureScreenshot();
        }}>
        {'rightTitle'}
      </Button>
    </ScrollView>
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

export default AdvanceInDepthDetailScreen;
