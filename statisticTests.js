
/*****************************************************************
 *              STATISTIC TESTS                                  *
 *****************************************************************
 *                                                               *
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

// Calculate theoretical frequencies according to Benford's law
function benfordFrequencies() {
  let freqs = [];
  for (let i = 1; i <= 9; i++) {
    freqs.push(Math.log10(1 + 1 / i));
  }
  return freqs;
}

