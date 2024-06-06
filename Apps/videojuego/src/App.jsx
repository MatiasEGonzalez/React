import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import { Square } from './Components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './Components/WinnerModal'


function App() {
  const [board, setBoard] = useState (() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return  Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //null es que no hay ganador, false es que hay un empate
  const [winner, setwinner] = useState(null)

  

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setwinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    //no actualizamos esta posicion, si ya tiene algo cargado
   if(board[index] || winner)return
   //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard) //actualizacion de estado ---> Asincrona
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //GUARDAR LA PARTIDA EN EL LOCAL STORAGE
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //revisar si hubo un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setwinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setwinner(false) // esto significaria que hubo un empate
    }
  }

  

  return (
    <main className='board'>
      <h1>Ta-Te-Ti</h1>
      <button onClick={resetGame}>Reseteo</button>
      <section className="game">
        {
          board.map((square, index) => {
            return(
            <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}

            </Square>
            )
          })
        }

      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>

      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
