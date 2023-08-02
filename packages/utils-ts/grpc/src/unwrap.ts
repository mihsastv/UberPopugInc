import { InternalException } from '@rsdk/core';

export const unwrap = <T>(t: T | undefined): T => {
  if (t === undefined) {
    throw new InternalException('Malformed service response');
  }

  return t;
};

export const unwrapAuditable = <T extends Auditable>(t?: T): Audit => {
  return {
    updatedAt: unwrap(t?.updatedAt),
    createdAt: unwrap(t?.createdAt),
    creator: {
      id: unwrap(t?.createdBy),
    },
    updater: {
      id: unwrap(t?.updatedBy),
    },
  };
};

export const unwrapPageInfo = <T extends PageInfo<Pagination>>(t?: T): Required<PageInfo<Required<Pagination>>> => {
  return {
    pagination: {
      limit: unwrap(t?.pagination?.limit),
      offset: unwrap(t?.pagination?.offset),
    },
    totalCount: unwrap(t?.totalCount),
  };
};

interface Auditable {
  updatedAt?: Date;
  updatedBy?: string;
  createdAt?: Date;
  createdBy?: string;
}

interface Audit {
  updatedAt: Date;
  updater: {
    id: string;
  };
  createdAt: Date;
  creator: {
    id: string;
  };
}

interface Pagination {
  limit?: number;
  offset?: number;
}

interface PageInfo<T> {
  pagination?: T;
  totalCount?: number;
}
