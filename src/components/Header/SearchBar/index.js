import React, { useContext } from "react"
import styled from "styled-components/native"
import { SearchTermContext } from "../../../contexts/SearchTerm"
import { connectSearchBox } from "react-instantsearch-native"
import { IconButton } from "react-native-paper"

const StyledSearchBar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 20px;
  padding: 10px;
  width: 95%;
  height: 40px;
  border-width: 2px;
  margin-top: 30px;
`

const StyledTextInput = styled.TextInput`
  width: 90%;
  height: 100%;
  margin-top: 3px;
`

const SearchBar = ({ currentRefinement, refine }) => {
  const { setSearchTerm } = useContext(SearchTermContext)

  const handleChange = (text) => {
    setSearchTerm(text)
  }

  return (
    <StyledSearchBar>
      <StyledTextInput
        placeholder="Pokemon Name"
        value={currentRefinement}
        onChangeText={(value) => {
          refine(value)
          handleChange(value)
        }}
      />
      <IconButton
        icon="close"
        onPress={() => {
          refine("")
          handleChange("")
        }}
      />
    </StyledSearchBar>
  )
}

export default connectSearchBox(SearchBar)
