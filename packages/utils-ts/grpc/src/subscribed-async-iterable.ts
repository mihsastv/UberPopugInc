// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export const subscribedAsyncIterable = <Input, Output>(
  iterable: AsyncIterable<Input>,
  subscription: string,
  map?: (value?: Input) => Output,
) => {
  const asyncIterator = iterable[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => {
      return {
        next: async (args: unknown) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const result = await asyncIterator.next(args);
          return {
            done: result.done,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            value: { [subscription]: map?.(result.value) || result.value },
          };
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return: async (val: any) => {
          const result = asyncIterator.return && (await asyncIterator.return(val));

          if (result) {
            return {
              done: result.done,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              value: { [subscription]: map?.(result.value) || result.value },
            };
          }

          return result;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw: (e: any) => {
          return asyncIterator.throw && asyncIterator.throw(e);
        },
      };
    },
  };
};
