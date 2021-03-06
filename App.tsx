import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold, useFonts
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './src/contexts/AuthContext';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <StatusBar style={"light"} />
          <AuthProvider>
            <Routes />
          </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
