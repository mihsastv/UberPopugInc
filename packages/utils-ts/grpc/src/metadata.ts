import { Metadata } from 'nice-grpc';

/**
 * Utility function that helps build grpc metadata from object.
 *
 * Object property name will be taken as metadata key.
 * Object property value will be passed as metadata value.
 * If value is string then value will be passed as string
 * otherwise value will be passed as JSON.
 *
 * @param context
 */
export const metadata = (context: object): Metadata => {
  return Object.entries(context).reduce((ctx, [key, value]) => {
    ctx.append(key, typeof value === 'string' ? value : JSON.stringify(value));
    return ctx;
  }, new Metadata());
};
