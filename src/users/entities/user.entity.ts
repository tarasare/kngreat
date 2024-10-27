import { UserEntity } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { Role } from './role.enum';
import { UserRepository } from '../repositories/user/user.repository';
import crypto from 'crypto';
import { UserResponse } from '../dto/response/UserResponse.dto';
@Entity({
  tableName: 'users',
  repository: () => UserRepository,
})
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;
  constructor(username: string, namaLengkap: string, password: string) {
    super();
    this.username = username.toLowerCase().replace(/[^a-z0-9._]/g, '');
    this.password = crypto.createHmac('sha256', password).digest('hex');
    this.namaLengkap = namaLengkap;
  }
  @PrimaryKey({ autoincrement: true })
  id!: number;
  @Property({ nullable: false, unique: true })
  username!: string;
  @Property({ nullable: false, type: 'varchar', length: 100 })
  namaLengkap!: string;
  @Property({ nullable: false, length: 250, type: 'varchar', hidden: true })
  password!: string;
  @Enum({ items: () => Role, default: Role.USER, nullable: false })
  role!: Role;
  @Property({ type: 'bool', nullable: false, default: false })
  changePassword!: boolean;
  @Property({ nullable: false })
  insertedBy!: number;
  @Property({ onCreate: () => new Date(), nullable: false })
  insertedDate: Date;
  @Property({ nullable: false })
  updatedBy: number;
  @Property({
    nullable: false,
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedDate: Date;
  @Property({ version: true, nullable: false })
  version!: number;
  @Property({ type: 'bool', nullable: false, default: true })
  enabled!: boolean;

  toResponse(): UserResponse {
    const { id, username, namaLengkap, role } = this;
    const userResponse: UserResponse = {
      id,
      username,
      namaLengkap,
      role,
    };
    return userResponse;
  }
}
