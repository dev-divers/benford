
/*****************************************************************
 *              FIRST DIGIT PROBABILITIES                        *
 *****************************************************************
 *                                                               *
 *  Returns an object representing the probability distribution  *
 *  of the first digit of an array of numbers.                   *
 *                                                               *
 *  Created: 04-2023 by Aft                                      *
 *                                                               *
 *                                                               *
 *                                                               *
 ****************************************************************/

export { isNumber, getProbabilities, getResult };

// Checks whether the input string is a valid integer or decimal number 
function isNumber(string) {
    return /^\d+(\.\d+)?$/.test(string);
}

// Remove non significant digit (0) 
function nonSignificantDigitsRemover(string) {
    // Remove zeros at the beginning of the string, including those after the decimal point
    const regex = /^0*(\.)?0*/g;
    string = string.replace(regex, '');
    // Return the modified string
    return string;
}

// Get the first non zero digit [1-9] of the string
function FirstNonZeroDigit(string) {
    // Return null if the input string is not a valid integer or decimal number
    if (!isNumber(string)) return null;
    // Remove non significant digits (0)
    const parseNumber = nonSignificantDigitsRemover(string);
    // Find the first non-zero digit (1 to 9) in the input string 
    const firstNonZeroDigitMatch = parseNumber.match(/[1-9]/);
    // Return the found digit 
    return firstNonZeroDigitMatch ? parseInt(firstNonZeroDigitMatch[0], 10) : null;
}

// Takes an array of numbers and returns an array representing the count of each first digit in the input.
const firstDigitArray = (numbersArray) => {
    // Use the reduce method to iterate through each number 
    return numbersArray.reduce((accumulator, current) => {
        // Convert the current number to a string and get the first non-zero digit
        const firstDigitOfCurrentNumber = FirstNonZeroDigit(current.toString());
        // If the first digit is not null, increment the count for the appropriate first digit in the accumulator array
        if (firstDigitOfCurrentNumber !== null) {
            // Calculate the index in the accumulator array for the first digit
            const index = firstDigitOfCurrentNumber - 1;
            // Increment the count for the first digit in the accumulator array
            accumulator[index] = (accumulator[index] || 0) + 1;
        }
        return accumulator;
    }, new Array(9).fill(0)); // Initials values
};

// Calculate the sum of all the digits
const totalDigits = (firstDigitArray) => {
    return firstDigitArray.reduce((accumulator, current) => accumulator + current, 0);
};

// Calculate the probability of each first digit 
const getProbabilities = (firstDigitArray, totalDigits) => {
    return firstDigitArray.map((count) => count / totalDigits);
};

// Maps an array of probabilities to an object
const getResult = (probabilities) => {
    const result = {};
    for (let i = 0; i < probabilities.length; i++) {
        result[i + 1] = probabilities[i];
    }
    return result;
};
