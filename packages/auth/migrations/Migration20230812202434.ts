import { Migration } from '@mikro-orm/migrations';

export class Migration20230812202434 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "profile" drop constraint if exists "profile_role_check";');

    this.addSql('alter table "profile" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "profile" add constraint "profile_role_check" check ("role" in (\'ROLE_UNSPECIFIED\', \'ROLE_USER\', \'ROLE_MAIN_USER\', \'ROLE_ADMIN\', \'ROLE_MANAGER\', \'ROLE_TOP\'));');
    this.addSql('alter table "profile" add constraint "profile_login_unique" unique ("login");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "profile" drop constraint if exists "profile_role_check";');

    this.addSql('alter table "profile" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "profile" add constraint "profile_role_check" check ("role" in (\'USER\', \'ADMIN \', \'MANAGER\', \'TOP\'));');
    this.addSql('alter table "profile" drop constraint "profile_login_unique";');
  }

}
