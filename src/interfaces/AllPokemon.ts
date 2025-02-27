export interface GetAllPokemon {
  data: GetAllPokemonData
  status: number
  statusText: string
  headers: Headers
  config: Config
  request: Request
}

export interface GetAllPokemonData {
  count: number
  next: string
  previous: any
  results: BasicPokemonData[]
}

export interface BasicPokemonData {
  name: string
  url: string
}

interface Headers {
  "cache-control": string
  "content-length": string
  "content-type": string
}

interface Config {
  transitional: Transitional
  adapter: string[]
  transformRequest: any[]
  transformResponse: any[]
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
  env: Env
  headers: Headers2
  method: string
  url: string
  allowAbsoluteUrls: boolean
}

interface Transitional {
  silentJSONParsing: boolean
  forcedJSONParsing: boolean
  clarifyTimeoutError: boolean
}

interface Env { }

interface Headers2 {
  Accept: string
}

interface Request { }
