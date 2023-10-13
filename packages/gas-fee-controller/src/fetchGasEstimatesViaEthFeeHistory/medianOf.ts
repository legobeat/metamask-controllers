/**
 * Finds the median among a list of numbers. Note that this is different from the implementation
 * in the MetaSwap API, as we want to hold to using bigint as much as possible.
 *
 * @param numbers - A list of numbers, as BNs. Will be sorted automatically if unsorted.
 * @returns The median number.
 */
export default function medianOf(numbers: bigint[]): bigint {
  const sortedNumbers = numbers.slice().sort();
  const len = sortedNumbers.length;
  const index = Math.floor((len - 1) / 2);
  return sortedNumbers[index];
}
