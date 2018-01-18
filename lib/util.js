export const generateStartPiece = () => {
  const startXpos = 3;
  const yPos = 20;
  const shapeId = 5;
  return generatePiece(startXpos, yPos, shapeId);
***REMOVED***

export const generateNextPiece = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  return generatePiece(startXpos, yPos, shapeId);
***REMOVED***

const generatePiece = (startXpos, yPos, shapeId) => {
  const collection = generateCollection(startXpos, yPos, shapeId);
  return finalizePiece(collection, shapeId);
***REMOVED***


export const generateColor = shapeId => {
  return colors[shapeId];
***REMOVED***

const colors = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'blue',
  4: 'purple',
  5: 'white',
  6: 'black'
***REMOVED***

const generatePieceDeltas = shapeId => {
  return pieceDeltas[shapeId];
***REMOVED***

const pieceDeltas = {
  0: [[0, -1], [1, -1], [2, -1], [3, -1]],
  1: [[0, -1], [0, 0], [-1, -1], [1, -1]],
  2: [[0, -1], [0, 0], [1, 0], [1, -1]],
  3: [[0, -1], [1, -1], [2, -1], [2, -2]],
  4: [[0, -1], [-1, -1], [-2, -1], [-2, -2]],
  5: [[0, -1], [0, -2], [1, -1], [-1, -2]],
  6: [[0, -1], [0, -2], [-1, -1], [1, -2]]
  // 0: I, 1: T, 2: O, 3: J, 4: L, 5: S, 6: Z
***REMOVED***

const generateCollection = (startXpos, yPos, shapeId) => {
  const deltas = generatePieceDeltas(shapeId);
  let collection = $d();
  let newSqPos;
  let newSq;
  deltas.forEach(delta => {
    newSqPos = String(startXpos + delta[0]) + String(yPos + delta[1]);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  });
  return collection;
***REMOVED***

const finalizePiece = (collection, shapeId) => {
  const color = generateColor(shapeId);
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
***REMOVED***

export const shouldPieceMoveAgain = piece => {
  const isPieceAtBottom = (parseInt(piece.attr('y-pos')) <= 0);

***REMOVED***
