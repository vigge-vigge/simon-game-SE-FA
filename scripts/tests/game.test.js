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


// Runs before all tests to simulate the HTML document environment
beforeAll(() => {
  let fileContent = fs.readFileSync("index.html", "utf-8") // Read the HTML file
  document.open() // Open a new document
  document.write(fileContent) // Write the HTML content into the document
  document.close() // Close the document
})

// Tests for verifying keys in the 'game' object
describe("Game object contain correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true) // Check if 'score' key exists
  })
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true) // Check if 'currentGame' key exists
  })
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true) // Check if 'playerMoves' key exists
  })
  test("choices key exists", () => {
    expect("choices" in game).toBe(true) // Check if 'choices' key exists
  })
  test("choices should contain correct id's", () => {
    expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']) // Verify that choices contain the correct button IDs
  })
})

// Tests for the 'newGame' function
describe("newGame function work correctly", () => {
  beforeAll(() => {
    // Setup initial game state before testing 'newGame'
    game.score = 42
    game.currentGame = ["button1", "button2"]
    game.playerMoves = ["button1", "button2"]
    document.getElementById("score").innerText = "42"
    newGame() // Call the newGame function to reset the game state
  })
  test("should set game score to zero", () => {
    expect(game.score).toEqual(0) // Verify the score is reset to 0
  })
  test("should have one move in currentGame array", () => {
    expect(game.currentGame.length).toBe(1) // Ensure only one move is in the current game sequence
  })
  test("should clear playerMoves array", () => {
    expect(game.playerMoves).toEqual([]) // Ensure the playerMoves array is cleared
  })
  test("should display zero for the element with id of score", () => {
    expect(document.getElementById("score").innerText).toEqual(0) // Check that score display is reset to 0
  })
  test("expect data-listener to be true", () => {
    const elements = document.getElementsByClassName("circle")
    for (let element of elements) {
      expect(element.getAttribute("data-listener")).toBe("true") // Ensure that all circles have 'data-listener' attribute set to 'true'
    }
  })
})

// Tests for gameplay functionality
describe("gameplay works correctly ", () => {
  beforeEach(() => {
    // Reset game state before each test
    game.score = 0
    game.currentGame = []
    game.playerMoves = []
    addTurn() // Add a turn to the game before each test
  })
  afterEach(() => {
    // Reset game state after each test
    game.score = 0
    game.currentGame = []
    game.playerMoves = []
  })
  test("addTurns add new turn to the game", () => {
    addTurn() // Add another turn
    expect(game.currentGame.length).toBe(2) // Ensure that the game has 2 turns after adding one
  })
  test("should add correct class to light-up the button", () => {
    let button = document.getElementById(game.currentGame[0]) // Get the button from the game sequence
    lightsOn(game.currentGame[0]) // Call lightsOn to light up the button
    expect(button.classList).toContain('light') // Ensure the button has the 'light' class added
  })
  test('showTurns should update game.TurnNumber', () => {
    game.turnNumber = 42
    showTurns() // Call showTurns function
    expect(game.turnNumber).toBe(0) // Ensure the turn number is reset to 0
  })
  test("should increment the score if the turn is correct", () => {
    game.playerMoves.push(game.currentGame[0]) // Add the correct move to playerMoves
    playerTurn() // Simulate player's turn
    expect(game.score).toBe(1) // Verify that the score has been incremented
  });
  // test("clicking during computer sequence should fail", () => {
  //   showTurns();
  //   game.lastButton = "";
  //   document.getElementById("button2").click();
  //   expect(game.lastButton).toEqual("");
  // });
  test('should call an alert when the move is wrong', () => { 
    game.playerMoves.push("wrong") // Add an incorrect move
    playerTurn() // Simulate player's turn
    expect(window.alert).toBeCalledWith("Wrong move !") // Check if the alert is called with the correct message
  })
})