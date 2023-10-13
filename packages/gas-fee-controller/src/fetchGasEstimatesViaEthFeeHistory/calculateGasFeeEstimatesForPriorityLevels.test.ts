import calculateGasFeeEstimatesForPriorityLevels from './calculateGasFeeEstimatesForPriorityLevels';

describe('calculateGasFeeEstimatesForPriorityLevels', () => {
  it('calculates a set of gas fee estimates targeting various priority levels based on the given blocks', () => {
    const estimates = calculateGasFeeEstimatesForPriorityLevels([
      {
        number: BigInt(1),
        baseFeePerGas: BigInt(300_000_000_000),
        gasUsedRatio: 1,
        priorityFeesByPercentile: {
          10: BigInt(0),
          20: BigInt(1_000_000_000),
          30: BigInt(0),
        },
      },
      {
        number: BigInt(2),
        baseFeePerGas: BigInt(100_000_000_000),
        gasUsedRatio: 1,
        priorityFeesByPercentile: {
          10: BigInt(500_000_000),
          20: BigInt(1_600_000_000),
          30: BigInt(3_000_000_000),
        },
      },
      {
        number: BigInt(3),
        baseFeePerGas: BigInt(200_000_000_000),
        gasUsedRatio: 1,
        priorityFeesByPercentile: {
          10: BigInt(500_000_000),
          20: BigInt(2_000_000_000),
          30: BigInt(3_000_000_000),
        },
      },
    ]);

    expect(estimates).toStrictEqual({
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
    });
  });
});
