import axios from "axios";
import { GetAllPokemonData } from "./interfaces/AllPokemon";
import { IndividualPokemon } from "./interfaces/IndividualPokemon";

const BASE_URL = "https://pokeapi.co/api/v2/";

export async function getInitialPokemon() {
  let resp;
  try {
    resp = await axios.get(`${BASE_URL}/pokemon?limit=50`);
  } catch (error) {
    window.alert(`${error}. Please try again. If this error persists then contact customer service.`);
  }
  console.log('resp', resp)
  return resp ? resp.data as GetAllPokemonData : null;
}

export async function getPokemonDetails(url: string) {
  let resp;
  try {
    resp = await axios.get(url);
  } catch (error) {
    window.alert(`${error}. Please refresh the page. If this error persists then contact customer service.`);
  }
  return resp ? resp.data as IndividualPokemon : null;
}