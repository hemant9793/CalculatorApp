import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SetStateAction} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {RewardedAd} from 'react-native-google-mobile-ads';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  App: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> = {
  route: RouteProp<RootStackParamList, T>;
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = {
  route: RouteProp<AuthStackParamList, T>;
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, T>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

export type CommonScreenProps = {
  selectedChip?: string;
  emi?: number;
  loanamount?: number; //done to use routeparams as key to find title value
  interest?: number;
  period?: number;
  isPeriodInMonths?: boolean;
  isBankingDetails?: boolean;
  maturityValue?: number;
  investmentAmount?: number;
  totalInterest?: number;
  investmentDate?: string;
  maturityDate?: string;
  extraData?: advanceEmiData;
};

export type advanceEmiData = {
  interestChange?: number;
  newTenure?: number;
  oldTenure?: number;
  amortizationSchedule?: any[];
};

export type AdvanceCommonScreenProps = {
  emi?: number;
  loanamount?: number;
  interest?: number;
  period?: number;
  totalInterest?: number;
  interestChange?: number;
  interestChangeString?: string;
  totalNewInterest?: number;
  processingfee?: number;
  newTenure?: number;
  oldTenure?: number;
  amortizationSchedule?: any[];
  isPeriodInMonths?: boolean;
  maturityValue?: number;
  totalOldInterest?: number;
};

export type VariableScreenParams = {
  screenTitle: string;
  name: string;
  input1Label: string;
  input1Placeholder: string;
  input2Label: string;
  input2Placeholder: string;
  input3Label: string;
  input3Placeholder: string;
  input4Label: string;
  input4Placeholder: string;
  input5Label: string;
  input5Placeholder: string;
};

export type AppStackParamList = {
  Calculators: undefined;
  EmiCalculator: VariableScreenParams;
  AdvanceEmiCalculator: undefined;
  VariableInterestHomeLoanCalculator: undefined;
  AmountToWordsScreen: undefined;
  InterestRateChanges: undefined;
  MoneyTotallerScreen: undefined;
  FdCalculator: VariableScreenParams;
  DetailScreen: CommonScreenProps;
  InDepthDetailScreen: CommonScreenProps;
  AdvanceDetailScreen: AdvanceCommonScreenProps;
  AdvanceInDepthDetailScreen: AdvanceCommonScreenProps;
  CompareLoansScreen: undefined;
  LoanComparisonDetails: {
    principalAmount: number;
    monthlyInterestRate: number;
    loanTenureMonths: number;
    emi1: number;
    principalAmount2: number;
    monthlyInterestRate2: number;
    loanTenureMonths2: number;
    emi2: number;
  };
};

export type AppScreenProps<T extends keyof AppStackParamList> = {
  route: RouteProp<AppStackParamList, T>;
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AppStackParamList, T>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

export type HomeScreenSectionData = {
  title: string;
  data: Array<{
    key: string;
    screen: string;
    icon: string;
  }>;
};

export type ChipsProps = {
  chipData: string[];
  selectedChip: string;
  containerStyle?: ViewStyle;
  onChipPress: (chip: string) => void;
};

export type EmitFooter = {
  containerStyle?: ViewStyle;
  rightTitle?: string;
  leftTitle?: string;
  rightButtonVisible?: boolean;
  leftButtonVisible?: boolean;
  onResetPress: () => void;
  onCalculatePress: () => void;
};

export type HorizontalInfoProps = {
  title: string;
  value: string;
  showDivider: boolean;
  isHorizontal?: boolean;
  textContainerStyle?: ViewStyle;
  titleTextStyle?: TextStyle;
  horizontalTitleCategory?: string;
};

export type PieChartProps = {
  data: any[];
  width: number;
  height: number;
  chartConfig: Object;
  accessor: string;
};

export type LoanComparisonCardProps = {
  cardTitle: string;
  title1: string;
  value1: string;
  title2: string;
  value2: string;
};
export type GlobalConstants = {
  interestRateChanges: GlobalInterestRateChanges[];
};

export type GlobalInterestRateChanges = {month: string; rate: string};

export type Ads = {
  adType?: AdType;
  containerStyle?: ViewStyle;
  BannerSize?: BannerAdSizeEnum | string;
};

export enum AdType {
  BANNER = 'BANNER',
  INTERSTITIAL = 'INTERSTITIAL',
  REWARDED = 'REWARDED',
}

export enum BannerAdSizeEnum {
  BANNER = 'BANNER',
  FULL_BANNER = 'FULL_BANNER',
  LARGE_BANNER = 'LARGE_BANNER',
  LEADERBOARD = 'LEADERBOARD',
  MEDIUM_RECTANGLE = 'MEDIUM_RECTANGLE',
  ADAPTIVE_BANNER = 'ADAPTIVE_BANNER', // Deprecated, use `ANCHORED_ADAPTIVE_BANNER` instead.
  ANCHORED_ADAPTIVE_BANNER = 'ANCHORED_ADAPTIVE_BANNER',
  INLINE_ADAPTIVE_BANNER = 'INLINE_ADAPTIVE_BANNER',
  WIDE_SKYSCRAPER = 'WIDE_SKYSCRAPER',
}
