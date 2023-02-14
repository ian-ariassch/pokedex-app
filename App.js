import React, { useState } from 'react';
import { SearchTermContext } from './src/contexts/SearchTerm';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeScreen from './src/pages/HomeScreen';
import PokemonDetails from './src/pages/PokemonDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return(
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
  )
}
