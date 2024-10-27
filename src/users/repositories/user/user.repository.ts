import { EntityRepository } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserRepository extends EntityRepository<User>{
    
}
