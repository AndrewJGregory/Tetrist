import * as collisionUtil from "./collision_detection_util";

export const generateFirstCollection = shapeId => {
  const startXpos = 5;
  let yPos = 18;
  const orientation = 0;
  const deltas = generatePieceDeltas(shapeId, orientation);
  if (shapeId === 0) yPos = 19;
  const collection = generateCollection(startXpos, yPos, deltas);
  collection.attr("shape-id", shapeId);
  return collection;
};

export const generateNextPiece = piece => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  const collection = generateUserMoveCollection(piece, [0, -1]);
  collection.attr("shape-id", shapeId);
  return collection;
};

export const generateColor = shapeId => {
  return COLORS[shapeId];
};

export const COLORS = [
  "red",
  "orange",
  "yellow",
  "blue",
  "purple",
  "white",
  "pink"
];

export const generatePieceDeltas = (shapeId, orientation) => {
  return pieceDeltas[shapeId][orientation];
};

export const pieceDeltas = {
  0: [
    [[0, 0], [-1, 0], [1, 0], [2, 0]],
    [[0, 0], [0, 1], [0, 2], [0, -1]],
    [[0, 0], [-1, 0], [1, 0], [2, 0]],
    [[1, 0], [1, 1], [1, 2], [1, -1]]
  ],
  1: [
    [[0, 0], [1, 0], [-1, 0], [0, 1]],
    [[0, 0], [0, 1], [0, -1], [-1, 0]],
    [[0, 0], [0, -1], [-1, 0], [1, 0]],
    [[0, 0], [0, 1], [0, -1], [1, 0]]
  ],
  2: [
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]]
  ],
  3: [
    [[0, 0], [-1, 0], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [0, -1], [-1, 1]],
    [[0, 0], [1, 0], [-1, 0], [-1, -1]],
    [[0, 0], [0, 1], [0, -1], [1, -1]]
  ],
  4: [
    [[0, 0], [-1, 0], [1, 0], [1, 1]],
    [[0, 0], [0, -1], [0, 1], [-1, 1]],
    [[0, 0], [1, 0], [-1, 0], [-1, -1]],
    [[0, 0], [0, 1], [0, -1], [1, -1]]
  ],
  5: [
    [[0, 0], [0, 1], [1, 1], [-1, 0]],
    [[0, 0], [-1, 0], [-1, 1], [0, -1]],
    [[0, 0], [0, -1], [1, 0], [-1, -1]],
    [[0, 0], [0, 1], [1, 0], [1, -1]]
  ],
  6: [
    [[0, 0], [0, 1], [-1, 1], [1, 0]],
    [[0, 0], [0, 1], [-1, 0], [-1, -1]],
    [[0, 0], [-1, 0], [0, -1], [1, -1]],
    [[0, 0], [0, -1], [1, 0], [1, 1]]
  ]
  // 0: I, 1: T, 2: O, 3: J, 4: L, 5: S, 6: Z
};

export const generateMoveDelta = decision => {
  return moveDeltas[decision];
};

const moveDeltas = {
  left: [-1, 0],
  right: [1, 0],
  down: [0, -1]
};

export const movePieceByUser = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  const collection = generateUserMoveCollection(piece, delta);
  const shapeId = piece.attr("shape-id");
  collection.attr("shape-id", shapeId);
  return collection;
};

export const generateRotatedPiece = (piece, orientation) => {
  const { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, deltas);
  return collection;
};

export const generateUserMoveCollection = (piece, delta) => {
  const collection = $d();
  let newSqPos, newSq, newYpos, newXpos, HTMLel;
  const { shapeId } = getAttributes(piece);

  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newYpos = parseInt(HTMLel.getAttribute("y-pos")) + delta[1];
    newXpos = parseInt(HTMLel.getAttribute("x-pos")) + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }

  return collection;
};

export const generateCollection = (
  startXpos,
  yPos,
  deltas,
  isNextPiecePreview = true
) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, delta, newXpos;
  for (let i = 0; i < deltas.length; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    newXpos = startXpos + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = isNextPiecePreview
      ? $d(`.pos${newSqPos}`)
      : $d(`.preview-pos${newSqPos}`);
    collection.concat(newSq);
  }
  return collection;
};

export const finalizePiece = (collection, color) => {
  collection.addClass(`${color}`);
  collection.addClass("moving");
  collection.attr("isPiece", true);
};

export const getAttributes = piece => {
  let startXpos = parseInt(piece.attr("x-pos"));
  let shapeId = parseInt(piece.attr("shape-id"));
  let yPos = parseInt(piece.attr("y-pos"));
  return { startXpos, shapeId, yPos };
};
