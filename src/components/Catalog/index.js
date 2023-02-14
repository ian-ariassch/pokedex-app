import React, { useState, useEffect, useContext } from 'react';
import PokemonCard  from './PokemonCard';
import styled from 'styled-components/native';
import axios from 'axios';
import { SearchTermContext } from '../../contexts/SearchTerm';
import { useQuery } from 'react-query';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';

const Container = styled.View `
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: #fff; 
  align-content: flex-start; 
  justify-content: space-between;
  padding: 20px;
  height: 85%;
`

const LoadingContainer = styled.View `
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
`

const getPokemon = async () => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=386')

  return res.data
};

export default function CardCatalog(props) {

  const [displayedCards, setDisplayedCards] = useState([]);

  const [allPokemon, setAllPokemon] = useState([])

  const { data, isLoading, error } = useQuery('pokemon', getPokemon, {
    onSuccess: (data) => {
      const pokemon = data.results.map((pokemon, index) => {
        return {
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }
      })
      setDisplayedCards(pokemon)

      setAllPokemon(pokemon)
    }
  }, {staleTime: 10 * 60 * 1000})

  const {searchTerm} = useContext(SearchTermContext)

  useEffect(() => {
    if(allPokemon.length === 0) {
      return
    }

    if(searchTerm) {
      const filteredPokemon = allPokemon.filter((pokemon) => {
        const lowerCaseName = pokemon.name.toLowerCase()

        const lowerCaseSearchTerm = searchTerm.toLowerCase()

        return lowerCaseName.includes(lowerCaseSearchTerm)
      })

      setDisplayedCards(filteredPokemon)

    } else {
      setDisplayedCards(allPokemon)
  } 
  }, [searchTerm]);

  function CardDisplay(){
    return displayedCards.map((pokemonCard, index) => {
      return <PokemonCard key={index} name={pokemonCard.name} image={pokemonCard.image} />}
    )
  }

  return (
    <ScrollView>
      {!isLoading ?
      <Container>
         {CardDisplay()}
      </Container> :
      <LoadingContainer>
        <ActivityIndicator size="large" color="#E65451" />
      </LoadingContainer>}
    </ScrollView>
  )
}