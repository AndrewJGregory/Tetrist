export const generateStartPiece = () => {
  const startXpos = 4;
  const yPos = 19;
  const shapeId = Math.floor(Math.random()*7);
  return generatePiece(startXpos, yPos, shapeId);
***REMOVED***

export const generateNextPiece = piece => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
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
  let newYpos;
  let delta;
  for (let i = 0; i < 4; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    if (newYpos < 0) {
      return false;
    }
    newSqPos = String(startXpos + delta[0]) + String(newYpos);

    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  return collection;
***REMOVED***

const finalizePiece = (collection, shapeId) => {
  const color = generateColor(shapeId);
  collection.addClass(`${color}`);
  collection.addClass('moving');
  collection.attr('shape-id', shapeId);

  return collection;
***REMOVED***

export const shouldPieceMoveAgain = piece => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);

  let possibleNextPiece = generateCollection(startXpos, yPos, shapeId);
  if (!possibleNextPiece) {
    return false;
  }

  const allColors = [];
  for (let i = 0; i < 7; i++) {
    allColors.push(generateColor(i));
  }

  let collisionCount = 0;

  possibleNextPiece.HTMLels.forEach(HTMLel => {
    if (piece.HTMLels.includes(HTMLel)) {
      collisionCount++;
    }
  });

  if (shapeId === 2) {
    if (collisionCount > 2) {
      return false;
    }
  } else {
    if (collisionCount > 1) {
      return false;
    }
  }

  possibleNextPiece = possibleNextPiece.HTMLels.filter(HTMLel => {
    return !piece.HTMLels.includes(HTMLel);
  });

  possibleNextPiece = possibleNextPiece.map(el => Array.from(el.classList)).reduce((acc, el) => acc.concat(el), []);

  const isCollision = allColors.reduce((acc, el) => {
    return acc || possibleNextPiece.includes(el);
  }, false);

  if (isCollision) {
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
