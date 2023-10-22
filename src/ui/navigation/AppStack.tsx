import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from '@src/types';
import {commonNavigationStyles} from './CommonNavigationStyles';
import HomeScreen from '@src/ui/screens/homescreen';
import EmiCalculator from '@src/ui/screens/emiCalculator';
import DetailScreen from '../screens/Details';
import InDepthDetailScreen from '../screens/indepthsetailscreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={commonNavigationStyles}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="EmiCalculator" component={EmiCalculator} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen
        name="InDepthDetailScreen"
        component={InDepthDetailScreen}
      />
    </Stack.Navigator>
  );
}
