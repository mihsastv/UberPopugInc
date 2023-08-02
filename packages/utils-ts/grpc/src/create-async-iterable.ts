export function createAsyncIterator<T>(values: T[]): {
  [Symbol.asyncIterator]: () => AsyncGenerator<Awaited<T>, void, unknown>;
} {
  return {
    [Symbol.asyncIterator]: async function* () {
      for (const value of values) {
        yield value;
      }
    },
  };
}
