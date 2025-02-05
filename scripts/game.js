document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".button").addEventListener("click", newGame);
});

const game = {
  score: 0,
  currentGame: [],
  playerMoves: [],
  choices: ['button1', 'button2', 'button3', 'button4'],
  turnNumber: 0
}
const newGame = () => {
  game.score = 0
  game.currentGame = []
  game.playerMoves = []

  for (let circle of document.getElementsByClassName("circle")) {
    if (circle.getAttribute("data-listener") !== true) {
      circle.addEventListener("click", (e) => {
        if (game.currentGame.length > 0) {
          let move = e.target.getAttribute("id")
          game.lastButton = move
          lightsOn(move)
          game.playerMoves.push(move)
          playerTurn()
        }
      })
      circle.setAttribute("data-listener", "true")
    }
  }
  showScore()
  addTurn()
}

const showScore = () => {
  document.getElementById("score").innerText = game.score
}

const addTurn = () => {
  game.playerMoves = []
  game.currentGame.push(game.choices[Math.floor(Math.random() * 4)])
  showTurns()
}

const lightsOn = (circleId) => {
  document.getElementById(circleId).classList.add("light")
  setTimeout(() => {
    document.getElementById(circleId).classList.remove("light")
  }, 400);
}

const showTurns = () => {
  game.turnNumber = 0
  let turn = setInterval(() => {
    lightsOn(game.currentGame[game.turnNumber])
    game.turnNumber++
    if (game.turnNumber >= game.currentGame.length) {
      clearInterval(turn)
    }
  }, 800);
}

const playerTurn = () => {
  let i = game.playerMoves.length - 1
  if (game.currentGame[i] === game.playerMoves[i]) {
    if (game.currentGame.length === game.playerMoves.length) {
      game.score++
      showScore()
      addTurn()
    }
  } else alert("Wrong move !")
}

export {
  game,
  newGame,
  addTurn,
  lightsOn,
  showTurns,
  playerTurn
}