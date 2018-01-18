export const generateStartPiece = () => {
  const startXpos = 3;
  const yPos = 20;
  const shapeId = Math.floor(Math.random()*7);
  return generatePiece(startXpos, yPos, shapeId);
};

export const generateNextPiece = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  return generatePiece(startXpos, yPos, shapeId);
};

const generatePiece = (startXpos, yPos, shapeId) => {
  let piece;
  switch (shapeId) {
    case 0:
    piece = generateI(startXpos, yPos, shapeId);
    break;
    case 1:
    piece = generateT(startXpos, yPos, shapeId);
    break;
    case 2:
    piece = generateO(startXpos, yPos, shapeId);
    break;
    case 3:
    piece = generateJ(startXpos, yPos, shapeId);
    break;
    case 4:
    piece = generateL(startXpos, yPos, shapeId);
    break;
    case 5:
    piece = generateS(startXpos, yPos, shapeId);
    break;
    case 6:
    piece = generateZ(startXpos, yPos, shapeId);
    break;
    default:
    return null;
  }
  const color = generateColor[shapeId];
  piece.addClass(`${color}`);
  return piece;
};

const generateColor = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'blue',
  4: 'purple',
  5: 'green',
  6: 'black'
};

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
  const color = generateColor[shapeId];
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
};

const generateT = (startXpos, yPos, shapeId) => {
  let collection = $d();

  const newTopMidSqPos = String(startXpos) + String(yPos - 2);
  const newTopMidSq = $d(`.pos${newTopMidSqPos}`);
  collection.concat(newTopMidSq);

  const newBottomMidSqPos = String(startXpos) + String(yPos - 1);
  const newBottomMidSq = $d(`.pos${newBottomMidSqPos}`);
  collection.concat(newBottomMidSq);

  const newLeftSqPos = String(startXpos - 1) + String(yPos - 2);
  const newLeftSq = $d(`.pos${newLeftSqPos}`);
  collection.concat(newLeftSq);

  const newRightSqPos = String(startXpos + 1) + String(yPos - 2);
  const newRightSq = $d(`.pos${newRightSqPos}`);
  collection.concat(newRightSq);

  const color = generateColor[shapeId];
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
};

const generateO = (startXpos, yPos, shapeId) => {
  let collection = $d();

  const newUpperLeftSqPos = String(startXpos) + String(yPos - 2);
  const newUpperLeftSq = $d(`.pos${newUpperLeftSqPos}`);
  collection.concat(newUpperLeftSq);

  const newLowerLeftSqPos = String(startXpos) + String(yPos - 1);
  const newLowerLeftSq = $d(`.pos${newLowerLeftSqPos}`);
  collection.concat(newLowerLeftSq);

  const newUpperRightSqPos = String(startXpos + 1) + String(yPos - 1);
  const newUpperRightSq = $d(`.pos${newUpperRightSqPos}`);
  collection.concat(newUpperRightSq);

  const newLowerRightSqPos = String(startXpos + 1) + String(yPos - 2);
  const newLowerRightSq = $d(`.pos${newLowerRightSqPos}`);
  collection.concat(newLowerRightSq);

  const color = generateColor[shapeId];
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
};

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

  const color = generateColor[shapeId];
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
};

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

  const color = generateColor[shapeId];
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
};

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

  const color = generateColor[shapeId];
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
};

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

  const color = generateColor[shapeId];
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
};
