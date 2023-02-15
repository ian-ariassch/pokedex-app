import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { pokemonTypeColors } from '../../utils/constants'

const PokemonTypesContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 10%;
    margin: 10px;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    overflow: hidden;
    border-radius: 10px;
    border-width: 3px;
`

const StyledPokemonType = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    height: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    border-width: 2px;
    margin: 5px;
    flex-basis: 0;
`

function PokemonType(props){
    const backgroundColor = pokemonTypeColors[props.type];

    const upperedCaseType = props.type.charAt(0).toUpperCase() + props.type.slice(1);

    return (
        <StyledPokemonType style={{backgroundColor}}>
            <Text>{upperedCaseType}</Text>
        </StyledPokemonType>
    )
}

export default function PokemonTypes(props)
{
    const types = props.types;

    return (
        <PokemonTypesContainer>
        {types.map((type, index) => {
            return <PokemonType key={index} type={type} />}
        )}
        </PokemonTypesContainer>
    )
}