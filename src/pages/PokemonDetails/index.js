import { Button, IconButton } from "react-native-paper"
import React from "react"
import styled from "styled-components/native"
import MainDetails from "../../components/MainDetails"
import PokemonTypes from "../../components/PokemonTypes"
import { useQuery } from "react-query"
import axios from "axios"
import { useState } from "react"
import Header from "../../components/Header"
import { Text } from "react-native"
import { useTheme } from "react-native-paper"

const navigateToHome = (navigation) => {
  navigation.navigate("Home")
}

const StyledScrollView = styled.ScrollView`
  height: 100%;
  width: 100%;
`

const contentContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",
  padding: 10,
}

const IdContainer = styled.View`
  display: flex;
  width: 20%;
  justify-items: flex-end;
  align-items: flex-start;
`

const BackArrowContainer = styled.View`
  display: flex;
  width: 20%;
  justify-items: flex-end;
  align-items: flex-end;
`

const HeaderContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: 10px;
`

const HeaderNameText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.tertiary};
`

const StyledIdText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.tertiary};
`

const getPokemonData = async (id) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)

  return res.data
}

export default function PokemonDetails({ route, navigation }) {
  const { id, name, image } = route.params

  const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1)

  const [types, setTypes] = useState([])

  const { data, isLoading, error } = useQuery(
    ["pokemonType", id],
    () => getPokemonData(id),
    {
      onSuccess: (data) => {
        const types = data.types.map((type) => {
          return type.type.name
        })
        setTypes(types)
      },
    },
    { staleTime: 10 * 60 * 1000 }
  )

  const theme = useTheme()

  return (
    <>
      <Header>
        <HeaderContent>
          <IdContainer>
            <StyledIdText adjustsFontSizeToFit>#{id}</StyledIdText>
          </IdContainer>
          <HeaderNameText>{upperCaseName}</HeaderNameText>
          <BackArrowContainer>
            <IconButton
              icon={"arrow-left"}
              onPress={() => navigateToHome(navigation)}
              iconColor={theme.colors.tertiary}
              size={28}
              style={{
                marginBottom: -5,
              }}
            />
          </BackArrowContainer>
        </HeaderContent>
      </Header>
      <StyledScrollView contentContainerStyle={contentContainerStyle}>
        <MainDetails name={upperCaseName} image={image} />
        <PokemonTypes types={types} />
      </StyledScrollView>
    </>
  )
}
