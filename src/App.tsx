import { useEffect, useState } from 'react'
import './App.css'
import Square from './components/Square'

function App() {
  const [game, setGame] = useState<GameValue[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<GameValue>('X');
  const [winnerPattern, setWinnerPattern] = useState<Pattern | undefined>();

  const patterns: Pattern[] = [
    [0, 1, 2], // horizontal
    [3, 4, 5], // horizontal
    [6, 7, 8], // horizontal
    [0, 3, 6], // vertical
    [1, 4, 7], // vertical
    [2, 5, 8], // vertical
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ]

  const movement = (index: number) => {
    if (winnerPattern) {
      alert('El juego ya terminó'); return
    };
    const newGame = [...game];
    if (newGame[index] !== null) return; // ya fue jugada esa casilla
    newGame[index] = currentTurn;
    setGame(newGame);
    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
  }

  const handleReset = () => {
    setGame(Array(9).fill(null));
    setCurrentTurn('X');
    setWinnerPattern(undefined);
  }

  useEffect(() => {
    // process patterns
    /* for (let i = 0; i < patterns.length; i++) {
      const [a, b, c] = patterns[i]; // current pattern
      if (game[a] && game[a] === game[b] && game[a] === game[c]) {
        alert(`${game[a]} ganó`);
        setGame(Array(9).fill(null));
        setCurrentTurn('X');
        return;
      }
    } */
    for (const pattern of patterns) {
      const [a, b, c] = pattern;
      if (game[a] && game[a] === game[b] && game[a] === game[c]) {
        setWinnerPattern(pattern);
        return;
      }
    }
  }, [game])


  return (
    <>
      <h2>Es el turno de {currentTurn}</h2>
      {winnerPattern && <h2>{`Jugador ${currentTurn} es el ganador`}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', border: '2px solid purple', justifyContent: 'center', alignItems: 'center' }}>
        {game.map((value, index) => <Square winnerPattern={winnerPattern} handleClick={() => movement(index)} value={value} index={index} />)}
      </div>
      <button style={{ marginTop: 10 }} onClick={handleReset}>Reiniciar</button>
    </>
  )
}

export default App
