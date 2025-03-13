package org.example;

import org.junit.jupiter.api.Test;

import javax.swing.*;

import static org.junit.jupiter.api.Assertions.*;
import java.awt.event.ActionEvent;

public class SimonGameAppTest {

    // Test 1: Verify Sequence Generation
    @Test
    void testAddRandomColorToSequence() {
        SimonGameApp game = new SimonGameApp();
        game.addRandomColorToSequence();
        assertEquals(1, game.gameSequence.size(), "Sequence should have one color after adding.");
    }

    // Test 2: Verify User Sequence Validation
    @Test
    void testCheckUserSequence() {
        SimonGameApp game = new SimonGameApp();
        game.gameSequence.add(0); // Add a color to the game sequence
        game.userSequence.add(0); // Add the same color to the user sequence

        assertTrue(game.checkUserSequence(), "User sequence should match game sequence.");

        game.userSequence.set(0, 1); // Change the user sequence to a different color
        assertFalse(game.checkUserSequence(), "User sequence should not match game sequence.");
    }

    // Test 3: Verify Game Over Condition
    @Test
    void testGameOverCondition() {
        SimonGameApp game = new SimonGameApp();
        game.gameSequence.add(0); // Add a color to the game sequence
        game.userSequence.add(1); // Add a different color to the user sequence

        assertFalse(game.checkUserSequence(), "Game should detect incorrect user sequence.");
    }

    // Test 4: Verify Correct User Input Triggers Next Round
    @Test
    void testCorrectUserInputTriggersNextRound() {
        SimonGameApp game = new SimonGameApp();
        game.gameSequence.add(0); // Set initial sequence
        game.userTurn = true; // Simulate user's turn

        // Simulate correct user click
        SimonGameApp.ButtonClickListener listener = game.new ButtonClickListener(0);
        listener.actionPerformed(new ActionEvent(new JButton(), 0, ""));

        // Verify game progresses to next round
        assertEquals(2, game.gameSequence.size(), "New color should be added after correct input");
        assertTrue(game.userSequence.isEmpty(), "User sequence should reset after correct round");
        assertTrue(game.userTurn, "User turn should end until next sequence display");
    }

    // Test 5: Verify Incorrect User Input Ends Game
    @Test
    void testIncorrectUserInputEndsGame() {
        SimonGameApp game = new SimonGameApp();
        game.gameSequence.add(0); // Set initial sequence
        game.userTurn = true; // Simulate user's turn

        // Simulate incorrect user click
        SimonGameApp.ButtonClickListener listener = game.new ButtonClickListener(1);
        listener.actionPerformed(new ActionEvent(new JButton(), 0, ""));

        // Verify game over state
        assertFalse(game.userTurn, "User turn should end after incorrect input");
        assertTrue(game.getStartButton().isEnabled(), "Start button should be re-enabled");
        assertFalse(game.userSequence.isEmpty(), "User sequence should reset after game over");
    }
}