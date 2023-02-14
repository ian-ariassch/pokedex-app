import { Button } from '@react-native-material/core';
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const navigateToHome = (navigation) => {
    navigation.navigate('Home')
}

const MainPageContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    width: 100%;
    height: 100%;
`

const MainImageContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70%;
`

const MainImage = styled.Image`
    width: 100%;
    height: 100%;
    max-width: 250px;
    max-height: 250px;
`

const PokemonNameContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  background-color: #E65451;
`

const PokemonName = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 30px;
`

const MainDetailsContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 30%;
    margin: 10px;
    margin-top: 20px;
    background-color: #F6E8BE;
    overflow: hidden;
    border-radius: 10px;
`

{/* <StyledView>
<View>
    <Text>{route.params.name}</Text>
</View>

</StyledView> */}

export default function PokemonDetails({route, navigation})
{
    return (
        <MainPageContainer>
            <MainDetailsContainer>
                <MainImageContainer>
                    <MainImage source={{ uri: route.params.image }} />
                </MainImageContainer>
                <PokemonNameContainer>
                    <PokemonName>{route.params.name}</PokemonName>
                </PokemonNameContainer>
            </MainDetailsContainer>
            <Button onPress={() => navigateToHome(navigation)} title="Go back"/>
        </MainPageContainer>
    )
}