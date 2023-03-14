import { observable, toJS } from 'mobx'
import {
  getPokemonsByIdx

} from '../libs/pokemons'


const callPokemon = () => {
  
}

const callPokemonsByIdx = async () => {
  
  try {
    const res = await getPokemonsByIdx();
    
    if(res && res.data?.results){
      pokemon.pokemons = toJS(res.data.results);
      pokemon.count = res.data.results.length;

    }

  } catch (error) {
    console.log('error', error);
  }
}

const _test_callPokemonsByIdx = async (callback) => {
  console.log('pokemon.offset, pokemon.count', pokemon.offset, pokemon.count);
  if (pokemon.offset > pokemon.count) {
    // callback();
    console.log('return');
    return;
  };
  
  try {
    console.log('no return');

    const res = await getPokemonsByIdx({ offset: pokemon.offset, limit: pokemon.limit});
    console.log('callPokemonsByIdx', res.data?.results.slice(), res.data.results.length);

    if(res && res.data?.results){
      const newPokemons = toJS(res.data.results);
      pokemon.count = res.data.results.length;

      pokemon.pokemons = [...pokemon.pokemons, ...newPokemons];
      pokemon.offset = pokemon.offset + pokemon.limit;

      console.log('?????? pokemon.offset', pokemon.offset, pokemon.count);
    }

    callback();
  } catch (error) {
    console.log('error', error);
  }
}

const callPokemonsByName = () => {

}




const pokemon = observable({
  selected: {},
  pokemons: [],
  offset: 0,
  limit: 20,
  count: 0,

  callPokemon: callPokemon,
  callPokemonsByIdx: callPokemonsByIdx,
  callPokemonsByName: callPokemonsByName
})

export { pokemon };
