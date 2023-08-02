import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { EntityClass } from '@mikro-orm/core/typings';

import { Identifiable, Nameable } from './entities';

// TODO: Change condition to our type.
type Condition =
  | {
      $case: 'filter';
      filter: { query?: string };
    }
  | {
      $case: 'list';
      list: { ids: string[] };
    };

export async function findNames(
  entityClass: EntityClass<Identifiable & Nameable>,
  condition: Condition,
  em: EntityManager,
): Promise<(Identifiable & Nameable)[]> {
  return em.find(
    entityClass,
    (() => {
      switch (condition.$case) {
        case 'list':
          return { id: { $in: condition.list.ids } };
        case 'filter':
          return condition.filter.query ? { name: { $ilike: `%${condition.filter.query}%` } } : {};
        default:
          return {};
      }
    })(),
    {
      fields: ['id', 'name'],
      orderBy: { name: QueryOrder.ASC },
    },
  );
}
