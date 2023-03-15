import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useStore from '../store/useStore';
import Pokemons from '../components/organism/Pokemons'
import SelectedPokemon from '../components/organism/SelectedPokemon'
import { useObserver } from 'mobx-react-lite'

const Main = () => {
  const { pokemon } = useStore();
  const observer = useRef();
  const bottomRef = useRef();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCardLoading, setSelectedCardLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    
    if(!loading) return;
    
    const callPokemons = async () => {
      await pokemon.callPokemonsByIdx(() => { setLoading(false); });
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


  const onPokemonNameClick = async(pokeIdx) => {
    await setSelectedCardLoading(true);
    await pokemon.callPokemon(pokeIdx);
    await setSelectedCardLoading(false);
  }

  
  return useObserver(() => (
    <MainWrap>
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
      {!selectedCardLoading && pokemon.selected && pokemon.selected.id && 
        <SelectedPokemon pokemon={pokemon.selected} evolution={pokemon.selectedEvolution} /> }
    </MainWrap>
  ));
}
const MainWrap = styled.div`
  display: flex;
  
`

const ListWrap = styled.div`
  flex: 1;
  border-right: 1px solid var(--gray);
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
`




export default Main;