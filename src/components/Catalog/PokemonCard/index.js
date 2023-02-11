import React from 'react';
import styled from 'styled-components/native';
import { View, Image, Text } from 'react-native';

const CardContainer = styled.View`
  width: 100px;
  height: 120px;
  align-items: center;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  flex-grow: 1;
  background-color: #F6E8BE;
  margin: 5px;
`

const PokemonImageContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`

const PokemonImage = styled.Image`
  width: 100%;
  height: 100%;
  max-width: 290px;
`

const PokemonNameContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: #E65451;
`

const PokemonName = styled.Text`
  text-align: center;
  font-weight: bold;
`

export default function PokemonCard(props) {
  return (
    <CardContainer>

      <PokemonImageContainer>
        <PokemonImage source={{ uri: props.image }} />
      </PokemonImageContainer>

      <PokemonNameContainer>
        <PokemonName adjustsFontSizeToFit>{props.name}</PokemonName>
      </PokemonNameContainer>

    </CardContainer>
  );
}
