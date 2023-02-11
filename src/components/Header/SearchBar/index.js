import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { SearchTermContext } from '../../../Contexts/SearchTerm';

const StyledSearchBar = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    `

const StyledTextInput = styled.TextInput`
    background-color: #fff;
    border-radius: 20px;
    padding: 10px;
    width: 95%;
    height: 40px;
    margin-top: 30px;
`

export default function SearchBar() {
  const {searchTerm, setSearchTerm} = useContext(SearchTermContext);

  const handleChange = (text) => {
    setSearchTerm(text);
  }

  return (
    <StyledSearchBar>
      <StyledTextInput 
        placeholder="Pokemon Name"
        value={searchTerm}
        onChangeText={handleChange}
      />
    </StyledSearchBar>
  );
}