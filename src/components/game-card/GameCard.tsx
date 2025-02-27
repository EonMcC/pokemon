import React, { useEffect, useState } from 'react';
import Options from '../options/Options';
import "./GameCard.scss";
import { capitalise, getRandInt } from '../../helper-functions';
import { IndividualPokemon } from '../../interfaces/IndividualPokemon';
import { Option } from '../../interfaces/Option';
import GameOverModal from '../game-over-modal/GameOverModal';
import { BasicPokemonData } from '../../interfaces/AllPokemon';
import { getPokemonDetails } from '../../api';

const GameCard: React.FC<{
  initialPokemon: BasicPokemonData[];
}> = ({
  initialPokemon
}) => {

    const [text, setText] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [keyPokemon, setKeyPokemon] = useState<IndividualPokemon>();
    const [options, setOptions] = useState<Option[]>([]);
    const [score, setScore] = useState(0);
    const [halfPoints, setHalfPoints] = useState(false);
    const [round, setRound] = useState(0);
    const [chosenPokemonName, setChosenPokemonName] = useState("");
    const [isEndOfRound, setIsEndOfRound] = useState(false);

    useEffect(() => {
      newRound();
    }, []);

    function selectFour() {
      const fourPokemon: BasicPokemonData[] = [];
      if (initialPokemon) {
        while (fourPokemon.length < 4) {
          const el = initialPokemon[getRandInt(initialPokemon.length)];
          if (!fourPokemon.includes(el)) fourPokemon.push(el);
        }
      }
      return fourPokemon;
    }

    function onPokemonSelect(name: string) {
      setIsEndOfRound(true);
      setChosenPokemonName(name);
      if (name === keyPokemon!.name) {
        const pointsToAdd = halfPoints ? .5 : 1;
        setScore(prevScore => prevScore += pointsToAdd);
        setText("That's right!")
      } else {
        setText(`Sorry, it was ${capitalise(keyPokemon!.name)}`);
      }

      setTimeout(() => {
        if (round < 5) newRound();
        else setGameOver(true);
      }, 1500)
    }

    async function newRound() {
      setChosenPokemonName("");
      setText("");
      setRound(prevState => prevState += 1);
      setHalfPoints(false);
      setIsEndOfRound(false);
      const fourPokemon = selectFour();
      const keyPokemon = await getPokemonDetails(fourPokemon[getRandInt(fourPokemon.length)].url);
      if (keyPokemon) {
        setKeyPokemon(keyPokemon);
        setOptions(fourPokemon);
      }
    }

    function restartGame() {
      setScore(0);
      setRound(0);
      newRound();
      setGameOver(false);
    }

    function removeOption() {
      setHalfPoints(true);
      const newOptions = [...options];
      if (options[0].name === keyPokemon!.name) newOptions.splice(1, 1);
      else newOptions.splice(0, 1);
      setOptions(newOptions);
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
              src={keyPokemon.sprites["front_default"]}
              alt="Pokemon sprite"
              className={isEndOfRound ? "sprite" : "sprite sprite--dark"}
            />
            <p
              className="game-card__sprite-cont__round-over-text"
              style={text.includes("Sorry") ? { color: "var(--red)" } : { color: "var(--green)" }}
            >
              {capitalise(text)}
            </p>
          </div>

          <Options
            options={options}
            chosenPokemonName={chosenPokemonName}
            keyPokemonName={keyPokemon.name}
            onSelect={onPokemonSelect}
          />
          <button
            className="btn-text"
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