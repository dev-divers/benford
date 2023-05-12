
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

export {isNumber, getProbabilities, getResult};

// Checks whether the input string is a valid integer or decimal number 
function isNumber(string) {
    return /^\d+(\.\d+)?$/.test(string);
}

// This function checks if all elements in an array are finite, non-NaN primitive numbers.
function areAllNumbers(array) {
    return array.every((element) => 
        typeof element === 'number' && 
        !isNaN(element) && 
        Number.isFinite(element) && 
        !(element instanceof Number)
    );
}

// Remove non significant digit (0) 
function nonSignificantDigitsRemover(string) {
    // Remove non significant zeros at the beginning and after the decimal point
    const regex = /^0*(\.)?0*/g;
    string = string.replace(regex, '');
    return string;
}

// Get the first non zero digit [1-9] of the string
function FirstNonZeroDigit(string) {
    // Return null if the input string is not a valid integer or decimal number
    if (!isNumber(string)) return null;
    // Remove non significant digits (0)
    const parseNumber = nonSignificantDigitsRemover(string);
    // Return non-zero digits (1 to 9) in an array
    const firstNonZeroDigitMatch = parseNumber.match(/[1-9]/);
    // Return the first digit, or null
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
    }, new Array(9).fill(0)); // Initials values in the array
};

// Sum of all digits in the input array 
const totalDigits = (firstDigitArray) => {
    return firstDigitArray.reduce((accumulator, current) => accumulator + current, 0);
};

// Calculate the probability of each first digit 
const probabilitiesArray = (firstDigitArray, totalDigits) => {
    return firstDigitArray.map((count) => console.log (count / totalDigits));
};

// Maps an array of probabilities to an object
const getResult = (probabilitiesArray) => {
    const result = {};
    for (let i = 0; i < probabilities.length; i++) {
        // A new key-value pair is created in the result object 
        result[i + 1] = probabilitiesArray[i];
    }
    // Object's keys correspond to the digits
    return result;
};
