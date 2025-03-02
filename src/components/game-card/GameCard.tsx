import React, { useEffect, useState } from 'react';
import Options from '../options/Options';
import "./GameCard.scss";
import { capitalise } from '../../helper-functions';
import GameOverModal from '../game-over-modal/GameOverModal';
import { checkIfCorrect, getRandomPokemon } from '../../api';
import { KeyPokemon } from '../../interfaces/KeyPokemon';
import { RandomPokemonResponse, VerifyResponse } from '../../interfaces/ApiResponses';

const GameCard = () => {

  const [resultText, setResultText] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [keyPokemon, setKeyPokemon] = useState<KeyPokemon>();
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [halfPoints, setHalfPoints] = useState(false);
  const [round, setRound] = useState(0);
  const [chosenName, setChosenName] = useState("");
  const [isEndOfRound, setIsEndOfRound] = useState(false);
  const [result, setResult] = useState<VerifyResponse>();

  useEffect(() => {
    newRound();
  }, []);

  async function newRound() {
    setChosenName("");
    setResultText("");
    setResult(undefined);
    setRound(prevState => prevState += 1);
    setHalfPoints(false);
    setIsEndOfRound(false);
    const data: RandomPokemonResponse | null = await getRandomPokemon();
    if (data) {
      setKeyPokemon({ id: data.id, sprite: data.sprite });
      setOptions(data.names);
    }
  }

  async function onPokemonSelect(name: string) {
    const result: VerifyResponse | null = await checkIfCorrect(keyPokemon!.id, name);
    if (result) {
      setResult(result);
      setIsEndOfRound(true);
      setChosenName(name);
      if (result.isCorrect) {
        const pointsToAdd = halfPoints ? .5 : 1;
        setScore(prevScore => prevScore += pointsToAdd);
        setResultText("That's right!");
      } else {
        setResultText(`Sorry, it was ${capitalise(result.name)}`);
      }

      setTimeout(() => {
        if (round < 5) newRound();
        else setGameOver(true);
      }, 2000)
    }
  }

  function restartGame() {
    setScore(0);
    setRound(0);
    newRound();
    setResult(undefined);
    setGameOver(false);
  }

  async function removeOption() {
    setHalfPoints(true);
    const newOptions = [...options];
    const verifyResponse: VerifyResponse | null = await checkIfCorrect(keyPokemon!.id, options[0]);
    if (verifyResponse) {
      const isFirstOptionCorrect = verifyResponse.isCorrect;
      if (isFirstOptionCorrect) newOptions.splice(1, 1);
      else newOptions.splice(0, 1);
      setOptions(newOptions);
    }
  }

  if (!keyPokemon) return <h3>Loading...</h3>;

  return (
    <>
      <div className="game-card">
        <div className="game-card__stats">
          <p>Round: {round}/5</p>
          <p>Score: {score}</p>
        </div>

        <div className="game-card__sprite-cont">
          <img
            src={keyPokemon.sprite}
            alt="Pokemon sprite"
            className={isEndOfRound ? "sprite" : "sprite sprite--dark"}
          />
          <p
            className="game-card__sprite-cont__round-over-text"
            style={resultText.includes("Sorry") ? { color: "var(--red)" } : { color: "var(--green)" }}
          >
            {capitalise(resultText)}
          </p>
        </div>

        <Options
          options={options}
          chosenName={chosenName}
          result={result}
          onSelect={onPokemonSelect}
        />

        <button
          className="btn-text"
          disabled={options.length < 4}
          onClick={removeOption}
        >
          Remove an incorrect option for half points?
        </button>
      </div>

      {gameOver && (
        <GameOverModal
          score={score}
          onRestart={restartGame}
        />
      )}

    </>
  )
}

export default GameCard;