import React, { useState, useMemo, useEffect, useContext } from "react"
import PokemonCard from "./PokemonCard"
import styled from "styled-components/native"
import axios from "axios"
import { SearchTermContext } from "../../contexts/SearchTerm"
import { useQuery } from "react-query"
import { ActivityIndicator } from "react-native"
import { connectHits } from "react-instantsearch-native"

const StyledFlatList = styled.FlatList`
  background-color: ${({ theme }) => theme.colors.tertiary};
  height: 100%;
`

const Container = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.tertiary};
  align-content: flex-start;
  justify-content: space-between;
  height: 85%;
`

const LoadingContainer = styled.View`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
`

const getPokemon = async () => {
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1008")

  return res.data
}

const CardCatalog = ({ hits }) => {
  const [displayedCards, setDisplayedCards] = useState([])

  const [allPokemon, setAllPokemon] = useState([])

  const { searchTerm } = useContext(SearchTermContext)

  const { data, isLoading, error } = useQuery(
    "pokemon",
    getPokemon,
    {
      onSuccess: (data) => {
        let allPokemon = {}

        data.results.forEach((pokemon, index) => {
          const pokemonName = pokemon.name

          const pokemonId = index + 1

          const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

          allPokemon[pokemonName] = { id: pokemonId, image: pokemonImage }
        })

        setAllPokemon(allPokemon)
      },
    },
    { staleTime: 10 * 60 * 1000 }
  )

  function FilteredCardDisplay() {
    const hitsPokemonNames = hits.map((pokemon) => pokemon.name)

    return hitsPokemonNames.map((pokemonName, index) => {
      const pokemonData = allPokemon[pokemonName]

      if (pokemonData)
        return (
          <PokemonCard
            key={index}
            name={pokemonName}
            image={pokemonData.image}
            id={pokemonData.id}
          />
        )
    })
  }

  useEffect(() => {
    if (searchTerm) {
      setDisplayedCards(FilteredCardDisplay())
    } else {
      setDisplayedCards(allMemoPokemon)
    }
  }, [allPokemon, hits])

  const allMemoPokemon = useMemo(() => {
    return Object.keys(allPokemon).map((pokemonName, index) => {
      const pokemonData = allPokemon[pokemonName]
      return (
        <PokemonCard
          key={index}
          name={pokemonName}
          image={pokemonData.image}
          id={pokemonData.id}
        />
      )
    })
  }, [allPokemon])

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator
            size="large"
            color="${({ theme }) => theme.colors.primary}"
          />
        </LoadingContainer>
      ) : (
        <Container>
          <StyledFlatList
            data={displayedCards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => item}
            numColumns={3}
          />
        </Container>
      )}
    </>
  )
}

export default connectHits(CardCatalog)
