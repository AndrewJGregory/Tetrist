export const isPiece = square => {
   if (square instanceof HTMLElement) {
     return Boolean(parseInt(square.getAttribute('ispiece')));
   } else {
     return Boolean(parseInt(square.attr('ispiece')));
   }
***REMOVED***
