import { InternalException } from '@rsdk/core';
import { Granularity as ContractGranularity } from '@vm/common-contract';

export enum Granularity {
  ONE_SEC = 'ONE_SEC',
  FIFTEEN_SEC = 'FIFTEEN_SEC',
  THIRTY_SEC = 'THIRTY_SEC',
  ONE_MIN = 'ONE_MIN',
  FIVE_MIN = 'FIVE_MIN',
  FIFTEEN_MIN = 'FIFTEEN_MIN',
  THIRTY_MIN = 'THIRTY_MIN',
  ONE_HOUR = 'ONE_HOUR',
  THREE_HOUR = 'THREE_HOUR',
  SIX_HOUR = 'SIX_HOUR',
  TWELVE_HOUR = 'TWELVE_HOUR',
  ONE_DAY = 'ONE_DAY',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GranularityMapper {
  export function toModel(granularity: ContractGranularity): Granularity {
    switch (granularity) {
      case ContractGranularity.GRANULARITY_1_SEC:
        return Granularity.ONE_SEC;
      case ContractGranularity.GRANULARITY_15_SEC:
        return Granularity.FIFTEEN_SEC;
      case ContractGranularity.GRANULARITY_30_SEC:
        return Granularity.THIRTY_SEC;
      case ContractGranularity.GRANULARITY_1_MIN:
        return Granularity.ONE_MIN;
      case ContractGranularity.GRANULARITY_5_MIN:
        return Granularity.FIVE_MIN;
      case ContractGranularity.GRANULARITY_15_MIN:
        return Granularity.FIFTEEN_MIN;
      case ContractGranularity.GRANULARITY_30_MIN:
        return Granularity.THIRTY_MIN;
      case ContractGranularity.GRANULARITY_1_HOUR:
        return Granularity.ONE_HOUR;
      case ContractGranularity.GRANULARITY_3_HOUR:
        return Granularity.THREE_HOUR;
      case ContractGranularity.GRANULARITY_6_HOUR:
        return Granularity.SIX_HOUR;
      case ContractGranularity.GRANULARITY_12_HOUR:
        return Granularity.TWELVE_HOUR;
      case ContractGranularity.GRANULARITY_1_DAY:
        return Granularity.ONE_DAY;
      default:
        throw new InternalException('Granularity unspecified');
    }
  }

  export function toContract(granularity: Granularity): ContractGranularity {
    switch (granularity) {
      case Granularity.ONE_SEC:
        return ContractGranularity.GRANULARITY_1_SEC;
      case Granularity.FIFTEEN_SEC:
        return ContractGranularity.GRANULARITY_15_SEC;
      case Granularity.THIRTY_SEC:
        return ContractGranularity.GRANULARITY_30_SEC;
      case Granularity.ONE_MIN:
        return ContractGranularity.GRANULARITY_1_MIN;
      case Granularity.FIVE_MIN:
        return ContractGranularity.GRANULARITY_5_MIN;
      case Granularity.FIFTEEN_MIN:
        return ContractGranularity.GRANULARITY_15_MIN;
      case Granularity.THIRTY_MIN:
        return ContractGranularity.GRANULARITY_30_MIN;
      case Granularity.ONE_HOUR:
        return ContractGranularity.GRANULARITY_1_HOUR;
      case Granularity.THREE_HOUR:
        return ContractGranularity.GRANULARITY_3_HOUR;
      case Granularity.SIX_HOUR:
        return ContractGranularity.GRANULARITY_6_HOUR;
      case Granularity.TWELVE_HOUR:
        return ContractGranularity.GRANULARITY_12_HOUR;
      case Granularity.ONE_DAY:
        return ContractGranularity.GRANULARITY_1_DAY;
      default:
        return ContractGranularity.GRANULARITY_UNSPECIFIED;
    }
  }

  // eslint-disable-next-line complexity
  export function toSeconds(
    granularity: ContractGranularity | Granularity,
  ): number {
    switch (granularity) {
      case ContractGranularity.GRANULARITY_1_SEC || Granularity.ONE_SEC:
        return 1;
      case ContractGranularity.GRANULARITY_15_SEC || Granularity.FIFTEEN_SEC:
        return 15;
      case ContractGranularity.GRANULARITY_30_SEC || Granularity.THIRTY_SEC:
        return 30;
      case ContractGranularity.GRANULARITY_1_MIN || Granularity.ONE_MIN:
        return 60;
      case ContractGranularity.GRANULARITY_5_MIN || Granularity.FIVE_MIN:
        return 5 * 60;
      case ContractGranularity.GRANULARITY_15_MIN || Granularity.FIFTEEN_MIN:
        return 15 * 60;
      case ContractGranularity.GRANULARITY_30_MIN || Granularity.THIRTY_MIN:
        return 30 * 60;
      case ContractGranularity.GRANULARITY_1_HOUR || Granularity.ONE_HOUR:
        return 60 * 60;
      case ContractGranularity.GRANULARITY_3_HOUR || Granularity.THREE_HOUR:
        return 3 * 60 * 60;
      case ContractGranularity.GRANULARITY_6_HOUR || Granularity.SIX_HOUR:
        return 6 * 60 * 60;
      case ContractGranularity.GRANULARITY_12_HOUR || Granularity.TWELVE_HOUR:
        return 12 * 60 * 60;
      case ContractGranularity.GRANULARITY_1_DAY || Granularity.ONE_DAY:
        return 24 * 60 * 60;
      default:
        throw new InternalException('Granularity unspecified');
    }
  }

  // eslint-disable-next-line complexity
  export function toIntervalString(
    granularity: ContractGranularity | Granularity,
  ): string {
    switch (granularity) {
      case ContractGranularity.GRANULARITY_1_SEC || Granularity.ONE_SEC:
        return '1 second';
      case ContractGranularity.GRANULARITY_15_SEC || Granularity.FIFTEEN_SEC:
        return '15 second';
      case ContractGranularity.GRANULARITY_30_SEC || Granularity.THIRTY_SEC:
        return '30 second';
      case ContractGranularity.GRANULARITY_1_MIN || Granularity.ONE_MIN:
        return '1 minute';
      case ContractGranularity.GRANULARITY_5_MIN || Granularity.FIVE_MIN:
        return '5 minute';
      case ContractGranularity.GRANULARITY_15_MIN || Granularity.FIFTEEN_MIN:
        return '15 minute';
      case ContractGranularity.GRANULARITY_30_MIN || Granularity.THIRTY_MIN:
        return '30 minute';
      case ContractGranularity.GRANULARITY_1_HOUR || Granularity.ONE_HOUR:
        return '1 hour';
      case ContractGranularity.GRANULARITY_3_HOUR || Granularity.THREE_HOUR:
        return '3 hour';
      case ContractGranularity.GRANULARITY_6_HOUR || Granularity.SIX_HOUR:
        return '6 hour';
      case ContractGranularity.GRANULARITY_12_HOUR || Granularity.TWELVE_HOUR:
        return '12 hour';
      case ContractGranularity.GRANULARITY_1_DAY || Granularity.ONE_DAY:
        return '1 day';
      default:
        throw new InternalException('Granularity unspecified');
    }
  }

  export function getGranularityFromInterval(interval: number): Granularity {
    const dividedInterval = interval / 1000;

    if (dividedInterval < 8 * 1000) {
      return Granularity.ONE_SEC;
    } else if (dividedInterval < 22.5 * 1000) {
      return Granularity.FIFTEEN_SEC;
    } else if (dividedInterval < 45 * 1000) {
      return Granularity.THIRTY_SEC;
    } else if (dividedInterval < 3 * 60 * 1000) {
      return Granularity.ONE_MIN;
    } else if (dividedInterval < 10 * 60 * 1000) {
      return Granularity.FIVE_MIN;
    } else if (dividedInterval < 22.5 * 60 * 1000) {
      return Granularity.FIFTEEN_MIN;
    } else if (dividedInterval < 45 * 60 * 1000) {
      return Granularity.THIRTY_MIN;
    } else if (dividedInterval < 2 * 60 * 60 * 1000) {
      return Granularity.ONE_HOUR;
    } else if (dividedInterval < 4.5 * 60 * 60 * 1000) {
      return Granularity.THREE_HOUR;
    } else if (dividedInterval < 9 * 60 * 60 * 1000) {
      return Granularity.SIX_HOUR;
    } else if (dividedInterval < 18 * 60 * 60 * 1000) {
      return Granularity.TWELVE_HOUR;
    } else {
      return Granularity.ONE_DAY;
    }
  }
}
