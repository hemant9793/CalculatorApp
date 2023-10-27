import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ViewStyle} from 'react-native';

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
  isBankingDetails?: boolean;
  maturityValue?: number;
  investmentAmount?: number;
  totalInterest?: number;
  investmentDate?: string;
  maturityDate?: string;
};

export type AppStackParamList = {
  HomeScreen: undefined;
  EmiCalculator: undefined;
  AmountToWordsScreen: undefined;
  MoneyTotallerScreen: undefined;
  FdCalculator: {
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
  DetailScreen: CommonScreenProps;
  InDepthDetailScreen: CommonScreenProps;
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
  value1: number;
  title2: string;
  value2: number;
};
