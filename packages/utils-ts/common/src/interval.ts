/* eslint-disable @typescript-eslint/no-namespace */
import { InputException } from '@rsdk/core';
import type { Interval as ContractInterval } from '@vm/common-contract';
import { IntervalUnit as ContractIntervalUnit } from '@vm/common-contract';
import * as z from 'zod';

export const IntervalSchema = z.object({
  unit: z.nativeEnum(ContractIntervalUnit),
  value: z.number().positive(),
});

export type Interval = {
  unit: IntervalUnit;
  value: number;
};

export type IntervalUnit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

export namespace IntervalMapper {
  export function toModel(interval: ContractInterval): Interval {
    return {
      unit: IntervalMapper.IntervalUnit.toModel(interval.unit),
      value: interval.value,
    };
  }

  export function toContract(interval: Interval): ContractInterval {
    return {
      unit: IntervalMapper.IntervalUnit.toContract(interval.unit),
      value: interval.value,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace IntervalUnit {
    export function toModel(unit: ContractIntervalUnit): IntervalUnit {
      switch (unit) {
        case ContractIntervalUnit.UNIT_SECOND:
          return 'second';
        case ContractIntervalUnit.UNIT_MINUTE:
          return 'minute';
        case ContractIntervalUnit.UNIT_HOUR:
          return 'hour';
        case ContractIntervalUnit.UNIT_DAY:
          return 'day';
        case ContractIntervalUnit.UNIT_WEEK:
          return 'week';
        case ContractIntervalUnit.UNIT_MONTH:
          return 'month';
        case ContractIntervalUnit.UNIT_QUARTER:
          return 'quarter';
        case ContractIntervalUnit.UNIT_YEAR:
          return 'year';
        default:
          throw new InputException('Interval unit unspecified');
      }
    }

    export function toContract(unit: IntervalUnit): ContractIntervalUnit {
      switch (unit) {
        case 'second':
          return ContractIntervalUnit.UNIT_SECOND;
        case 'minute':
          return ContractIntervalUnit.UNIT_MINUTE;
        case 'hour':
          return ContractIntervalUnit.UNIT_HOUR;
        case 'day':
          return ContractIntervalUnit.UNIT_DAY;
        case 'week':
          return ContractIntervalUnit.UNIT_WEEK;
        case 'month':
          return ContractIntervalUnit.UNIT_MONTH;
        case 'quarter':
          return ContractIntervalUnit.UNIT_QUARTER;
        case 'year':
          return ContractIntervalUnit.UNIT_YEAR;
        default:
          return ContractIntervalUnit.UNIT_UNSPECIFIED;
      }
    }
  }
}
