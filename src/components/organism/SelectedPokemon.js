import { toJS } from "mobx";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SelectedPokemon = ({pokemon = {}, evolution = {}}) => {
  const koreanName = pokemon.koreanName || '';


  return (
    <Wrap>
      <Card>
        <TextWrap>
          <Title>No. {pokemon.id}</Title>
          <Title>{pokemon.name}</Title>
          <Title>{koreanName}</Title>
        </TextWrap>
        { pokemon.sprites?.front_default && <PokemonImg src={pokemon.sprites.front_default} /> }

      </Card>
    </Wrap>
  )
}

const Wrap = styled.div`
  flex: 3;
`

const Card = styled.div`
  // border: 2px solid var(--navy);
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextWrap = styled.div`
  
`

const Title = styled.h2`
`

const PokemonImg = styled.img`
  width: 200px;
`

export default SelectedPokemon;