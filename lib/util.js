export const generateStartPiece = () => {
  const startXpos = 4;
  let yPos = 14;
  const shapeId = Math.floor(Math.random()*7);
  const shapeIdsSpawnAtTop = [0, 3, 4, 5, 6];
  const orientation = 0;
  if (shapeIdsSpawnAtTop.includes(shapeId)) {
    yPos = 20;
  }
  return generatePiece(startXpos, yPos, shapeId, orientation);
};

export const generateNextPiece = (piece, orientation) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  return generatePiece(startXpos, yPos, shapeId, orientation);
};

const generatePiece = (startXpos, yPos, shapeId, orientation) => {
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, shapeId, deltas);
  return finalizePiece(collection, shapeId);
};

export const generateColor = shapeId => {
  return colors[shapeId];
};

const colors = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'blue',
  4: 'purple',
  5: 'white',
  6: 'black'
};

const generatePieceDeltas = (shapeId, orientation) => {
  return pieceDeltas[shapeId][orientation];
};

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
};

const generateMoveDelta = decision => {
  return moveDeltas[decision];
};

const moveDeltas = {
  'left': [-1, 0],
  'right': [1, 0],
  'down': [0, -1]
};

export const movePieceByUser = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  const collection = generateUserMoveCollection(piece, delta);
  const shapeId = piece.attr('shape-id');
  return finalizePiece(collection, shapeId);
};

export const generateRotatedPiece = (piece, orientation) => {
  const { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, shapeId, deltas);
  return finalizePiece(collection, shapeId);
};

const generateUserMoveCollection = (piece, delta) => {
  let collection = $d();
  let newSqPos;
  let newSq;
  let newYpos;
  let newXpos;
  let shapeId = piece.attr('shape-id');
  let HTMLel;
  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  return collection;
};


export const shouldPieceBeMovedByUser = (decision, piece, orientation) => {
  return isPieceInBounds(decision, piece) &&
  shouldPieceMoveAgain(piece, orientation);
};

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
};

const generateCollection = (startXpos, yPos, shapeId, deltas) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, delta, newXpos;
  for (let i = 0; i < deltas.length; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    newXpos = startXpos + delta[0];
    if (newYpos < 0) {
      return false;
    }

    newSqPos = String(newXpos) + String(newYpos);

    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  return collection;
};

const finalizePiece = (collection, shapeId) => {
  const color = generateColor(shapeId);
  collection.addClass(`${color}`);
  collection.addClass('moving');
  collection.attr('shape-id', shapeId);
  collection.attr('isPiece', true);
  return collection;
};

export const shouldPieceMoveAgain = (piece, orientation) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  let possibleNextPiece = generateCollection(startXpos, yPos, shapeId, deltas);
  if (!possibleNextPiece) {
    return false;
  }

  const allColors = [];
  for (let i = 0; i < 7; i++) {
    allColors.push(generateColor(i));
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
};

const getAttributes = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  return { startXpos, shapeId, yPos };
};
