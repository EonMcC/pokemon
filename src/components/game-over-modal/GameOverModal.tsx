import React from 'react';
import "./GameOverModal.scss";

const GameOverModal: React.FC<{
  score: number;
  onRestart: () => void;
}> = ({
  score,
  onRestart
}) => {

    return (
      <>
        <div className="modal-mask" />
        <div className="game-over-modal">
          <h2>Game Over</h2>
          <p>You scored <span>{score}</span> points</p>
          <button
            className="btn-text"
            onClick={onRestart}
          >
            Restart
          </button>
        </div>
      </>
    )
  }

export default GameOverModal;