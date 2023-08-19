import { Migration } from '@mikro-orm/migrations';

export class Migration20230819144137 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "account" ("public_id" varchar(255) not null, "profile_id" varchar(255) not null, "balance_amount" int not null, "status" text check ("status" in (\'CLOSE\', \'OPEN\')) not null, constraint "account_pkey" primary key ("public_id"));');

    this.addSql('create table "balance_journal" ("public_id" varchar(255) not null, "account_id" varchar(255) not null, "task_id" varchar(255) not null, "cycle_id" varchar(255) not null, "payment_type" text check ("payment_type" in (\'ASSIGN\', \'PAYMENT\', \'WITHDRAWAL\', \'WITHDRAWALFAIL\')) not null, "debit" int not null, "credit" int not null, constraint "balance_journal_pkey" primary key ("public_id"));');

    this.addSql('create table "payment_cycle" ("public_id" varchar(255) not null, "description" varchar(255) not null, "begin_date" timestamptz(0) not null, "end_date" timestamptz(0) not null, "status" varchar(255) not null, constraint "payment_cycle_pkey" primary key ("public_id"));');

    this.addSql('create table "profile" ("public_id" varchar(255) not null, "login" varchar(255) not null, "role" text check ("role" in (\'ROLE_UNSPECIFIED\', \'ROLE_USER\', \'ROLE_MAIN_USER\', \'ROLE_ADMIN\', \'ROLE_MANAGER\', \'ROLE_TOP\')) not null, "deleted" boolean not null, constraint "profile_pkey" primary key ("public_id"));');
    this.addSql('alter table "profile" add constraint "profile_login_unique" unique ("login");');

    this.addSql('create table "task" ("public_id" varchar(255) not null, "description" varchar(255) not null, "status" text check ("status" in (\'TASK_STATUS_UNSPECIFIED\', \'TASK_STATUS_PROCESSING\', \'TASK_STATUS_COMPLITED\')) not null, "created_date" timestamptz(0) not null, "popug_id" varchar(255) not null, "assign_price" int not null, "complited_price" int not null, "title" varchar(255) not null, "jira_id" varchar(255) not null default \'\', "created_at" timestamptz(0) not null, constraint "task_pkey" primary key ("public_id"));');

    this.addSql('create table "transaction_journal" ("public_id" varchar(255) not null, "profile_id" varchar(255) not null, "balance" int not null, "status" text check ("status" in (\'WAIT\', \'SUCCESS\', \'FAIL\')) not null, constraint "transaction_journal_pkey" primary key ("public_id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "account" cascade;');

    this.addSql('drop table if exists "balance_journal" cascade;');

    this.addSql('drop table if exists "payment_cycle" cascade;');

    this.addSql('drop table if exists "profile" cascade;');

    this.addSql('drop table if exists "task" cascade;');

    this.addSql('drop table if exists "transaction_journal" cascade;');
  }

}
