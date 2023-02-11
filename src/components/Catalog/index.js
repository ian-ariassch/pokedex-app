import React, { useState, useEffect, useContext } from 'react';
import PokemonCard  from './PokemonCard';
import styled from 'styled-components/native';
import axios from 'axios';
import { SearchTermContext } from '../../contexts/SearchTerm';

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

const getPokemon = async () => {
  const configurationObject = {
    method: 'get',
    url: 'https://pokeapi.co/api/v2/pokemon?limit=386',
  };
  const response = await axios(configurationObject);

  const pokemon = response.data.results.map((pokemon, index) => {
    return {
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }
  });

  return pokemon
};


export default function CardCatalog(props) {

  const [pokemonCards, setPokemonCards] = useState([]);

  const [allPokemon, setAllPokemon] = useState([])

  useEffect(() => {
    getPokemon().then((pokemon) => {
      setPokemonCards(pokemon)
      setAllPokemon(pokemon)
    });
  }, []);

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

      setPokemonCards(filteredPokemon)

    } else {
    setPokemonCards(allPokemon)
  } 
  }, [searchTerm]);

  return (
      <Container>
        {pokemonCards.map((pokemonCard, index) => {
          return <PokemonCard key={index} name={pokemonCard.name} image={pokemonCard.image} />
        })}
      </Container>
  );
}