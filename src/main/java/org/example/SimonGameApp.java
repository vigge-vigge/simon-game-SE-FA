package org.example;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class SimonGameApp {
    static final int BUTTON_COUNT = 4;
    List<Integer> gameSequence;
    List<Integer> userSequence;
    Random random;
    private JButton[] buttons;
    private String playerName;
    private JButton startButton;
    boolean userTurn;
    private JFrame frame; // Declare the frame field

    public SimonGameApp() {
        gameSequence = new ArrayList<>();
        userSequence = new ArrayList<>();
        random = new Random();
        buttons = new JButton[BUTTON_COUNT];
        userTurn = false;

        // Initialize the frame
        frame = new JFrame("Simon Game"); // Initialize the frame field
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 400);
        frame.setLayout(new BorderLayout());

        // Welcome message and Start button
        JPanel topPanel = new JPanel();
        topPanel.setLayout(new FlowLayout());
        JLabel welcomeLabel = new JLabel("Welcome to Simon Game!");
        topPanel.add(welcomeLabel);

        // Start Button
        startButton = new JButton("Start Game");
        startButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                startGame(frame);
            }
        });
        topPanel.add(startButton);
        frame.add(topPanel, BorderLayout.NORTH);

        // Game button panel (colored buttons)
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(2, 2));

        String[] buttonLabels = {"Red", "Green", "Blue", "Yellow"};
        Color[] buttonColors = {Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW};

        for (int i = 0; i < BUTTON_COUNT; i++) {
            buttons[i] = new JButton();
            buttons[i].setBackground(buttonColors[i]);
            buttons[i].setFocusable(false);
            buttons[i].addActionListener(new ButtonClickListener(i));
            buttonPanel.add(buttons[i]);
        }

        frame.add(buttonPanel, BorderLayout.CENTER);
        frame.setVisible(true);
    }

    private void startGame(JFrame frame) {
        // Ask for player's name
        playerName = JOptionPane.showInputDialog(frame, "Enter your name:");

        // Validate name (not empty)
        if (playerName == null || playerName.trim().isEmpty()) {
            playerName = "Player";  // Default name if none entered
        }

        // Display greeting message
        JOptionPane.showMessageDialog(frame, "Hello, " + playerName + "!\nThe game will start now.");

        // Initialize game state
        gameSequence.clear();
        userSequence.clear();
        addRandomColorToSequence();
        showSequence();
        startButton.setEnabled(false); // Disable the start button during the game
    }

    void addRandomColorToSequence() {
        int randomColor = random.nextInt(BUTTON_COUNT);
        gameSequence.add(randomColor);
    }

    private void showSequence() {
        new Thread(() -> {
            for (int i = 0; i < gameSequence.size(); i++) {
                int colorIndex = gameSequence.get(i);
                blinkButton(colorIndex);  // Blink the button
                try {
                    Thread.sleep(800); // Wait for the blink duration
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            userTurn = true; // Allow the user to start clicking buttons after sequence is shown
            enableButtons();
        }).start();
    }

    private void blinkButton(int colorIndex) {
        Color originalColor = buttons[colorIndex].getBackground();

        // Timer to alternate color between original and darker color
        Timer timer = new Timer(200, e -> {
            if (buttons[colorIndex].getBackground().equals(originalColor)) {
                buttons[colorIndex].setBackground(originalColor.darker()); // Make the button darker
            } else {
                buttons[colorIndex].setBackground(originalColor); // Reset to original color
            }
        });

        timer.setRepeats(true);  // Keep toggling the color
        timer.start();

        // Wait for the blinking to finish before stopping the timer
        try {
            Thread.sleep(500); // Blink for a brief time (adjust to your needs)
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        timer.stop();  // Stop the blinking after a brief time
    }

    private void enableButtons() {
        for (JButton button : buttons) {
            button.setEnabled(true);
        }
    }

    private void disableButtons() {
        for (JButton button : buttons) {
            button.setEnabled(false);
        }
    }

    boolean checkUserSequence() {
        return userSequence.equals(gameSequence);
    }

    class ButtonClickListener implements ActionListener {
        private int buttonIndex;

        public ButtonClickListener(int index) {
            this.buttonIndex = index;
        }

        @Override
        public void actionPerformed(ActionEvent e) {
            if (!userTurn) return; // Don't allow clicks if it's not the user's turn

            // Add the clicked button's color to the user's sequence
            userSequence.add(buttonIndex);

            // Disable buttons while checking
            disableButtons();

            // Check if the user's sequence matches the game sequence so far
            if (userSequence.size() <= gameSequence.size()) {
                if (!gameSequence.get(userSequence.size() - 1).equals(userSequence.get(userSequence.size() - 1))) {
                    // If the user's click is wrong, game over
                    JOptionPane.showMessageDialog(null, "Game Over, " + playerName + ". You lost! Click 'Start Game' to try again.");
                    disableButtons(); // Disable all buttons
                    startButton.setEnabled(true); // Allow starting a new game
                    userTurn = false; // Prevent further button clicks
                } else {
                    // If the user's click is correct, keep playing
                    if (userSequence.size() == gameSequence.size()) {
                        JOptionPane.showMessageDialog(null, "Correct! Great job, " + playerName + ". Starting next round.");
                        userSequence.clear();
                        addRandomColorToSequence();
                        showSequence();
                    } else {
                        // Wait for the user to continue clicking
                        enableButtons();
                    }
                }
            }
        }
    }

    // Getter for startButton to use in tests
    public JButton getStartButton() {
        return startButton;
    }

    // Main method to launch the application
    public static void main(String[] args) {
        // Use SwingUtilities.invokeLater to ensure the GUI is created on the Event Dispatch Thread
        SwingUtilities.invokeLater(() -> new SimonGameApp());
    }
}