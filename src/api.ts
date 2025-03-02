import axios from "axios";
import { RandomPokemonResponse, VerifyResponse } from "./interfaces/ApiResponses";

const BASE_URL = "http://localhost:8080";

export async function getRandomPokemon() {
  let resp;
  try {
    resp = await axios.get(`${BASE_URL}/random-pokemon`);
  } catch (error) {
    window.alert(`${error}. Please try again. If this error persists then contact customer service.`);
  }
  return resp ? resp.data as RandomPokemonResponse : null;
}

export async function checkIfCorrect(id: number, name: string) {
  let resp;
  try {
    resp = await axios.get(`${BASE_URL}/verify/${id}/${name}`);
  } catch (error) {
    window.alert(`${error}. Please try again. If this error persists then contact customer service.`);
  }
  return resp ? resp.data as VerifyResponse : null;
}