import { Migration } from '@mikro-orm/migrations';

export class Migration20241027020658 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`users\` drop index \`users_nik_unique\`;`);

    this.addSql(`alter table \`users\` change \`nik\` \`username\` varchar(255) not null;`);
    this.addSql(`alter table \`users\` add unique \`users_username_unique\`(\`username\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`users\` drop index \`users_username_unique\`;`);

    this.addSql(`alter table \`users\` change \`username\` \`nik\` varchar(255) not null;`);
    this.addSql(`alter table \`users\` add unique \`users_nik_unique\`(\`nik\`);`);
  }

}
