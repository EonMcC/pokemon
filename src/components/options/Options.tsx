import React from 'react';
import { capitalise } from '../../helper-functions';
import "./Options.scss";
import { Option } from '../../interfaces/Option';

const Options: React.FC<{
  options: Option[];
  chosenPokemonName: string;
  keyPokemonName: string;
  onSelect: (name: string) => void;
}> = ({
  options,
  chosenPokemonName,
  keyPokemonName,
  onSelect
}) => {

    function getStyle(optionName: string) {
      const style = {
        border: "1px solid black",
        backgroundColor: "transparent"
      }

      if (optionName === chosenPokemonName && optionName !== keyPokemonName) style.backgroundColor = "var(--red)";
      if (chosenPokemonName && optionName === keyPokemonName) style.backgroundColor = "var(--green)";
      return style;
    }


    return (
      <div className="options">
        {options.length > 0 && options.map(option => {
          return (
            <button
              key={option.name}
              style={getStyle(option.name)}
              disabled={!!chosenPokemonName}
              onClick={() => onSelect(option.name)}
            >
              {capitalise(option.name)}
            </button>
          )
        })}
      </div>
    )
  }

export default Options;