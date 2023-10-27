import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@ui-kitten/components';

import {AppStackParamList} from '@src/types';
import {commonNavigationStyles} from './CommonNavigationStyles';
import HomeScreen from '@src/ui/screens/homescreen';
import EmiCalculator from '@src/ui/screens/emiCalculator';
import DetailScreen from '@src/ui/screens/Details';
import InDepthDetailScreen from '@src/ui/screens/indepthsetailscreen';
import CompareLoansScreen from '@src/ui/screens/compareloan';
import LoanComparisonDetails from '@src/ui/screens/loancomparisondetail';
import FdCalculator from '@src/ui/screens/fdcalculator';
import AmountToWordsScreen from '@src/ui/screens/amounttowords';
import MoneyTotallerScreen from '@src/ui/screens/moneyTotaller';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      //@ts-ignore
      screenOptions={commonNavigationStyles(theme)}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="EmiCalculator"
        component={EmiCalculator}
        options={({route}) => ({title: route.params.name})}
      />
      <Stack.Screen
        name="FdCalculator"
        component={FdCalculator}
        options={({route}) => ({title: route.params.name})}
      />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen
        name="InDepthDetailScreen"
        component={InDepthDetailScreen}
      />
      <Stack.Screen name="CompareLoansScreen" component={CompareLoansScreen} />
      <Stack.Screen
        name="LoanComparisonDetails"
        component={LoanComparisonDetails}
      />
      <Stack.Screen
        name="AmountToWordsScreen"
        component={AmountToWordsScreen}
      />
      <Stack.Screen
        name="MoneyTotallerScreen"
        component={MoneyTotallerScreen}
      />
    </Stack.Navigator>
  );
}
