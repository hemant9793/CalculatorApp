import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {default as theme} from 'theme.json'; // <-- Import app theme

import {RootStackParamList} from '@src/types';

// Global Constants
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <ApplicationProvider {...eva} theme={{...theme}}>
      <NavigationContainer>
        <Text>Calc App</Text>
      </NavigationContainer>
    </ApplicationProvider>
  );
};
