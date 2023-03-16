import base from './base.json'
import axios from 'axios'

const baseUrl = base.baseUrl;
export function getPokemonsByIdx (params) {
  return axios ({
    method: 'get',
    url: '/pokemon',
    baseURL: baseUrl,
    params,
    headers: {
      'cache-control': 'public'
    }
  })
}

export function getPokemon (pokeIdx) {
  return axios ({
    method: 'get',
    url: `/pokemon/${pokeIdx}`,
    baseURL: baseUrl,
    headers: {
      'cache-control': 'public'
    }
  })
}


export function getPokemonEvolutionChain (chainIdx) {
  return axios ({
    method: 'get',
    url: `/evolution-chain/${chainIdx}`,
    baseURL: baseUrl,
    headers: {
      'cache-control': 'public'
    }
  })
}

export function getPokemonSpecies (pokeIdx) {
  return axios ({
    method: 'get',
    url: `/pokemon-species/${pokeIdx}`,
    baseURL: baseUrl,
    headers: {
      'cache-control': 'public'
    }
  })
}



    