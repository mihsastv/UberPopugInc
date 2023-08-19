import { Migration } from '@mikro-orm/migrations';

export class Migration20230819092615 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" add column "jira_id" varchar(255) not null default \'\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop column "jira_id";');
  }

}
