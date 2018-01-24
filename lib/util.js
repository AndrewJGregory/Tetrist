export const generateStartPiece = () => {
  const startXpos = 4;
  let yPos = 19;
  const shapeId = Math.floor(Math.random()*7);
  const shapeIdsSpawnAtTop = [0, 3, 4, 5, 6];
  const orientation = 0;
  if (shapeIdsSpawnAtTop.includes(shapeId)) {
    yPos = 20;
  }
  return generatePiece(startXpos, yPos, shapeId, orientation);
***REMOVED***

export const generateNextPiece = (piece) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  const collection = generateUserMoveCollection(piece, [0, -1]);
  return finalizePiece(collection, shapeId);
***REMOVED***

const generatePiece = (startXpos, yPos, shapeId, orientation) => {
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, deltas);
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
    [[0, 0], [0, 1], [1, 1], [-1, 0]],
    [[0, 0], [-1, 0], [-1, 1], [0, -1]],
    [[0, 0], [0, -1], [1, 0], [-1, -1]],
    [[0, 0], [0, 1], [1, 0], [1, -1]],
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
  const collection = generateCollection(startXpos, yPos, deltas);
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

  return collection;
***REMOVED***

export const shouldPieceBeMovedByUser = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  if (!isPieceInBounds(decision, piece)) {
    return false;
  }

  const possibleNextPiece = generateUserMoveCollection(piece, delta);
  return !isCollision(piece, possibleNextPiece);
***REMOVED***

const isPieceInBounds = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  let collection = $d();
  let newXpos, HTMLel, newYpos;
  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
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

const areCoordinatesInBounds = (xPos, yPos) => {
  if (xPos < 0 || xPos >= 10 || yPos < 0 || yPos >= 20) {
    return false;
  } else {
    return true;
  }
***REMOVED***

const generateCollection = (startXpos, yPos, deltas) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, delta, newXpos;
  for (let i = 0; i < deltas.length; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    newXpos = startXpos + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    try {
      newSq = $d(`.pos${newSqPos}`);
    } catch (e) {
      return createMockInvalidPiece();
    }
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

export const shouldPieceRotate = (piece, newOrientation) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, newOrientation);
  const possibleRotatedPiece = generateCollection(startXpos, yPos, deltas);
  let HTMLel, newXpos, newYpos;
  if (isCollision(piece, possibleRotatedPiece)) {
    return false;
  }

  for (let i = 0; i < possibleRotatedPiece.HTMLels.length; i++) {
    HTMLel = possibleRotatedPiece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute('x-pos'));
    newYpos = parseInt(HTMLel.getAttribute('y-pos'));
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
  }
  return true;
***REMOVED***

export const shouldPieceMoveAgain = (piece) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);

  if (!isPieceInBounds('down', piece)) {
    return false;
  }

  let possibleNextPiece = generateUserMoveCollection(piece, [0,-1]);
  let doesPieceCollide = isCollision(piece, possibleNextPiece);

  if (doesPieceCollide) {
    return false;
  }
  return true;
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

const createMockInvalidPiece = () => {
  const invalidPiece = $d.create('div').attr('y-pos', -1).attr('x-pos', -1);
  return invalidPiece;
***REMOVED***
