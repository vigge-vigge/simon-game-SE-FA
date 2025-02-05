/**
 * @jest-environment jsdom
 */
/** @type {import('jest').Config} */
const config = {
  verbose: true,
};

module.exports = config;

import fs from "fs";
import { game, newGame, addTurn, lightsOn, showTurns, playerTurn } from "../game.js";

jest.spyOn(window, "alert").mockImplementation(() => { })

beforeAll(() => {
  let fileContent = fs.readFileSync("index.html", "utf-8")
  document.open()
  document.write(fileContent)
  document.close()
})

describe("Game object contain correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true)
  })
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true)
  })
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true)
  })
  test("choices key exists", () => {
    expect("choices" in game).toBe(true)
  })
  test("choices should contain correct id's", () => {
    expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4'])
  })
})

describe("newGame function work correctly", () => {
  beforeAll(() => {
    game.score = 42
    game.currentGame = ["button1", "button2"]
    game.playerMoves = ["button1", "button2"]
    document.getElementById("score").innerText = "42"
    newGame()
  })
  test("should set game score to zero", () => {
    expect(game.score).toEqual(0)
  })
  test("should have one move in currentGame array", () => {
    expect(game.currentGame.length).toBe(1)
  })
  test("should clear playerMoves array", () => {
    expect(game.playerMoves).toEqual([])
  })
  test("should display zero for the element with id of score", () => {
    expect(document.getElementById("score").innerText).toEqual(0)
  })
  test("expect data-listener to be true", () => {
    const elements = document.getElementsByClassName("circle")
    for (let element of elements) {
      expect(element.getAttribute("data-listener")).toBe("true")
    }
  })
})

describe("gameplay works correctly ", () => {
  beforeEach(() => {
    game.score = 0
    game.currentGame = []
    game.playerMoves = []
    addTurn()
  })
  afterEach(() => {
    game.score = 0
    game.currentGame = []
    game.playerMoves = []
  })
  test("addTurns add new turn to the game", () => {
    addTurn()
    expect(game.currentGame.length).toBe(2)
  })
  test("should add correct class to light-up the button", () => {
    let button = document.getElementById(game.currentGame[0])
    lightsOn(game.currentGame[0])
    expect(button.classList).toContain('light')
  })
  test('showTurns should update game.TurnNumber', () => {
    game.turnNumber = 42
    showTurns()
    expect(game.turnNumber).toBe(0)
  })
  test("should increment the score if the turn is correct", () => {
    game.playerMoves.push(game.currentGame[0]);
    playerTurn();
    expect(game.score).toBe(1);
  });
  // test("clicking during computer sequence should fail", () => {
  //   showTurns();
  //   game.lastButton = "";
  //   document.getElementById("button2").click();
  //   expect(game.lastButton).toEqual("");
  // });
  test('should call an alert when the move is wrong', () => { 
    game.playerMoves.push("wrong")
    playerTurn()
    expect(window.alert).toBeCalledWith("Wrong move !")
  })
})