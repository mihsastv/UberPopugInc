import * as z from 'zod';

import { zExt } from './z.ext';

export const FindNamesSchema = z.object({
  condition: z.union([
    z.object({ $case: z.literal('list'), list: z.object({ ids: z.array(zExt.trimmedString().uuid()) }) }),
    z.object({ $case: z.literal('filter'), filter: z.object({ query: zExt.trimmedString().optional() }) }),
  ]),
});
