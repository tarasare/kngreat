import { Migration } from '@mikro-orm/migrations';

export class Migration20241026053413 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`users\` (\`id\` int unsigned not null auto_increment primary key, \`nik\` varchar(255) not null, \`nama_lengkap\` varchar(100) not null, \`password\` varchar(250) not null, \`role\` enum('admin', 'user') not null default 'user', \`change_password\` bool not null default false, \`inserted_by\` int not null, \`inserted_date\` datetime not null, \`updated_by\` int not null, \`updated_date\` datetime not null, \`version\` int not null default 1, \`enabled\` bool not null default true) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`users\` add unique \`users_nik_unique\`(\`nik\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`users\`;`);
  }

}
