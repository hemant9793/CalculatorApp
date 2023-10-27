/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {RootNavigator} from '@src/ui/navigation';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {default as theme} from '../theme.json';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <IconRegistry icons={EvaIconsPack} />
      <RootNavigator />
      <StatusBar backgroundColor={theme['color-primary-400']} />
    </ApplicationProvider>
  );
};

export default App;
