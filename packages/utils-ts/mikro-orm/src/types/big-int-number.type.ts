import { BigIntType } from '@mikro-orm/core';

export class BigIntNumberType extends BigIntType {
  public convertToJSValue(value: any): any {
    if (!value) {
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return parseInt(value);
  }
}
