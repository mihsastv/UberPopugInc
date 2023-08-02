export const wrapAuditable = <T extends Auditable>(t: T): AuditableContract => {
  return {
    updatedAt: t.updatedAt,
    createdAt: t.createdAt,
    createdBy: t.createdBy,
    updatedBy: t.updatedBy,
  };
};

interface Auditable {
  updatedAt: Date;
  updatedBy: string;
  createdAt: Date;
  createdBy: string;
}

interface AuditableContract {
  updatedAt: Date;
  updatedBy: string;
  createdAt: Date;
  createdBy: string;
}
