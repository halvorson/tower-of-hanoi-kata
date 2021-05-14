//
const args = process.argv.slice(2);

//array of arrays. Each of these will hold a (legal) stack (e.g., [[3,2,1],[],[]])
const discsOnSticks = [[], [], []];

hanoi = (numDiscs, targetPeg, sourcePeg, otherPeg) => {
  if (numDiscs > 0) {
    hanoi(numDiscs - 1, otherPeg, sourcePeg, targetPeg);
    console.log(discsOnSticks);
    discsOnSticks[targetPeg].push(discsOnSticks[sourcePeg].pop());
    hanoi(numDiscs - 1, targetPeg, otherPeg, sourcePeg);
  }

  return;
};

initialSetup = (numDiscs, sourcePeg) => {
  for (let i = 0; i < numDiscs; i++) {
    discsOnSticks[sourcePeg].unshift(i + 1);
  }
  //console.log(discsOnSticks);
  return;
};

findOtherPeg = (targetPeg, sourcePeg, otherPeg) => {
  otherPeg == null ? (otherPeg = 0) : null;

  if (otherPeg == targetPeg || otherPeg == sourcePeg) {
    otherPeg = findOtherPeg(targetPeg, sourcePeg, ++otherPeg);
  }

  return otherPeg;
};

main = (numDiscs, targetPeg, sourcePeg) => {
  //console.log("I'm alive");
  initialSetup(numDiscs, sourcePeg);

  let otherPeg = findOtherPeg(targetPeg, sourcePeg);

  hanoi(numDiscs, targetPeg, sourcePeg, otherPeg);

  console.log(discsOnSticks);
};

let numDiscsInput, targetPegInput, sourcePegInput;

try {
  numDiscsInput = parseInt(args[0]);
  targetPegInput = parseInt(args[1]);
  sourcePegInput = parseInt(args[2]);
} catch (e) {
  console.log(
    "Invalid inputs. Syntax is 'node index.js A B C' where A = numDiscs, B = targetPeg, C = sourcePeg"
  );
  console.log(e);
  return;
}

// Probably should do some more input checking here (target & source pegs between 0 and 2 and not the same), number of discs > 0

main(numDiscsInput, targetPegInput, sourcePegInput);
