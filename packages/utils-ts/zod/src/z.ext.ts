import { InputException } from '@rsdk/core';
import { z, ZodError, ZodString, ZodType } from 'zod';
import { fromZodError as flatErr } from 'zod-validation-error';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function parse<T extends ZodType, E extends Error>(t: T, obj: unknown, mapErr: (e: ZodError) => E): z.infer<typeof t> {
  const res = t.safeParse(obj);

  switch (res.success) {
    case true:
      return res.data;
    case false:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw mapErr(res.error);
  }
}

async function parseAsync<T extends ZodType, E extends Error>(
  t: T,
  obj: unknown,
  mapErr: (e: ZodError) => E,
): Promise<z.infer<typeof t>> {
  const res = await t.safeParseAsync(obj);

  switch (res.success) {
    case true:
      return res.data;
    case false:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw mapErr(res.error);
  }
}

function trimmedString(): ZodString {
  return z.string().trim();
}

export const zExt = {
  parse,
  parseAsync,
  flatErr,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  invalidRequest,
  trimmedString,
};

function invalidRequest(e: ZodError): InputException {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return new InputException(`Invalid request: ${zExt.flatErr(e)}`);
}
