export const generateStartPiece = () => {
  const startXpos = 4;
  let yPos = 19;
  const shapeId = 5;
  const shapeIdsSpawnAtTop = [0, 3, 4, 5, 6];
  const orientation = 0;
  if (shapeIdsSpawnAtTop.includes(shapeId)) {
    yPos = 20;
  }
  return generatePiece(startXpos, yPos, shapeId, orientation);
***REMOVED***

export const generateNextPiece = (piece, orientation) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  return generatePiece(startXpos, yPos, shapeId, orientation);
***REMOVED***

const generatePiece = (startXpos, yPos, shapeId, orientation) => {
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, shapeId, deltas);
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
  6: 'pink'
***REMOVED***

const generatePieceDeltas = (shapeId, orientation) => {
  return pieceDeltas[shapeId][orientation];
***REMOVED***

const pieceDeltas = {
  0: [
    [[0, -1], [1, -1], [2, -1], [3, -1]],
    [[0, -1], [0, 0], [0, 1], [0, 2]],
    [[0, -1], [1, -1], [2, -1], [3, -1]],
    [[0, -1], [0, 0], [0, 1], [0, 2]],
  ],
  1: [
    [[0, -1], [0, 0], [-1, -1], [1, -1]],
    [[0, -1], [0, 0], [0, -2], [-1, -1]],
    [[0, -1], [0, 0], [-1, 0], [1, 0]],
    [[0, -1], [0, 0], [0, 1], [1, 0]]
  ],
  2: [
    [[0, -1], [0, 0], [1, 0], [1, -1]],
    [[0, -1], [0, 0], [1, 0], [1, -1]],
    [[0, -1], [0, 0], [1, 0], [1, -1]],
    [[0, -1], [0, 0], [1, 0], [1, -1]],
  ],
  3: [
    [[0, -1], [1, -1], [2, -1], [2, -2]],
    [[0, -1], [1, -1], [1, 0], [1, 1]],
    [[0, -1], [1, -1], [2, -1], [0, 0]],
    [[0, -1], [0, -2], [0, -3], [1, -1]],
  ],
  4: [
    [[0, -1], [-1, -1], [-2, -1], [-2, -2]],
    [[0, -1], [-1, -1], [-1, 0], [-1, 1]],
    [[0, -1], [0, 0], [-1, -1], [-2, -1]],
    [[0, -1], [0, -2], [-1, -1], [0, -3]]
  ],
  5: [
    [[0, -1], [0, -2], [1, -1], [-1, -2]],
    [[0, -1], [0, -2], [1, -2], [1, -3]],
    [[0, -1], [0, -2], [1, -1], [-1, -2]],
    [[0, -1], [0, -2], [1, -2], [1, -3]],

  ],
  6: [
    [[0, -1], [0, -2], [-1, -1], [1, -2]],
    [[0, -1], [0, -2], [-1, -2], [-1, -3]],
    [[0, -1], [0, -2], [-1, -1], [1, -2]],
    [[0, -1], [0, -2], [-1, -2], [-1, -3]],
  ]
  // 0: I, 1: T, 2: O, 3: J, 4: L, 5: S, 6: Z
***REMOVED***

const generateMoveDelta = decision => {
  return moveDeltas[decision];
***REMOVED***

const moveDeltas = {
  'left': [-1, 0],
  'right': [1, 0],
  'down': [0, -1]
***REMOVED***

export const movePieceByUser = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  const collection = generateUserMoveCollection(piece, delta);
  const shapeId = piece.attr('shape-id');
  return finalizePiece(collection, shapeId);
***REMOVED***

export const generateRotatedPiece = (piece, orientation) => {
  const { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, shapeId, deltas);
  return finalizePiece(collection, shapeId);
***REMOVED***

const generateUserMoveCollection = (piece, delta) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, newXpos, HTMLel, doesPieceCollide;
  let shapeId = piece.attr('shape-id');

  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  doesPieceCollide = isCollision(piece, collection);
  if (doesPieceCollide) {
    return false;
  }
  return collection;
***REMOVED***


export const shouldPieceBeMovedByUser = (decision, piece, orientation) => {
  const delta = generateMoveDelta(decision);
  return isPieceInBounds(decision, piece) &&
  shouldPieceMoveAgain(piece, orientation) &&
  generateUserMoveCollection(piece, delta);
***REMOVED***

const isPieceInBounds = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  let collection = $d();
  let newXpos;
  let HTMLel;
  let newYpos;
  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    if (newXpos < 0 || newXpos > 9 || newYpos < 0) {
      return false;
    }
  }
  return true;
***REMOVED***

const generateCollection = (startXpos, yPos, shapeId, deltas) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, delta, newXpos;
  for (let i = 0; i < deltas.length; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    newXpos = startXpos + delta[0];
    if (newYpos < 0 || newYpos >= 20 || newXpos < 0 || newXpos >= 10) {
      return false;
    }

    newSqPos = String(newXpos) + String(newYpos);

    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  return collection;
***REMOVED***

const finalizePiece = (collection, shapeId) => {
  const color = generateColor(shapeId);
  if (isGameOver(collection)) {
    return false;
  } else {
    collection.addClass(`${color}`);
    collection.addClass('moving');
    collection.attr('shape-id', shapeId);
    collection.attr('isPiece', true);
    return collection;
  }
***REMOVED***

const isGameOver = (collection) => {
  return collection.HTMLels.reduce((acc, el) => {
    return acc || (el.getAttribute('isPiece') === 'true');
  }, false);
***REMOVED***

export const shouldPieceMoveAgain = (piece, orientation) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  let possibleNextPiece = generateCollection(startXpos, yPos, shapeId, deltas);
  if (!possibleNextPiece) {
    return false;
  }
  let doesPieceCollide = isCollision(piece, possibleNextPiece);

  if (doesPieceCollide) {
    return false;
  }
  return true;
***REMOVED***

const isCollision = (currentPiece, possibleNextPiece) => {
  possibleNextPiece = possibleNextPiece.HTMLels.filter(HTMLel => {
    return !currentPiece.HTMLels.includes(HTMLel);
  });

  if (possibleNextPiece.reduce((acc, el) => {
    return acc || (el.getAttribute('isPiece') === 'true');
  }, false)) {
    return true;
  }
  return false;
***REMOVED***

const getAttributes = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  return { startXpos, shapeId, yPos ***REMOVED***
***REMOVED***

export const makeColorsArray = () => {
  return ['red', 'orange',
  'yellow', 'blue',
  'purple', 'white',
  'pink'];
***REMOVED***
