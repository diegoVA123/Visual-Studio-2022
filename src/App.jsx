import { useState } from "react"

const TURNS = {
  X: "x",
  O: "o"//para poder cambiar de turno (es como un true o false)
}



const Square = ({children, isSelected, updateBoard, index})=>
{//sus propiedades son para actualizar el tablero
 
  const className = `square ${isSelected ? 'is-selected' : ''}`
  //tiene square pero si isSelected es verdadero lo cambiamos a is-selected
  const handleclick = () => {
    updateBoard(index)//se ejecuta al click
  }
return(
  <div onClick={handleclick} className={className}>
    {children}
  </div>//le pasamos classname la constante con la condicion que hicimos de isSelected y como TURN es como un booleano podemos checar de quien es el turno
)
//renderizamos el children en div
}
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8]
]
function App(){
  const [board, setBoard]=useState(Array(9).fill(null))//creamos el estado siendo el tablero
  const [turn, setTurn]=useState(TURNS.X)//el primer jugador es X, nos devuelve un array de dos posiciones,
  const [winner, setWinner]=useState(null)
  
  const checkWinner = (boardToCheck)=>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo//recuperamos a b c
      if(boardToCheck[a] && // checamos si hay x u O
        boardToCheck[a] === boardToCheck[b] //comparamos
        &&
        boardToCheck[a] === boardToCheck[c])//comparamos
        {
          return boardToCheck[a]
        }


    }
    return null
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn // le damos el valor del turno actual
    setBoard(newBoard)//actualizamos el estado
    
    const newTurn = turn === TURNS.X  ? TURNS.O : TURNS.X
    setTurn(newTurn)//cambiamos el turno
    //mandamos la funcion no la ejecucion de la funcion en square por que no queremos ejecutar la funcion hasta que el usuario haga click
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      alert(`el ganador es ${newWinner}`)
      }

  }

  return (
  <main className="board">
    <h1> tic tac toe</h1>
    <section className="game">
      {
      board.map((_, index)=>{//hacemos el tablero con mapeo
        return(
          <Square
          key={index}//identificador unico para renderiizarlo dentro del array que devuelve map
          index={index}//usamos indice como promopt
          updateBoard={updateBoard}//pasamos el estado para que se actualice
          >
          {board[index]}
          </Square>
          //necesitamos un estado para guardar el click del usuario(un estado es un valor que cada vez que cambie vuelve a renderizar el componente para crear un estado usamos useState)
          
        )
      })
    }

    </section>
    <section className="turn">
      <Square isSelected={turn == TURNS.X }>{TURNS.X}</Square>
      <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
    </section>
  </main>//si turn es X pasamos TURNS x y al reves si esta en O
  )
}

export default App