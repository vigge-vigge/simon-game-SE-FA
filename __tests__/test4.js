const app = require('../js/app.js'); // Adjust path as necessary

describe('Correct Button Click Progression', () => {
    let startButton;
    let levelText;
    let statusText;
  
    beforeEach(() => {
      document.body.innerHTML = `
        <div>
          <h2>Simon Game</h2>
          <button data-key="0" data-light="btn-lightgreen" type="button" class="button btn-green"></button>
          <button data-key="1" data-light="btn-lightred" type="button" class="button btn-red"></button>
          <button data-key="2" data-light="btn-lightyellow" type="button" class="button btn-yellow"></button>
          <button data-key="3" data-light="btn-lightblue" type="button" class="button btn-blue"></button>
          <p id="level">Current Level: 1&nbsp;&nbsp;&nbsp;Best Level: 1</p>
          <b id="status" style="color:black;font-size:20px">Click Start to play!</b>
          <button id="start" class="btn-start" type="button">Start</button>
        </div>
      `;
      startButton = document.getElementById('start');
      levelText = document.getElementById('level');
      statusText = document.getElementById('status');
      require('./js/app.js'); // Include the game logic
    });
  
    test('Should progress to the next level on correct button clicks', async () => {
      // Start the game
      startButton.click();
      
      // Simulate the game blinking sequence
      await runQuestion([0, 1]); // example answer
  
      // Simulate user clicking the correct sequence of buttons
      const greenButton = document.querySelector('button[data-key="0"]');
      greenButton.click();
  
      const redButton = document.querySelector('button[data-key="1"]');
      redButton.click();
  
      // Verify the game has progressed
      expect(levelText.textContent).toContain('Current Level: 2');
      expect(statusText.textContent).toBe('Good Job! Click Start to begin level 2 challenge!');
    });
  });
  