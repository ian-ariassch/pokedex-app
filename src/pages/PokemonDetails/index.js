import { Button } from "react-native-paper";
import React from "react";
import styled from "styled-components/native";
import MainDetails from "../../components/MainDetails";
import PokemonTypes from "../../components/PokemonTypes";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const navigateToHome = (navigation) => {
  navigation.navigate("Home");
};

const MainPageContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
  height: 100%;
`;
const getPokemonData = async (id) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);

  return res.data;
};

export default function PokemonDetails({ route, navigation }) {
  const { id, name, image } = route.params;

  const [types, setTypes] = useState([]);

  const { data, isLoading, error } = useQuery(
    ["pokemonType", id],
    () => getPokemonData(id),
    {
      onSuccess: (data) => {
        const types = data.types.map((type) => {
          return type.type.name;
        });
        setTypes(types);
      },
    },
    { staleTime: 10 * 60 * 1000 }
  );

  return (
    <MainPageContainer>
      <MainDetails name={name} image={image} /> 
      <PokemonTypes types={types} />
      <Button onPress={() => navigateToHome(navigation)} mode="contained">
        Back to Home
      </Button>
    </MainPageContainer>
  );
}
