export const generatePiece = () => {
  const collection = $d('.pos320');
  let nextSq;
  for (let i = 4; i <= 6; i++) {
    nextSq = $d(`.pos${i}20`);
    collection.concat(nextSq);
  }
  collection.attr('shape-id', 0);
  return collection;
};

export const generateNextShapes = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  switch (shapeId) {
    case 0:
    return generateI(startXpos, yPos, shapeId);
    case 1:
    return generateO(startXpos, yPos, shapeId);
    default:
    return null;
  }
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
  collection.addClass('isPiece');
  collection.attr('shape-id', shapeId);
  return collection;
};

const generateO = startXpos => {

};
