import { PrimaryKey, Property } from '@mikro-orm/core';

// import { IdentityContextLocalStorage } from '@vm/utils-grpc'
import { Identifiable } from './identifiable';

export abstract class Auditable implements Identifiable {
  @PrimaryKey({ defaultRaw: 'uuid_generate_v4()', type: 'uuid' })
  public id!: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @Property()
  public createdBy!: string;

  @Property()
  public updatedBy!: string;
  //
  // @BeforeCreate()
  // beforeCreate() {
  //   const identityContext = IdentityContextLocalStorage.getStore()
  //
  //   if (identityContext) {
  //     this.createdBy = identityContext.userId
  //     this.updatedBy = identityContext.userId
  //   }
  // }
  //
  // @BeforeUpdate()
  // fillAuditableFields() {
  //   const identityContext = IdentityContextLocalStorage.getStore()
  //
  //   if (identityContext) {
  //     this.updatedBy = identityContext.userId
  //   }
  // }
}
