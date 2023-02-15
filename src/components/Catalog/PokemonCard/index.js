import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const CardContainer = styled.View`
  width: 100px;
  height: 120px;
  align-items: center;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  border-width: 2px;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.secondary};;
  margin: 5px;
`

const PokemonImageContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`

const PressableEffect = styled.Pressable`
  width: 100%;
  height: 100%;
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
  background-color: ${({ theme }) => theme.colors.primary};
  border-top-color: black;
  border-top-width: 2px;
`

const PokemonName = styled.Text`
  text-align: center;
  font-weight: bold;
`

export default function PokemonCard(props) {

  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate('PokemonDetails', {name: props.name, image: props.image, id: props.id})
  }


  return (
    <CardContainer >
      <PressableEffect onPress={navigateToDetails} android_ripple={{color: 'black', borderless: true}}>
      <PokemonImageContainer>
        <PokemonImage source={{ uri: props.image }} />
      </PokemonImageContainer>

      <PokemonNameContainer >
        <PokemonName>{props.name}</PokemonName>
      </PokemonNameContainer>
      </PressableEffect>
    </CardContainer>
  );
}
