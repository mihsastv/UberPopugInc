import { BigIntType } from '@mikro-orm/core';

export class BigIntNumberType extends BigIntType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  public convertToJSValue(value: any): any {
    if (!value) {
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return parseInt(value);
  }
}
