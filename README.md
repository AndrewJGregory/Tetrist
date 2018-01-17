# Tetrist

## Background

Tetrist is a twist on the classic arcade game of Tetris. The player is presented with a board with falling blocks on it. These can be moved or rotated to form rows, which are automatically cleared to score points.

## Functionality & MVP

With Tetrist, users will be able to:
  * Start, pause, and restart the game
  * Score points by clearing rows
  * The game will be over when any block reaches the top of the board
  * See the next piece that will fall

## Wireframes

![Tetrist Wireframe](http://res.cloudinary.com/procify/image/upload/v1516179907/Tetrist_gkajng.png)

"Next piece" will only be displayed after the game is started.

## Architecture & Technologies

The following technologies will be used:
  * JavaScript for game logic
  * Webpack to bundle JS files

In addition to the entry file `main.js`, there will be three scripts:
  * `board.js`: handles DOM-specific logic, renders blocks on the board
  * `piece.js`: handles creating a random piece
  * `player.js`: handles user input and score

## Implementation Timeline

**Day 1:** Get webpack running, an entry file, write basic outlines of aforementioned files.
  * Display a styled board, nav links, instructions
  * Create only one piece object (instead of various random shapes)
  * Get a piece to fall down the board with no user interaction
  * Piece should stop falling at the bottom of the board
  * Be able to move the piece (within the confines of the board) (keyboard interaction)

**Day 2:**
  * Collision detection between pieces (similar to moving a piece within the confines of the board)
  * A completed row should score a point and the row should clear, everything above moves down
  * Play/pause game
  * Generate random pieces (update displayed next piece)

**Day 3:**
  * Game over logic, when a piece is "over" the top of the board
  * Various difficulties, pieces can move faster or slower
  * Store scores using firebase
