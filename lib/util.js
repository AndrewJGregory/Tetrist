export const isPiece = square => {
  if (square instanceof HTMLElement) {
    return Boolean(parseInt(square.getAttribute('ispiece')));
  } else {
    return Boolean(parseInt(square.attr('ispiece')));
  }
};

export const generatePiece = () => {
  const collection = $d('.pos320');
  let nextSq;
  for (let i = 4; i <= 6; i++) {
    nextSq = $d(`.pos${i}20`);
    collection.concat(nextSq);
  }
  return collection;
};
