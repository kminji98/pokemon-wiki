import { observable, toJS } from 'mobx'
import {
  getPokemonsByIdx,
  getPokemon,
  getPokemonEvolutionChain,
  getPokemonSpecies

} from '../libs/pokemons'



const callPokemon = async (pokeIdx) => {
  try {
    const res = await getPokemon(pokeIdx);
    const evolutionRes = await getPokemonSpecies(res.data.name);
    
    
    pokemon.selected = res.data;
    pokemon.selectedSpecies = evolutionRes.data;
    pokemon.selected['koreanName'] = evolutionRes.data && evolutionRes.data.names.length > 0 ? evolutionRes.data.names[2].name : '';


    let chainArr = evolutionRes.data.evolution_chain.url.split("/");
    const chainIdx = chainArr[chainArr.length-2]

    await callPokemonEvolutionChain(chainIdx);

    return(res.data);
  } catch (error) {
    console.log('error', error);
  }
}


const callPokemonEvolutionChain = async (chainIdx) => {
  const evolutionRes = await getPokemonEvolutionChain(chainIdx);
  setChain(evolutionRes.data.chain);  
}

const getIdFromUrl = (url) => {
  const urlArr = url.split("/");
  const id = urlArr && urlArr.length-2 > 0 ? urlArr[urlArr.length-2] : '';

  return id;
}


const setChain = (speciesObj) => {
  if(!speciesObj) return;
  let chain = []

  
  // 0
  if(speciesObj.species) {
    const id = getIdFromUrl(speciesObj.species.url);

    const base = {
      name: speciesObj.species.name,
      id: id
    }

    chain.push(base);
  };
  
  // 1
  if(!speciesObj.hasOwnProperty('evolves_to')) return;
  const next = speciesObj['evolves_to'][0] || '';
  if(next) {
    const id = getIdFromUrl(next.species.url);
    
    const nextSpecies = {
      name: next.species.name,
      id: id
    }
    chain.push(nextSpecies);
  };
  
  // 2
  if(!next.hasOwnProperty('evolves_to')) return;
  const last = next['evolves_to'][0] || '';
  if(last) {
    const id = getIdFromUrl(last.species.url);
    

    const lastSpecies = {
      name: last.species.name,
      id: id
    }
    chain.push(lastSpecies);
  };

  const matchIdx = chain.findIndex(ele => ele.name === pokemon.selected.name);
  console.log('matchIdx', matchIdx);
}


const callPokemonsByIdx = async (callback) => {
  try {
    if(pokemon.offset > pokemon.count) return;

    const params = {
      offset: pokemon.offset, 
      limit: pokemon.limit
    }

    const res = await getPokemonsByIdx(params);
    
    if(res && res.data.results){
      const newPokemons = toJS(res.data.results);
      pokemon.count = pokemon.count + newPokemons.length;

      pokemon.pokemons = [...pokemon.pokemons, ...newPokemons];
      pokemon.offset += pokemon.limit;
    }

    if(callback) {
      callback();
    }

  } catch (error) {
    console.log('error', error);
  }
}



const pokemon = observable({
  selected: {},
  selectedSpecies: {},
  selectedEvolution: {},
  pokemons: [],
  offset: 0,
  limit: 20,
  count: 0,

  callPokemon,
  callPokemonsByIdx,
  callPokemonEvolutionChain
})

export { pokemon };
