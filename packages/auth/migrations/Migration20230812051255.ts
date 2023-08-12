import { Migration } from '@mikro-orm/migrations';

export class Migration20230812051255 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "profile" ("public_id" varchar(255) not null, "login" varchar(255) not null, "role" text check ("role" in (\'USER\', \'ADMIN \', \'MANAGER\', \'TOP\')) not null, "password" varchar(255) not null, constraint "profile_pkey" primary key ("public_id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "profile" cascade;');
  }

}
