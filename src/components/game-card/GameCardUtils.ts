import { getRandInt } from "../../helper-functions";
import { BasicPokemonData } from "../../interfaces/AllPokemon";

export function selectFour(initialPokemon: BasicPokemonData[]) {
  const fourPokemon: BasicPokemonData[] = [];
  if (initialPokemon) {
    while (fourPokemon.length < 4) {
      const el = initialPokemon[getRandInt(initialPokemon.length)];
      if (!fourPokemon.includes(el)) fourPokemon.push(el);
    }
  }
  return fourPokemon;
}