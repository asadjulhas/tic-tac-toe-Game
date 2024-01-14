import { useState } from "react";
import "./app.css";

function App() {
  const [player, setPlayer] = useState(true);
  const [winnerAlert, setWinnerAlert] = useState(false);
  const [squres, setSqures] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState("");
  const [winnerRow, setWinnerRow] = useState([]);
  const [history, setHistory] = useState([]);

  const buttonClick = (e, index) => {
    if (squres[index] || winnerAlert) {
      return;
    }
    setWinner("");
    var newSqures = squres.slice();
    setHistory([...history, newSqures]);
    newSqures[index] = player ? "X" : "O";
    setSqures(newSqures);

    setPlayer(!player);
    checkWinner(newSqures, player ? "X" : "O");
  };

  const loadHistory = (index) => {
    setSqures(history[index]);
    checkWinner(squres, player ? "X" : "O");
  };

  const resetGame = () => {
    setSqures(Array(9).fill(null));
    setWinnerRow([]);
    setHistory([]);
    setWinner("");
    setWinnerAlert(false);
  };

  const checkWinner = (board, player) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinnerAlert(true);
        setTimeout(() => {
          setWinner(player);
        }, 600);
        setWinnerRow(condition);
        return;
      } else {
        setWinner("");
        setWinnerAlert(false);
        setWinnerRow([]);
      }
    }
  };

  const drawMatch = squres.every((element) => element !== null);
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="pr-5 status_area mb-5 text-2xl">
        {winner || drawMatch
          ? `Game over`
          : `Next player: ${player ? "X" : "O"}`}{" "}
      </p>
      <div className="hh">
        <div className="border-2 p-2 button_click grid-container">
          {squres.map((squere, index) => {
            return (
              <button
                disabled={squres[index]}
                key={index}
                onClick={(e) => buttonClick(e, index)}
                className={
                  winnerRow.includes(index)
                    ? "border-2 border-gray-500 py-2 m-1 w-14 h-14 text-center font-bold text-gray-500 winner"
                    : "border-2 border-gray-500 py-2 m-1 w-14 h-14 text-center font-bold text-gray-500"
                }
              >
                {squere}
              </button>
            );
          })}
        </div>
        {winner && (
          <div className="result_area">
            <h1>
              <span>{winner}</span>
              <br /> Winner!
            </h1>
          </div>
        )}
        {drawMatch && (
          <div className="result_area">
            <h1>
              <span className="drawMatch">Draw!</span>
            </h1>
          </div>
        )}
      </div>
      <button
        className="mt-5 bg-gray-500 text-white px-2 py-1 rounded-sm text-sm"
        onClick={resetGame}
      >
        Restart game
      </button>{" "}
      <br />
      {history &&
        history.map((m, index) => (
          <li onClick={() => loadHistory(index)} key={index}>
            History {index + 1}
          </li>
        ))}
    </div>
  );
}

export default App;
