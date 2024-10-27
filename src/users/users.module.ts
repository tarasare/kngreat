import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user/user.repository';


@Module({
    imports: [
        MikroOrmModule.forFeature([User])
    ],
    providers: [UserService, UserRepository]
})
export class UsersModule {}
