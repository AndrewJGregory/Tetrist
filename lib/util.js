export const generatePiece = () => {
  const collection = $d('.pos320');
  let nextSq;
  for (let i = 4; i <= 6; i++) {
    nextSq = $d(`.pos${i}20`);
    collection.concat(nextSq);
  }
  return collection;
};
