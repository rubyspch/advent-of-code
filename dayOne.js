var fs = require("fs");
const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const replacements = [
  "o1e",
  "t2o",
  "th3ee",
  "fo4r",
  "f5ve",
  "s6x",
  "se7en",
  "ei8ht",
  "n9ne",
];
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  const array = data.split("\n");
  const answer = partTwo(array);
  console.log(answer);
});
const partTwo = (array) => {
  // make this call partOne to get the sum
  //so all you need to do here is convert the phrases to numbers
  const numArray = array.map((line) => {
    //if line includes the phrases
    let numLine = line;
    //check first 5 chars - is there a num in there? if not, check 2-6 and so on until the end of line. then you'll get the first one first.
    let length = line.length;
    for (let i = 0; i < length; i++) {
      const test = line.slice(i, i + 5);
      numbers.forEach((num) => {
        if (test.includes(num)) {
          numLine = numLine.replaceAll(num, replacements[numbers.indexOf(num)]);
        }
      });
    }
    return numLine;
    //replace the phrase with a number
  });
  //pass new array to partOne
  return partOne(numArray);
  //   return partOne(numArray);
};
const partOne = (array) => {
  // for each line
  // filter out the numbers
  // grab first and last digit...
  let sum = 0;
  array.forEach((line) => {
    const numbers = line.split("").filter((char) => Number(char));
    const firstLast = Number(numbers[0] + numbers[numbers.length - 1]);
    sum += firstLast;
  });
  return sum;
};
