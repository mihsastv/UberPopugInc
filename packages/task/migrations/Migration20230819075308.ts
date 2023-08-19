import { Migration } from '@mikro-orm/migrations';

export class Migration20230819075308 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("public_id" varchar(255) not null, "description" varchar(255) not null, "status" text check ("status" in (\'TASK_STATUS_UNSPECIFIED\', \'TASK_STATUS_PROCESSING\', \'TASK_STATUS_COMPLITED\')) not null, "created_date" timestamptz(0) not null, "popug_id" varchar(255) not null, "assign_price" int not null, "complited_price" int not null, "title" varchar(255) not null, constraint "task_pkey" primary key ("public_id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "task" cascade;');
  }

}
