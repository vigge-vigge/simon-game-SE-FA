beforeEach(() => {
  // Manually mock the DOM before running each test
  document.body.innerHTML = `
    <div id="score-display">0</div>
    <div id="level-display">Level: 1</div>
    <div id="game-over" style="display: none;">
      <div id="final-score"></div>
      <div id="final-level"></div>
      <button class="start-btn">Start</button>
    </div>
    <button class="start-btn">Start Game</button>
    <div id="circle1" class="circle"></div>
    <div id="circle2" class="circle"></div>
    <div id="circle3" class="circle"></div>
    <div id="circle4" class="circle"></div>
  `;

  // Mock the setTimeout to avoid actual delays in tests
  global.setTimeout = jest.fn((fn) => fn());
});

// Test to start a new game and reset the state
test('should start a new game and reset state', () => {
  window.initiateNewGame(); // Function is now accessible via window

  expect(window.gameState.score).toBe(0);
  expect(window.gameState.level).toBe(1);
  expect(window.gameState.pattern.length).toBe(0);
  expect(window.gameState.playerPattern.length).toBe(0);
  expect(window.gameState.stepIndex).toBe(0);
  expect(document.getElementById('game-over').style.display).toBe('none');
});

// Test to update the score correctly
test('should update score and level correctly', () => {
  window.gameState.score = 5;
  window.gameState.level = 3;
  window.refreshScore(); // Function is now accessible via window
  window.refreshLevel(); // Function is now accessible via window

  expect(document.getElementById("score-display").textContent).toBe("5");
  expect(document.getElementById("level-display").textContent).toBe("Level: 3");
});

// Test to start a new sequence
test('should start a new sequence', () => {
  window.startNewSequence(); // Function is now accessible via window
  expect(window.gameState.pattern.length).toBeGreaterThan(0); // Ensure a new pattern is generated
  expect(window.gameState.playerPattern.length).toBe(0); // Player's pattern should be reset
});

// Test to simulate user input
test('should process user input correctly', () => {
  const mockEvent = { target: { id: 'circle1' } };

  window.processUserInput(mockEvent); // Function is now accessible via window

  expect(window.gameState.playerPattern.length).toBe(1); // Ensure the player pattern has been updated
  expect(window.gameState.playerPattern[0]).toBe('circle1'); // Ensure correct button was added
});

// Test for incorrect user input (game over)
test('should trigger game over when user input is incorrect', () => {
  window.gameState.pattern = ['circle1'];
  window.gameState.playerPattern = ['circle2'];

  window.triggerGameOver(); // Function is now accessible via window

  expect(document.getElementById('final-score').textContent).toBe('0');
  expect(document.getElementById('final-level').textContent).toBe('1');
  expect(document.getElementById('game-over').style.display).toBe('block');
});

// Test to ensure the button highlight works correctly
test('should highlight a button correctly', () => {
  const mockSetTimeout = jest.fn();
  global.setTimeout = mockSetTimeout; // Mock setTimeout function

  const mockButton = { classList: { add: jest.fn(), remove: jest.fn() } };
  document.getElementById = jest.fn().mockReturnValue(mockButton);
  window.highlightButton('circle1'); // Function is now accessible via window

  expect(mockButton.classList.add).toHaveBeenCalledWith('light');
  expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 400);
});
