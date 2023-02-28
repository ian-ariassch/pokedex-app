import React from "react"
import styled from "styled-components/native"

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
  max-width: 200px;
  max-height: 230px;
`

const PokemonNameContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-top-color: black;
  border-top-width: 3px;
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
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
  border-radius: 10px;
  border-width: 3px;
`

export default function MainDetails(props) {
  return (
    <MainDetailsContainer>
      <MainImageContainer>
        <MainImage
          source={{
            uri: props.image,
          }}
        />
      </MainImageContainer>
      <PokemonNameContainer>
        <PokemonName>{props.name}</PokemonName>
      </PokemonNameContainer>
    </MainDetailsContainer>
  )
}
