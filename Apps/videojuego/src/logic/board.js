import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras para ver si gano X u O
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // si en la posicion cero hay una X o una O
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a] // esto nos deberia devolver X u O
      }
    }
    //si no hay ganador
    return null
  }


  export const checkEndGame = (newBoardw) =>{
    //revisamos si hay un empate
    //si no hay mas espacios vacios en el tablero
    return newBoardw.every((square) => square !== null)// every: llama a todas las posiciones de square y verifica si todas son diferentes a null
    
  }