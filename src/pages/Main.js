import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useStore from '../store/useStore';
import Pokemons from '../components/organism/Pokemons'
import { useObserver } from 'mobx-react-lite'

const Main = ({}) => {
  const { pokemon } = useStore();
  const observer = useRef();
  const bottomRef = useRef();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const callPokemons = async () => {
      await pokemon.callPokemonsByIdx()
    };
    
    callPokemons();
  },[])

  
  return useObserver(() => (
    <MainWrap>
      <Pokemons pokemons={pokemon.pokemons} />
    </MainWrap>
  ));
}

const MainWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Bottom = styled.div`
  border: 2px solid blue;
  height: 100px;
  width: 300px;
`




export default Main;