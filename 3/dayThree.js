var fs = require("fs");
//start line 1
//find the first number in the first line:
//use the index position of the number
//check if theres a symbol next to it on that same line
//if not, check those indexes +1 and -1 on the line above and below for a symbol
//if symbol is found then add the num to the total
//if symbol is not found then move on
//next number in the line
//at end of line move to next row
// const array = [
//   "467..114..",
//   "...*......",
//   "..35..633.",
//   "......#...",
//   "617*......",
//   ".....+.58.",
//   "..592.....",
//   "......755.",
//   "...$.*....",
//   ".664.598..",
// ];
fs.readFile("inputThree.txt", "utf8", (err, data) => {
  if (err) throw err;
  const array = data.split("\n");
  const answer = partOne(array);
  console.log(answer);
});
const partOne = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    //each line of the input
    for (let j = 0; j < array[i].length; j++) {
      //each character
      let line = array[i];
      let numIndexes;
      //if number
      if (isNumberCheck(line.charAt(j))) {
        let lastIndex = j;
        let currentNum = line.charAt(lastIndex);
        //plus one of the index until its  not a number
        while (isNumberCheck(line.charAt(lastIndex + 1))) {
          currentNum = currentNum.concat("", line.charAt(lastIndex + 1));
          lastIndex++;
        }
        // the indexes of the number once the next char is NaN
        numIndexes = [j, lastIndex];
        //if the next char is a symbol or if the indexes of the number found on the line above or below this one are symbols
        if (
          isSymbolCheck(line.charAt(numIndexes[0] - 1)) ||
          isSymbolCheck(line.charAt(numIndexes[1] + 1)) ||
          checkLine(numIndexes[0], numIndexes[1], array[i + 1]) ||
          checkLine(numIndexes[0], numIndexes[1], array[i - 1])
        ) {
          sum += Number(currentNum);
        }
        j = lastIndex;
      }
    }
  }
  return sum;
};
const isNumberCheck = (char) => {
  //is input number return boolean
  return Number(char) || char === "0" ? true : false;
};
const isSymbolCheck = (char) => {
  //is punctuation check return boolean
  const regex = /[^\w\s]+/;
  return regex.test(char) ? (char !== "." ? true : false) : false;
};
const checkLine = (first, last, line) => {
  let symbolFound = false;
  if (line) {
    //for each char in the line
    let start = first === 0 ? 0 : first - 1;
    let end = last === line.length ? line.length : last + 1;
    for (let i = start; i <= end; i++) {
      isSymbolCheck(line.charAt(i)) ? (symbolFound = true) : "";
    }
  }
  return symbolFound;
};
