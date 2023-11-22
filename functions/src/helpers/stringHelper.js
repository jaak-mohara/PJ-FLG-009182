/**
 * Converts the input to be all capital letters.
 *
 * @param {string} input
 * @return {string}
 */
exports.capitalise = (input) => {
  return input.toUpperCase();
};

/**
 * Splits the input into an array of words.
 *
 * @param {string} input
 * @return {string[]}
 */
exports.split = (input) => {
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
exports.processName = (input) => {
  const splitInput = exports.split(input);
  const capitalisedInput = splitInput.map((word) => exports.capitalise(word));
  const joinedInput = capitalisedInput.join('_');
  return joinedInput;
};
