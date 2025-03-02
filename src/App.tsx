import { useState } from 'react';
import "./assets/fonts/Pokemon_Hollow.ttf";
import "./theme.scss";
import GameCard from './components/game-card/GameCard';

function App() {

  const [showGame, setShowGame] = useState(false);

  if (!showGame) {
    return (
      <>
        <h1>Who's That Pokémon!?</h1>
        <button
          className="btn-text"
          onClick={() => setShowGame(true)}
        >
          START GAME
        </button>
      </>
    )
  }

  return (
    <>
      <h1>Who's That Pokémon!?</h1>
      <h2>Can you score a perfect 5?</h2>
      <GameCard />
    </>
  )
}

export default App
