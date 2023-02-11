import React, { useState } from 'react';
import CardCatalog from './src/components/Catalog';
import Header from './src/components/Header';
import styled from 'styled-components/native';
import { SearchTermContext } from './src/Contexts/SearchTerm';
import { ScrollView } from 'react-native';

const StyledView = styled.View`
  background-color: #A3A3A3;
`

const HeaderContainer = styled.View`
  z-index: 10;
`


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return(
    <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
      <HeaderContainer>
        <Header/>
      </HeaderContainer>
      <ScrollView>
        <CardCatalog/>
      </ScrollView>
    </SearchTermContext.Provider>
  )
}
