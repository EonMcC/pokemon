import React from 'react';
import { capitalise } from '../../helper-functions';
import "./Options.scss";
import { VerifyResponse } from '../../interfaces/ApiResponses';

const Options: React.FC<{
  options: string[];
  result: VerifyResponse | undefined;
  chosenName: string;
  onSelect: (name: string) => void;
}> = ({
  options,
  result,
  chosenName,
  onSelect
}) => {

    function getStyle(optionName: string) {
      const style = {
        border: "1px solid black",
        backgroundColor: "transparent"
      }
      if (result?.name === optionName) style.backgroundColor = "var(--green)";
      if (chosenName === optionName && !result?.isCorrect) style.backgroundColor = "var(--red)";
      return style;
    }

    return (
      <div className="options">
        {options.length > 0 && options.map(option => {
          return (
            <button
              key={option}
              style={getStyle(option)}
              disabled={!!chosenName}
              onClick={() => onSelect(option)}
            >
              {capitalise(option)}
            </button>
          )
        })}
      </div>
    )
  }

export default Options;