import base from './base.json'
import axios from 'axios'

const baseUrl = base.baseUrl;
export function getPokemonsByIdx (params) {
  return axios ({
    method: 'get',
    url: '/pokemon',
    baseURL: baseUrl,
    params
  })
}

export function getPokemon (pokeIdx) {
  return axios ({
    method: 'get',
    url: `/pokemon/${pokeIdx}`,
    baseURL: baseUrl
  })
}


export function getPokemonEvolutionChain (chainIdx) {
  console.log('chainIdx', chainIdx);
  return axios ({
    method: 'get',
    url: `/evolution-chain/${chainIdx}`,
    baseURL: baseUrl
  })
}

export function getPokemonSpecies (pokeIdx) {
  return axios ({
    method: 'get',
    url: `/pokemon-species/${pokeIdx}`,
    baseURL: baseUrl
  })
}



    