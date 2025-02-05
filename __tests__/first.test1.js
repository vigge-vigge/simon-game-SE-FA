const app = require('../js/app.js'); // Adjust path as necessary

describe('Start Game Button Initialization and Level Display Update', () => {
    let startButton;
    let levelText;
    let statusText;
  
    beforeEach(() => {
      document.body.innerHTML = `
        <div>
          <h2>Simon Game</h2>
          <button id="start" class="btn-start" type="button">Start</button>
          <p id="level">Current Level: 1&nbsp;&nbsp;&nbsp;Best Level: 1</p>
          <b id="status" style="color:black;font-size:20px">Click Start to play!</b>
        </div>
      `;
      startButton = document.getElementById('start');
      levelText = document.getElementById('level');
      statusText = document.getElementById('status');
      require('../js/app.js'); // Make sure your JS code is included here
    });
  
    test('Should update the level and best level on start', () => {
      // Initial checks
      expect(levelText.textContent).toBe('Current Level: 1 Best Level: 1');
      expect(statusText.textContent).toBe('Click Start to play!');
  
      // Simulate clicking the start button
      startButton.click();
  
      // After click, simulate some game progression
      expect(levelText.textContent).toContain('Current Level: 2'); // should be updated
      expect(statusText.textContent).toBe('Good Job! Click Start to begin level 2 challenge!'); // status updated
    });
  });
  