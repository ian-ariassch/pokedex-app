import React, { useState, useEffect } from 'react';
import { SearchTermContext } from './src/contexts/SearchTerm';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeScreen from './src/pages/HomeScreen';
import PokemonDetails from './src/pages/PokemonDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/utils/theme';
import * as Font from 'expo-font';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

const fetchFonts = async () => {
  await Font.loadAsync({
    'PokemonClassic': require('./assets/fonts/PokemonClassic.ttf'),
  });
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    fetchFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return(
      <Provider theme={theme}>
        <ThemeProvider theme={theme}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
              </Stack.Navigator>
            </SearchTermContext.Provider>
          </QueryClientProvider>
        </NavigationContainer>
        </ThemeProvider>
      </Provider>
  )
}