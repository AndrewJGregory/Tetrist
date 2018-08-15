import * as collisionUtil from "./collision_detection_util";

export const generateStartPiece = () => {
  const startXpos = 5;
  const yPos = 18;
  const shapeId = Math.floor(Math.random() * 7);
  const orientation = 0;
  return generatePiece(startXpos, yPos, shapeId, orientation);
***REMOVED***

export const generateNextPiece = piece => {
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
  0: "red",
  1: "orange",
  2: "yellow",
  3: "blue",
  4: "purple",
  5: "white",
  6: "pink"
***REMOVED***

export const generatePieceDeltas = (shapeId, orientation) => {
  return pieceDeltas[shapeId][orientation];
***REMOVED***

const pieceDeltas = {
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
***REMOVED***

export const generateMoveDelta = decision => {
  return moveDeltas[decision];
***REMOVED***

const moveDeltas = {
  left: [-1, 0],
  right: [1, 0],
  down: [0, -1]
***REMOVED***

export const movePieceByUser = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  const collection = generateUserMoveCollection(piece, delta);
  const shapeId = piece.attr("shape-id");
  return finalizePiece(collection, shapeId);
***REMOVED***

export const generateRotatedPiece = (piece, orientation) => {
  const { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, deltas);
  return finalizePiece(collection, shapeId);
***REMOVED***

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
***REMOVED***

export const generateCollection = (startXpos, yPos, deltas) => {
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

export const finalizePiece = (collection, shapeId) => {
  const color = generateColor(shapeId);
  collection.addClass(`${color}`);
  collection.addClass("moving");
  collection.attr("shape-id", shapeId);
  collection.attr("isPiece", true);
  return collection;
***REMOVED***

export const getAttributes = piece => {
  let startXpos = parseInt(piece.attr("x-pos"));
  let shapeId = parseInt(piece.attr("shape-id"));
  let yPos = parseInt(piece.attr("y-pos"));
  return { startXpos, shapeId, yPos ***REMOVED***
***REMOVED***

export const makeColorsArray = () => {
  return ["red", "orange", "yellow", "blue", "purple", "white", "pink"];
***REMOVED***

const createMockInvalidPiece = () => {
  const invalidPiece = $d
    .create("div")
    .attr("y-pos", -1)
    .attr("x-pos", -1);
  return invalidPiece;
***REMOVED***
