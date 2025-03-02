export interface RandomPokemonResponse {
  id: number;
  sprite: string;
  names: string[];
}

export interface VerifyResponse {
  name: string;
  imageUrl: string;
  isCorrect: boolean;
}