/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {MaterialCommunityIcons} from 'react-native-vector-icons';

const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E32CD',
    onPrimary: '#fff',
    secondary: '#2E32CD',
    primaryContainer: '2E32CD',
    secondaryContainer: '#FADADD',
    onSurface: '#181616',
  },
  mode: 'exact',
};

export default function Main() {
  return (
    <PaperProvider
      theme={{
        ...theme,
        icons: {
          ...MaterialCommunityIcons,
        },
      }}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
