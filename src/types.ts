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
  selectedChip: string;
  emi?: number;
  loanamount: number; //done to use routeparams as key to find title value
  interest: number;
  period: number;
};

export type AppStackParamList = {
  HomeScreen: undefined;
  EmiCalculator: undefined;
  DetailScreen: CommonScreenProps;
  InDepthDetailScreen: CommonScreenProps;
};

export type AppScreenProps<T extends keyof AppStackParamList> = {
  route: RouteProp<AppStackParamList, T>;
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AppStackParamList, T>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

export type ChipsProps = {
  chipData: string[];
  selectedChip: string;
  containerStyle?: ViewStyle;
  onChipPress: (chip: string) => void;
};

export type EmitFooter = {
  onResetPress: () => void;
  onCalculatePress: () => void;
};

export type HorizontalInfoProps = {
  title: string;
  value: string;
  showDivider: boolean;
};

export type PieChartProps = {
  data: any[];
  width: number;
  height: number;
  chartConfig: Object;
  accessor: string;
};
