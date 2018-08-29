import * as pieceUtil from "./piece_util";

export const shouldPieceBeMovedByUser = (decision, piece) => {
  const delta = pieceUtil.generateMoveDelta(decision);
  if (!isPieceInBounds(decision, piece)) {
    return false;
  }

  const possibleNextPiece = pieceUtil.generateUserMoveCollection(piece, delta);
  return !isCollision(piece.collection, possibleNextPiece);
};

const isPieceInBounds = (decision, piece) => {
  const delta = pieceUtil.generateMoveDelta(decision);
  let collection = $d();
  let newXpos, HTMLel, newYpos;
  for (let i = 0; i < piece.collection.HTMLels.length; i++) {
    HTMLel = piece.collection.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute("x-pos")) + delta[0];
    newYpos = parseInt(HTMLel.getAttribute("y-pos")) + delta[1];
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
  }
  return true;
};

const isCollision = (currentCollection, possibleNextCollection) => {
  possibleNextCollection = possibleNextCollection.HTMLels.filter(HTMLel => {
    return !currentCollection.HTMLels.includes(HTMLel);
  });

  const doesPieceOverlap = possibleNextCollection.some(
    el => el.getAttribute("isPiece") === "true"
  );

  return doesPieceOverlap;
};

const areCoordinatesInBounds = (xPos, yPos) => {
  if (xPos < 0 || xPos >= 10 || yPos < 0 || yPos >= 20) {
    return false;
  } else {
    return true;
  }
};

export const shouldPieceRotate = (piece, newOrientation) => {
  let { startXpos, yPos } = pieceUtil.getAttributes(piece);
  const deltas = pieceUtil.generatePieceDeltas(piece.shapeId, newOrientation);
  let possibleRotatedCollection = $d();
  let newSqPos, newSq, newYpos, delta, newXpos;
  for (let i = 0; i < deltas.length; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    newXpos = startXpos + delta[0];
    if (!areCoordinatesInBounds(newXpos, newYpos)) return false;
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    possibleRotatedCollection.concat(newSq);
  }
  if (isCollision(piece.collection, possibleRotatedCollection)) return false;

  return true;
};

export const shouldPieceMoveAgain = piece => {
  let { startXpos, yPos } = pieceUtil.getAttributes(piece);
  let shapeId = piece.shapeId;

  if (!isPieceInBounds("down", piece)) {
    return false;
  }

  let possibleNextPiece = pieceUtil.generateUserMoveCollection(piece, [0, -1]);
  const doesPieceCollide = isCollision(piece.collection, possibleNextPiece);

  return !doesPieceCollide;
};
