var fs = require("fs");
const impossible = { red: 12, green: 13, blue: 14 };
fs.readFile("inputTwo.txt", "utf8", (err, data) => {
  if (err) throw err;
  //array has each game played. each game has diff nums of cubes
  const array = data.split("\n");
  partTwo(array);
});

// for each game:
// compare each red number to the impossible number
// each green number to the impossible number
// each blue number to the ipossible blue number
// if any of them are bigger than the impossible number, don't return the ID
// return the sum of the IDs

const partTwo = (array) => {
  let sum = 0;
  //for each line,
  for (let i = 0; i < array.length; i++) {
    // extract the highest values
    const highestValuesObject = convertLine(array[i], i + 1);
    // power of line equals highest multiplied together
    const power =
      highestValuesObject.red *
      highestValuesObject.blue *
      highestValuesObject.green;
    sum += power;
  }
  console.log(sum); //answer
};

const partOne = (array) => {
  let sum = 0;
  //for each line,
  for (let i = 0; i < array.length; i++) {
    // extract the highest values
    const highestValuesObject = convertLine(array[i], i + 1);
    // compare to impossible
    if (
      highestValuesObject.red <= impossible.red &&
      highestValuesObject.blue <= impossible.blue &&
      highestValuesObject.green <= impossible.green
    ) {
      console.log("yes line: ", highestValuesObject.index);
      sum += highestValuesObject.index;
    }
  }
  console.log(sum); //answer
};

const convertLine = (line, i) => {
  const extractRounds = line.slice(line.indexOf(":") + 1);
  const eachHandful = extractRounds.split(";");
  const highestRed = Math.max(...getColour("red", eachHandful));
  const highestBlue = Math.max(...getColour("blue", eachHandful));
  const highestGreen = Math.max(...getColour("green", eachHandful));
  return {
    index: i,
    red: highestRed,
    blue: highestBlue,
    green: highestGreen,
  };
};

const getColour = (colour, array) => {
  // split round for each colour picked up
  // find the red one, remove the word red, trim it and convert to number
  //return array of the  red numbers
  let colourArray = [];
  for (let i = 0; i < array.length; i++) {
    const eachColourFound = array[i].split(",");
    const colourPart = eachColourFound.filter((hand) => hand.includes(colour));
    if (colourPart[0]) {
      colourArray.push(Number(colourPart[0].replace(colour, "").trim()));
    }
  }
  return colourArray;
};
