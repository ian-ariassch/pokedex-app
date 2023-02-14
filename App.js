import React, { useState } from 'react';
import CardCatalog from './src/components/Catalog';
import Header from './src/components/Header';
import styled from 'styled-components/native';
import { SearchTermContext } from './src/contexts/SearchTerm';
import { ScrollView } from 'react-native';
import { QueryClient, QueryClientProvider, ReactQueryDevtools } from 'react-query';

const HeaderContainer = styled.View`
  z-index: 10;
`

const queryClient = new QueryClient();


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return(
    <QueryClientProvider client={queryClient}>
    <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
      <HeaderContainer>
        <Header/>
      </HeaderContainer>
      <ScrollView>
        <CardCatalog/>
      </ScrollView>
    </SearchTermContext.Provider>
    </QueryClientProvider>
  )
}
