import * as pieceUtil from "./piece_util";

export const shouldPieceBeMovedByUser = (decision, piece) => {
  const delta = pieceUtil.generateMoveDelta(decision);
  if (!isPieceInBounds(decision, piece)) {
    return false;
  }

  const possibleNextPiece = pieceUtil.generateUserMoveCollection(piece, delta);
  return !isCollision(piece, possibleNextPiece);
};

const isPieceInBounds = (decision, piece) => {
  const delta = pieceUtil.generateMoveDelta(decision);
  let collection = $d();
  let newXpos, HTMLel, newYpos;
  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute("x-pos")) + delta[0];
    newYpos = parseInt(HTMLel.getAttribute("y-pos")) + delta[1];
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
  }
  return true;
};

const isCollision = (currentPiece, possibleNextPiece) => {
  possibleNextPiece = possibleNextPiece.HTMLels.filter(HTMLel => {
    return !currentPiece.HTMLels.includes(HTMLel);
  });

  const doesPieceOverlap = possibleNextPiece.reduce(
    (acc, el) => acc || el.getAttribute("isPiece") === "true",
    false
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
  let { startXpos, shapeId, yPos } = pieceUtil.getAttributes(piece);
  const deltas = pieceUtil.generatePieceDeltas(shapeId, newOrientation);
  const possibleRotatedPiece = pieceUtil.generateCollection(
    startXpos,
    yPos,
    deltas
  );
  let HTMLel, newXpos, newYpos;
  if (isCollision(piece, possibleRotatedPiece)) {
    return false;
  }

  for (let i = 0; i < possibleRotatedPiece.HTMLels.length; i++) {
    HTMLel = possibleRotatedPiece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute("x-pos"));
    newYpos = parseInt(HTMLel.getAttribute("y-pos"));
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
  }
  return true;
};

export const shouldPieceMoveAgain = piece => {
  let { startXpos, shapeId, yPos } = pieceUtil.getAttributes(piece);

  if (!isPieceInBounds("down", piece)) {
    return false;
  }

  let possibleNextPiece = pieceUtil.generateUserMoveCollection(piece, [0, -1]);
  const doesPieceCollide = isCollision(piece, possibleNextPiece);

  return !doesPieceCollide;
};

export const isGameOver = collection => {
  return collection.HTMLels.reduce((acc, el) => {
    return acc || el.getAttribute("isPiece") === "true";
  }, false);
};
