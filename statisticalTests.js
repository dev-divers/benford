/*****************************************************************
 *              STATISTICAL TESTS                                  *
 *****************************************************************
 *                                                               *
 *                                                               *
 *                                                               *
 *                                                               *
 *                                                               *
 *                                                               *
 ****************************************************************/

// Number of times a particular digit (from 1 to 9) appears as the first digit in the given numbers
function observedFrequencies(numbers) {
  // Create an empty array of 9 columns filled with 0
  let freqs = new Array(9).fill(0);
  for (let number of numbers) {
    // Get the first digit
    let firstDigit = parseInt(number.toString()[0]);
    if (firstDigit >= 1 && firstDigit <= 9) {
      // Increment with ++ 
      freqs[firstDigit - 1]++;
    }
  }
  return freqs;
}

// Array of theoretical frequencies according to Benford's law
function benfordFrequencies() {
  let freqs = [];
  for (let i = 1; i <= 9; i++) {
    freqs.push(Math.log10(1 + 1 / i));
  }
  return freqs;
}

// Object of theoretical frequencies according to Benford's law
const getResult = (probabilitiesArray) => {
  const result = {};
  for (let i = 0; i < probabilitiesArray.length; i++) {
      // A new key-value pair is created in the result object 
      result[i + 1] = probabilitiesArray[i];
  }
  // Object's keys correspond to the digits
  return result;
};

// Deviation calcul (difference between observed and theoretical frequencies)
function calculateDeviations(observedFrequencies, benfordFrequencies) {
  const deviations = [];
  for (let i = 0; i < observedFrequencies.length; i++) {
      deviations.push(observedFrequencies[i] - benfordFrequencies[i]);
  }
  return deviations;
}

// Standard deviation
let standardDeviation = (numbers, rounded) => {
  // Mean
  const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
  const mean = sum / numbers.length;
  // Squared deviations from mean
  const meanDeviations = numbers.map((n) => n - mean, 2);
  // Squared deviations
  const squaredDeviations = meanDeviations.map((n) => n * n);
  // Sum of squared deviations
  const sumOfSquares = squaredDeviations.reduce((accumulator, current) => accumulator + current, 0);
  // Variance
  const variance = sumOfSquares / numbers.length;
  // Standard deviation
  const standardDeviation = Math.sqrt(variance);
  // Rounded standard deviation
  const roundedStandardDaviation = parseFloat(standardDeviation.toFixed(rounded));

  return roundedStandardDaviation;
};

// Chi square test
function chiSquareTest(observed, expected) {
  let chiSquare = 0;
  for (let i = 0; i < observed.length; i++) {
      let diff = observed[i] - expected[i];
      chiSquare += Math.pow(diff, 2) / expected[i];
  }
  return chiSquare;
}

// Function to perform the χ² test
function chiTest(numbers, alpha) {
  let observedFreqs = observedFrequencies(numbers);
  let theoreticalFreqs = benfordFrequencies();
  let n = numbers.length;
  let testStat = statisticTest(observedFreqs, theoreticalFreqs, n);
  let df = 8;
  let critValue = jStat.chisquare.inv(1 - alpha, df);
  if (testStat <= critValue) {
    console.log("The sample follows Benford's law");
  } else {
    console.log("The sample does not follow Benford's law");
  }
}
