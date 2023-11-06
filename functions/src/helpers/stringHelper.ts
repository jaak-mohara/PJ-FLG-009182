/**
 * Converts the input to be all capital letters.
 *
 * @param {string} input
 * @return {string}
 */
export const capitalise = (input: string): string => {
  return input.toUpperCase();
};

/**
 * Splits the input into an array of words.
 *
 * @param {string} input
 * @return {string[]}
 */
export const split = (input: string): string[] => {
  // Split on capital letters, spaces, underscores, and hyphens.
  const splitByUppercaseAndCharacters = input
    .split(/(?=[A-Z])|[\s_-]/);

  // Split on numbers.
  const splitByNumbers = splitByUppercaseAndCharacters
    .map((word) => word.split(/(\d+)/))
    .flat();

  // Remove empty strings.
  const emptyStringsFilteredOut = splitByNumbers
    .filter((word) => word && word !== '') || [];

  return emptyStringsFilteredOut;
};

/**
 * Uses the different helper functions to process the input.
 *
 * @param {string} input
 * @return {string}
 */
export const processName = (input: string): string => {
  const splitInput = split(input);

  const capitalisedInput = splitInput.map((word) => capitalise(word));

  const joinedInput = capitalisedInput.join('_');

  return joinedInput;
};
