import { useEffect, useState } from 'react';
import { getInitialPokemon } from './api'
import "./assets/fonts/Pokemon_Hollow.ttf";
import "./theme.scss";
import GameCard from './components/game-card/GameCard';
import { BasicPokemonData } from './interfaces/AllPokemon';

function App() {

  const [initialPokemon, setInitialPokemon] = useState<BasicPokemonData[]>([]);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    setUpGame();
  }, [])

  async function setUpGame() {
    const response = await getInitialPokemon();
    if (response) setInitialPokemon(response.results);
  }

  if (!showGame) {
    return (
      <>
        <h1>Who's That Pokémon!?</h1>
        <button
          className="btn-text"
          disabled={!initialPokemon}
          onClick={() => setShowGame(true)}
        >
          {!initialPokemon ? "Loading data..." : "START GAME"}
        </button>
      </>
    )
  }

  return (
    <>
      <h1>Who's That Pokémon!?</h1>
      <h2>Can you score a perfect 5?</h2>
      <GameCard initialPokemon={initialPokemon} />
    </>
  )
}

export default App
