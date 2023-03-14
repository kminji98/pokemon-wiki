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