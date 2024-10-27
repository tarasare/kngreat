import { EntityManager } from '@mikro-orm/mariadb';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from '../repositories/user/user.repository';
import { Page, PageRequest } from '@tarasare/pagination';
import { CreateUserDto } from '../dto/request/createUser.dto';
import { UserResponse } from '../dto/response/UserResponse.dto';
import { validate } from 'class-validator';
import { LoginUser } from '../dto/request/LoginUser.dto';
import crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll(
    pageRequest: PageRequest<User>,
  ): Promise<Page<User>> {
    const { searchTerms, page, size, orderBy, sort } = pageRequest;
    const searchFilter = {
      $and: [
        {
          enabled: true,
        },
        ...(searchTerms ? [{ $or: [{ nik: { $like: `%${searchTerms}%` } }, { namaLengkap: { $like: `%${searchTerms}%` } }] }] : []),
      ],
    };
    const [users, totalElements] = await this.userRepository.findAndCount(
      searchFilter,
      {
        orderBy: {
          [orderBy.field]: sort,
        },
        limit: size,
        offset: page * size,
      },
    );
    return new Page(users, page, size, totalElements);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const { username, namaLengkap, password } = createUserDto;
    const exist = await this.userRepository.count({ $or: [{ username }] });
    if (exist > 0) {
      throw new HttpException(
        {
          message: 'Input data alidation error',
          error: { username: 'Nik sudah terdaftar' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user =  new User(username, namaLengkap, password);
    const error = await validate(user)
    if(error.length > 0){
      throw new HttpException({
        message: 'Input data validation failed',
        error: 'Input data validation failed'
      }, HttpStatus.BAD_REQUEST)
    }
    await this.em.persistAndFlush(user)
    return user.toResponse();
  }
  async login(loginUser: LoginUser): Promise<UserResponse | null>{
    const loginInfo = {
      nik: loginUser.username,
      password: crypto.createHmac('sha256', loginUser.password).digest('hex'),
      enabled: true
    }
    const user = await this.userRepository.findOne(loginInfo)
    return user == null ? null : user.toResponse();
  }
  async delete(username: string) {
    const user = await this.userRepository.findOne( {username})
    if (!user || !user.enabled) {
      throw new NotFoundException(`User with NIK ${username} is either not found or has been deactivated`);
    }
    user.enabled = false;
    await this.em.persistAndFlush(user);
  }


  async findOneUser(username: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findOne({ username });
    if (!user || !user.enabled) {
      throw new NotFoundException(`User with NIK ${username} is either not found or has been deactivated`);
    }
    return user.toResponse();
    }
}
