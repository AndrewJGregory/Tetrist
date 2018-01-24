# [Tetrist](http://www.andrewjgregoryajg.com/Tetrist/)

## Background

Tetrist is a remake of the classic arcade game of Tetris. The player is presented with a board with falling blocks on it. These can be moved or rotated to form rows, which are automatically cleared to score points.

## Basic rules
Pieces will fall and the user can move the pieces left, right, or down and rotate the pieces clockwise/counter-clockwise. The goal is to form rows of pieces, which will then be cleared and everything to score points.

## Implementation

Tetrist was implemented with [https://github.com/AndrewJGregory/DOMination](DOMination) and some vanilla JS.

### Board Creation
The board is a container with a fixed height and width. Squares are added to a row, then rows are appended to the board. A coordinate system is in place on the rows and the squares. This coordinate system is paramount to moving the pieces in any direction. The board is constructed as such:

```
generateRows() {
  let row;
  for (var y = 19; y >= 0; y--) {
    row = this.createRow(y);
    this.generateSquares(row, y);
    this.board.append(row);
  }
}

generateSquares(row, y) {
  let square;
  for (let x = 0; x < 10; x++) {
    square = this.createSquare(x, y);
    row.append(square);
  }
}

createSquare(x, y) {
  const square = $d.create('div').addClass('square');
  square.attr('x-pos', x);
  square.attr('y-pos', y);
  square.attr('isPiece', false);
  const position = 'pos' + String(x) + String(y);
  square.addClass(position);
  return square;
}

createRow(y) {
  const row = $d.create('div').addClass('row');
  row.attr('y-pos', y);
  const position = 'row-pos' + String(y);
  row.addClass(position);
  return row;
}
```

The position is stored as a class on a square, while the x position and y position are attributes.

### Piece Creation

In Tetrist, there are seven unique shapes. Each shape has an associated ID, and any piece can exist in one of four orientations. To draw a piece on the board, a starting X and Y coordinate is selected. Particular deltas are used to select the squares using the aforementioned coordinate system. Here's an example for the `shapeId` of 1, which is the T piece:

```
1: [
  [[0, -1], [0, 0], [-1, -1], [1, -1]],
  [[0, -1], [0, 0], [0, -2], [-1, -1]],
  [[0, -1], [0, 0], [-1, 0], [1, 0]],
  [[0, -1], [0, 0], [0, 1], [1, 0]]
],
```
