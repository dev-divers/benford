/*****************************************************************
 *              FIRST DIGIT PROBABILITIES                        *
 *****************************************************************
 *                                                               *
 *  Probability distribution of the first digit of an array of   *
 *  numbers.                                                     *
 *                                                               *
 *  Created: 2023 by Aft                                      *
 *                                                               *
 ****************************************************************/



/****************************************************************
Checks (true/false) if each element in an array :

- is a valid integer or decimal number
- has the type Number
- is non-NaN primitive numbers
- is finite
- is not a Number wrapper

****************************************************************/
export function areAllNumbers(array) {
    return array.every((element) =>
        /^\d+(\.\d+)?$/.test(element) &&
        typeof element === 'number' &&
        !isNaN(element) &&
        Number.isFinite(element) &&
        !(element instanceof Number)
    );
}

/****************************************************************
Remove non significant digits (0) of a string

****************************************************************/

export function nonSignificantDigitsRemover(string) {
    // Remove non significant zeros at the beginning of the string
    const regexBegin = /^0*(\.)?0*/g;
    // Remove non significant zeros after the decimal point
    const regexEnd = /0+$/g;
    return string.replace(regexBegin, '').replace(regexEnd, '');
}

/****************************************************************
Get the first non zero digit [1-9] of the string

****************************************************************/
export function firstNonZeroDigit(string) {
    // Remove non significant digits (0)
    const parseNumber = nonSignificantDigitsRemover(string);
    // Return non-zero digits (1 to 9) in an array
    const firstNonZeroDigitMatch = parseNumber.match(/[1-9]/);
    // Return the first [0] digit in decimal system (10), or null
    return firstNonZeroDigitMatch ? parseInt(firstNonZeroDigitMatch[0], 10) : null;
}

/****************************************************************
Takes an array of numbers and returns an array representing the count of each first digit in the input array.

****************************************************************/
export const firstDigitArray = (numbersArray) => {
    // Use the reduce method to iterate through each number 
    return numbersArray.reduce((accumulator, current) => {
        // Convert the current number to a string and get the first non-zero digit
        const firstDigitOfCurrentNumber = firstNonZeroDigit(current.toString());
        // If the first digit is not null, increment the count for the appropriate first digit in the accumulator array
        if (firstDigitOfCurrentNumber !== null) {
            // Calculate the index in the accumulator array for the first digit
            const index = firstDigitOfCurrentNumber - 1;
            // Increment the count for the first digit in the accumulator array
            accumulator[index] = (accumulator[index] || 0) + 1;
        }
        return accumulator;
    }, new Array(9).fill(0)); // Initials values in the array is (0)
};


/****************************************************************
 Sum of all digits in an input array 

****************************************************************/
export const totalDigits = (firstDigitArray) => {
    return firstDigitArray.reduce((accumulator, current) => accumulator + current, 0);
};

/****************************************************************
Calculate the probability of each first digit 

****************************************************************/
export const probabilitiesArray = (firstDigitArray, totalDigits) => {
    return firstDigitArray.map((count) => count / totalDigits);
};

/****************************************************************
// Maps an array of probabilities to an object

****************************************************************/
export const getResult = (probabilitiesArray) => {
    const result = {};
    for (let i = 0; i < probabilitiesArray.length; i++) {
        // A new key-value pair is created in the result object 
        result[i + 1] = probabilitiesArray[i];
    }
    // Object's keys correspond to the digits
   return result;
};
