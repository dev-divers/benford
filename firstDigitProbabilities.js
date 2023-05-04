
/*****************************************************************
 *              FIRST DIGIT PROBABILITIES *                      *
 *****************************************************************
 *                                                               *
 *  Returns an object representing the probability distribution  *
 *  of the first digit of an array of numbers.                   *
 *                                                               *
 *  Created: 04-2023 by Aft                                      *
 *                                                               *
 *              IN DEVELOPMENT                                   *
 *                                                               *
 ****************************************************************/

export {isNumber,removeNonSignificantDigits,getFirstDigitCounts, getTotalValidNumbers, getProbabilities, getResult, firstDigitProbabilities };

// Checks whether the input string is a valid integer or decimal number 
function isNumber(string) {
    return /^\d+(\.\d+)?$/.test(string);
}

// Remove non significant digit (0) 
function removeNonSignificantDigits(string) {
    // Remove non-significant zeros at the beginning or end of the string, as well as the decimal point if it is followed by non-significant zeros
    string = string.replace(/^0+|(\.0+)?0+$/g, '$1');
    // Return the modified string
    return string;
}

// Get the first non zero digit [1-9] of the string
function getFirstNonZeroDigit(string) {
    // Return null if the input string is not a valid integer or decimal number
    if (!isNumber(string)) return null;
    // Remove non significant digits
    const parseNumber = removeNonSignificantDigits(string);
    // Find the first non-zero digit (1 to 9) in the input string using a regular expression
    const firstNonZeroDigitMatch = parseNumber.match(/[1-9]/);
    // Return the found digit 
    return firstNonZeroDigitMatch ? parseInt(firstNonZeroDigitMatch[0], 10) : null;
}

// Takes an array of numbers and returns an array representing the count of each first digit in the input.
const getFirstDigitCounts = (numbers) => {
    // Use the reduce method to iterate through each number in the input array and accumulate the counts
    return numbers.reduce((counts, number) => {
      // Convert the number to a string and get the first non-zero digit
      const firstDigit = getFirstNonZeroDigit(number.toString());
      // If the first digit is not null, increment the count for the appropriate first digit in the counts array
      if (firstDigit !== null) {
        // Calculate the index in the counts array for the first digit (subtract 1 since the index starts at 0)
        const index = firstDigit - 1;
        // Increment the count for the first digit in the counts array
        counts[index] = (counts[index] || 0) + 1;
      }
      
      // Return the updated counts array
      return counts;
    }, new Array(9).fill(0)); // Initialize the counts array with zeroes using the Array.fill() method
  };

// Calculate the sum of all the counts in the firstDigitCounts array
const getTotalValidNumbers = (firstDigitCounts) => {
    return firstDigitCounts.reduce((a, b) => a + b, 0);
};

// Calculate the probability of each first digit by dividing its count by the total number of valid numbers
const getProbabilities = (firstDigitCounts, totalValidNumbers) => {
    return firstDigitCounts.map((count) => count / totalValidNumbers);
};

// Maps an array of probabilities to an object
const getResult = (probabilities) => {
    // Initialize an empty object to store the probability of each first digit
    const result = {};
    // Iterate through each probability and add a property to the result object with the key corresponding to the first digit (1 to 9) 
    // and its value is the probability of that digit occurring
    for (let i = 0; i < probabilities.length; i++) {
        result[i + 1] = probabilities[i];
    }
    // Return the result object
    return result;
};

// Returns an object representing the probability distribution of the first digit of an array of numbers.
const firstDigitProbabilities = (numbers) => {
    // Call the getFirstDigitCounts function to count the number of occurrences of each first digit in the input array of numbers
    const firstDigitCounts = getFirstDigitCounts(numbers);
    // Call the getTotalValidNumbers function to calculate the total number of valid numbers
    const totalValidNumbers = getTotalValidNumbers(firstDigitCounts);
    // Call the getProbabilities function to calculate the probability of each first digit occurring
    const probabilities = getProbabilities(firstDigitCounts, totalValidNumbers);
    // Call the getResult function to create an object where each property corresponds to a first digit (1 to 9) 
    // and its value is the probability of that digit occurring
    const result = getResult(probabilities);
    // Return the result object
    return result;
};

