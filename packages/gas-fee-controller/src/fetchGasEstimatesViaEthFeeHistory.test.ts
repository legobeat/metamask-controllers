import { when } from 'jest-when';

import fetchBlockFeeHistory from './fetchBlockFeeHistory';
import fetchGasEstimatesViaEthFeeHistory from './fetchGasEstimatesViaEthFeeHistory';
import calculateGasFeeEstimatesForPriorityLevels from './fetchGasEstimatesViaEthFeeHistory/calculateGasFeeEstimatesForPriorityLevels';
import fetchLatestBlock from './fetchGasEstimatesViaEthFeeHistory/fetchLatestBlock';

jest.mock('./fetchBlockFeeHistory');
jest.mock(
  './fetchGasEstimatesViaEthFeeHistory/calculateGasFeeEstimatesForPriorityLevels',
);
jest.mock('./fetchGasEstimatesViaEthFeeHistory/fetchLatestBlock');

const mockedFetchBlockFeeHistory = fetchBlockFeeHistory as jest.Mock<
  ReturnType<typeof fetchBlockFeeHistory>,
  Parameters<typeof fetchBlockFeeHistory>
>;
const mockedCalculateGasFeeEstimatesForPriorityLevels =
  calculateGasFeeEstimatesForPriorityLevels as jest.Mock<
    ReturnType<typeof calculateGasFeeEstimatesForPriorityLevels>,
    Parameters<typeof calculateGasFeeEstimatesForPriorityLevels>
  >;
const mockedFetchLatestBlock = fetchLatestBlock as jest.Mock<
  ReturnType<typeof fetchLatestBlock>,
  Parameters<typeof fetchLatestBlock>
>;

describe('fetchGasEstimatesViaEthFeeHistory', () => {
  const latestBlock = {
    number: BigInt(1),
    baseFeePerGas: BigInt(100_000_000_000),
  };
  const ethQuery = {
    blockNumber: async () => latestBlock.number,
    getBlockByNumber: async () => latestBlock,
  };

  it('calculates target fees for low, medium, and high transaction priority levels', async () => {
    const blocks = [
      {
        number: BigInt(3),
        baseFeePerGas: BigInt(1),
        gasUsedRatio: 1,
        priorityFeesByPercentile: {
          10: BigInt('0'),
          20: BigInt('0'),
          30: BigInt('0'),
        },
      },
    ];
    const levelSpecificEstimates = {
      low: {
        minWaitTimeEstimate: 15_000,
        maxWaitTimeEstimate: 30_000,
        suggestedMaxPriorityFeePerGas: '1',
        suggestedMaxFeePerGas: '221',
      },
      medium: {
        minWaitTimeEstimate: 15_000,
        maxWaitTimeEstimate: 45_000,
        suggestedMaxPriorityFeePerGas: '1.552',
        suggestedMaxFeePerGas: '241.552',
      },
      high: {
        minWaitTimeEstimate: 15_000,
        maxWaitTimeEstimate: 60_000,
        suggestedMaxPriorityFeePerGas: '2.94',
        suggestedMaxFeePerGas: '252.94',
      },
    };

    mockedFetchLatestBlock.mockResolvedValue(latestBlock);
    when(mockedFetchBlockFeeHistory)
      .calledWith({
        ethQuery,
        endBlock: latestBlock.number,
        numberOfBlocks: 5,
        percentiles: [10, 20, 30],
      })
      .mockResolvedValue(blocks);

    when(mockedCalculateGasFeeEstimatesForPriorityLevels)
      .calledWith(blocks)
      .mockReturnValue(levelSpecificEstimates);

    // @ts-expect-error Mock eth query does not fulfill type requirements
    const gasFeeEstimates = await fetchGasEstimatesViaEthFeeHistory(ethQuery);

    expect(gasFeeEstimates).toStrictEqual({
      ...levelSpecificEstimates,
      estimatedBaseFee: '100',
      historicalBaseFeeRange: null,
      baseFeeTrend: null,
      latestPriorityFeeRange: null,
      historicalPriorityFeeRange: null,
      priorityFeeTrend: null,
      networkCongestion: null,
    });
  });
});
