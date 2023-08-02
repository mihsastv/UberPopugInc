import { Migration } from '@mikro-orm/migrations';

export class Migration20230801115708 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION if not exists "uuid-ossp"');
    
    this.addSql('create table "profile" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null, "type" text check ("type" in (\'TYPE_OF_PROFILE_UNSPECIFIED\', \'TYPE_OF_PROFILE_DISCOVERY\', \'TYPE_OF_PROFILE_BASIC\', \'TYPE_OF_PROFILE_VULNER\')) not null, "extend_settings" boolean not null, "nmap" varchar(255) not null, "tcp_syn" varchar(255) not null, "udp" varchar(255) not null, "icmp" boolean not null, "dns_name_resolver" boolean not null, "define_os" boolean not null, "define_version_service" boolean not null, "time_template" text check ("time_template" in (\'TIME_TEMPLATE_UNSPECIFIED\', \'TIME_TEMPLATE_T0\', \'TIME_TEMPLATE_T1\', \'TIME_TEMPLATE_T2\', \'TIME_TEMPLATE_T3\', \'TIME_TEMPLATE_T4\', \'TIME_TEMPLATE_T5\')) not null, "connection_timeout" int not null, "scan_tcp" varchar(255) not null, "scan_udp" varchar(255) not null, "auth_ssh" varchar(255) not null, "import_open_port" boolean not null, "import_users" boolean not null, "import_security_options" boolean not null, "import_windows_updates" boolean not null, constraint "profile_pkey" primary key ("id"));');

    this.addSql('create table "task" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null, "profile_id" varchar(255) not null, "adress_place_id" varchar(255) not null, "collector_id" varchar(255) not null, "account_ids" varchar(255) not null, "targets" varchar(255) not null, "targets_excludes" varchar(255) not null, "organization_id" varchar(255) not null, constraint "task_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "profile" cascade;');

    this.addSql('drop table if exists "task" cascade;');
  }

}
