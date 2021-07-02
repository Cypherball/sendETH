import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import colors from './config/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import Home from './screens/Home';

const theme = {
  ...PaperDarkTheme,
  dark: true,
  mode: 'adaptive',
  colors: {
    ...PaperDarkTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.primary_dark,
    surface: colors.surface,
    text: colors.text,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.status_bar}
        />
        <Home />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
