export const generateStartPiece = () => {
  const startXpos = 3;
  const yPos = 20;
  const shapeId = Math.floor(Math.random()*7);
  return generatePiece(startXpos, yPos, shapeId);
***REMOVED***

export const generateNextPiece = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  return generatePiece(startXpos, yPos, shapeId);
***REMOVED***

const generatePiece = (startXpos, yPos, shapeId) => {
  let piece;
  switch (shapeId) {
    case 0:
    return generateI(startXpos, yPos, shapeId);
    case 1:
    return generateT(startXpos, yPos, shapeId);
    case 2:
    return generateO(startXpos, yPos, shapeId);
    case 3:
    return generateJ(startXpos, yPos, shapeId);
    case 4:
    return generateL(startXpos, yPos, shapeId);
    case 5:
    return generateS(startXpos, yPos, shapeId);
    case 6:
    return generateZ(startXpos, yPos, shapeId);
    default:
    return null;
  }
***REMOVED***

const generateColor = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'blue',
  4: 'purple',
  5: 'green',
  6: 'black'
***REMOVED***

const finalizePiece = (collection, shapeId) => {
  const color = generateColor[shapeId];
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
***REMOVED***

const generateI = (startXpos, yPos, shapeId) => {
  let digits;
  let collection = $d();
  let counter = 0;
  let nextSq;
  for (let pos = startXpos; counter < 4; pos++) {
    digits = String(pos) + String(yPos - 1);
    nextSq = $d(`.pos${digits}`);
    collection.concat(nextSq);
    counter++;
  }

  return finalizePiece(collection, shapeId);
***REMOVED***

const generateT = (startXpos, yPos, shapeId) => {
  let collection = $d();

  const newTopMidSqPos = String(startXpos) + String(yPos - 1);
  const newTopMidSq = $d(`.pos${newTopMidSqPos}`);
  collection.concat(newTopMidSq);

  const newBottomMidSqPos = String(startXpos) + String(yPos - 0);
  const newBottomMidSq = $d(`.pos${newBottomMidSqPos}`);
  collection.concat(newBottomMidSq);

  const newLeftSqPos = String(startXpos - 1) + String(yPos - 1);
  const newLeftSq = $d(`.pos${newLeftSqPos}`);
  collection.concat(newLeftSq);

  const newRightSqPos = String(startXpos + 1) + String(yPos - 1);
  const newRightSq = $d(`.pos${newRightSqPos}`);
  collection.concat(newRightSq);

  return finalizePiece(collection, shapeId);
***REMOVED***

const generateO = (startXpos, yPos, shapeId) => {
  let collection = $d();

  const newUpperLeftSqPos = String(startXpos) + String(yPos - 1);
  const newUpperLeftSq = $d(`.pos${newUpperLeftSqPos}`);
  collection.concat(newUpperLeftSq);

  const newLowerLeftSqPos = String(startXpos) + String(yPos);
  const newLowerLeftSq = $d(`.pos${newLowerLeftSqPos}`);
  collection.concat(newLowerLeftSq);

  const newUpperRightSqPos = String(startXpos + 1) + String(yPos);
  const newUpperRightSq = $d(`.pos${newUpperRightSqPos}`);
  collection.concat(newUpperRightSq);

  const newLowerRightSqPos = String(startXpos + 1) + String(yPos - 1);
  const newLowerRightSq = $d(`.pos${newLowerRightSqPos}`);
  collection.concat(newLowerRightSq);

  return finalizePiece(collection, shapeId);
***REMOVED***

const generateJ = (startXpos, yPos, shapeId) => {
  let collection = $d();

  const newTopLeftSqPos = String(startXpos) + String(yPos - 1);
  const newTopLeftSq = $d(`.pos${newTopLeftSqPos}`);
  collection.concat(newTopLeftSq);

  const newTopMidSqPos = String(startXpos + 1) + String(yPos - 1);
  const newTopMidSq = $d(`.pos${newTopMidSqPos}`);
  collection.concat(newTopMidSq);

  const newTopRightSqPos = String(startXpos + 2) + String(yPos - 1);
  const newTopRightSq = $d(`.pos${newTopRightSqPos}`);
  collection.concat(newTopRightSq);

  const newLowerRightSqPos = String(startXpos + 2) + String(yPos - 2);
  const newLowerRightSq = $d(`.pos${newLowerRightSqPos}`);
  collection.concat(newLowerRightSq);

  return finalizePiece(collection, shapeId);
***REMOVED***

const generateL = (startXpos, yPos, shapeId) => {
  let collection = $d();

  const newTopLeftSqPos = String(startXpos) + String(yPos - 1);
  const newTopLeftSq = $d(`.pos${newTopLeftSqPos}`);
  collection.concat(newTopLeftSq);

  const newTopMidSqPos = String(startXpos - 1) + String(yPos - 1);
  const newTopMidSq = $d(`.pos${newTopMidSqPos}`);
  collection.concat(newTopMidSq);

  const newTopRightSqPos = String(startXpos - 2) + String(yPos - 1);
  const newTopRightSq = $d(`.pos${newTopRightSqPos}`);
  collection.concat(newTopRightSq);

  const newLowerLeftSqPos = String(startXpos - 2) + String(yPos - 2);
  const newLowerLeftSq = $d(`.pos${newLowerLeftSqPos}`);
  collection.concat(newLowerLeftSq);

  return finalizePiece(collection, shapeId);
***REMOVED***

const generateS = (startXpos, yPos, shapeId) => {
  let collection = $d();

  const newTopMidSqPos = String(startXpos) + String(yPos - 1);
  const newTopMidSq = $d(`.pos${newTopMidSqPos}`);
  collection.concat(newTopMidSq);

  const newBottomMidSqPos = String(startXpos) + String(yPos - 2);
  const newBottomMidSq = $d(`.pos${newBottomMidSqPos}`);
  collection.concat(newBottomMidSq);

  const newRightSqPos = String(startXpos + 1) + String(yPos - 1);
  const newRightSq = $d(`.pos${newRightSqPos}`);
  collection.concat(newRightSq);

  const newLeftSqPos = String(startXpos - 1) + String(yPos - 2);
  const newLeftSq = $d(`.pos${newLeftSqPos}`);
  collection.concat(newLeftSq);

  return finalizePiece(collection, shapeId);
***REMOVED***

const generateZ = (startXpos, yPos, shapeId) => {
  let collection = $d();

  const newTopMidSqPos = String(startXpos) + String(yPos - 1);
  const newTopMidSq = $d(`.pos${newTopMidSqPos}`);
  collection.concat(newTopMidSq);

  const newBottomMidSqPos = String(startXpos) + String(yPos - 2);
  const newBottomMidSq = $d(`.pos${newBottomMidSqPos}`);
  collection.concat(newBottomMidSq);

  const newRightSqPos = String(startXpos - 1) + String(yPos - 1);
  const newRightSq = $d(`.pos${newRightSqPos}`);
  collection.concat(newRightSq);

  const newLeftSqPos = String(startXpos + 1) + String(yPos - 2);
  const newLeftSq = $d(`.pos${newLeftSqPos}`);
  collection.concat(newLeftSq);

  return finalizePiece(collection, shapeId);
***REMOVED***
