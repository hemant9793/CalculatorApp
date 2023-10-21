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
import {ApplicationProvider, Button} from '@ui-kitten/components';
import {RootNavigator} from '@src/ui/navigation';
import * as eva from '@eva-design/eva';
import {default as theme} from '../theme.json';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <RootNavigator />
    </ApplicationProvider>
  );
};

export default App;
