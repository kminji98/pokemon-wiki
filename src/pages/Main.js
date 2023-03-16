import { toJS } from 'mobx';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react-lite'
import { useSearchParams, useLocation } from 'react-router-dom'

import useStore from '../store/useStore';

import Pokemons from '../components/organism/Pokemons'
import SelectedPokemon from '../components/organism/SelectedPokemon'
import Header from '../components/atom/Header';



const Main = () => {
  const { pokemon } = useStore();
  const observer = useRef();
  const bottomRef = useRef();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCardLoading, setSelectedCardLoading] = useState(false);
  const [notFoundPokemonId, setNotFoundPokemonId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id');
  const { pathname } = useLocation();

  useEffect(() => {
    const initSelectedPokemon = () => {
      if(id && id !== 'null') {
        onPokemonNameClick(id)};
    }

    initSelectedPokemon();
  }, [pathname])

  useEffect(() => {
    setLoading(true);
    if(!loading) return;
    
    const callPokemons = async () => {
      await pokemon.callPokemonsByIdx(() => { 
        setLoading(false);
      });
    };

    callPokemons();
  }, [page]);


  useEffect(() => {
    if(!bottomRef.current || loading) return;
    

    observer.current = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
            setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );

    
    if (bottomRef.current) {
      observer.current.observe(bottomRef.current);
    }
  }, [loading]);


  const onPokemonNameClick = async(pokeId) => {
    await setSelectedCardLoading(true);

    await pokemon.callPokemon(pokeId, () => {

      setNotFoundPokemonId('');
      setSelectedCardLoading(false);
      setSearchParams({ id: pokeId });


    }, (errCode) => {

      if(errCode === 404) setNotFoundPokemonId(pokeId);
      setSelectedCardLoading(false);

    });
  }

  
  return useObserver(() => (
    <>
      <Header onSearch={onPokemonNameClick} />
      <MainWrap>
        {!selectedCardLoading && pokemon.selected && 
          <SelectedPokemon pokemon={pokemon.selected} bases={toJS(pokemon.bases)} nexts={pokemon.nexts} notFoundPokemonId={notFoundPokemonId} onPokemonNameClick={onPokemonNameClick} /> }

        <ListWrap>
          <Pokemons pokemons={pokemon.pokemons} onPokemonNameClick={onPokemonNameClick} />
          {loading && <Loading> Loading ... </Loading>}
          <Bottom ref={bottomRef} />
        </ListWrap>

        {selectedCardLoading && 
          <CardLoadingWrap>
            <CardLoading>Loading...</CardLoading>
          </CardLoadingWrap> 
        }
      </MainWrap>
    </>
  ));
}
const MainWrap = styled.div`
  display: flex;
  padding-top: 60px;
  
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const ListWrap = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 30px;

  @media (max-width: 767px){
    padding: 0 20px;
  }
`

const Bottom = styled.div`
  height: 100px;
`

const Loading = styled.div`
  margin: 20px;
`

const CardLoadingWrap = styled.div`
  width: 500px;
  flex: 3;
`

const CardLoading = styled.div`
  padding: 100px;
  font-size: 20px;
  color: var(--gray);

  top: 100px; 
  right: 40%;
  position: fixed;
`




export default Main;